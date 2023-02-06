import * as cdk from "aws-cdk-lib";
import {CfnOutput} from "aws-cdk-lib";
import {
    AuthorizationType,
    Cors,
    MethodOptions,
    ResourceOptions,
    RestApi,
} from "aws-cdk-lib/aws-apigateway";
import {CloudFrontWebDistribution} from "aws-cdk-lib/aws-cloudfront";
import {Bucket, HttpMethods} from "aws-cdk-lib/aws-s3";
import {BucketDeployment, Source} from "aws-cdk-lib/aws-s3-deployment";
import {Construct} from "constructs";
import {join} from "path";
import {AuthorizerWrapper} from "./auth/AuthorizerWrapper";
import {config} from "./config/configuration";
import {GenericTable} from "./utils/GenericTable";
import {Policies} from "./Policies";
import {Code, LayerVersion, Runtime} from "aws-cdk-lib/aws-lambda";
import {GenericLambda} from "./utils/GenericLambda";
import {GenericQueue} from "./utils/GenericQueue";
import {CompanyLambda} from "./utils/CompanyLambda";
import {EmployeeLambda} from "./utils/EmployeeLambda";


export class AppStack extends cdk.Stack {
    private suffix: string;

    private deploymentBucket: Bucket;
    private documentBucket: Bucket;

    private api = new RestApi(this, "HRAppAPI");
    private authorizer: AuthorizerWrapper;
    private readonly policies: Policies;


    private layerLibs = new LayerVersion(this, `third-party-libs`, {
        compatibleRuntimes: [
            Runtime.PYTHON_3_9,
            Runtime.PYTHON_3_8,
        ],
        code: Code.fromAsset(join(__dirname, '..', 'layer')),
        description: 'Uses a 3rd party libraries',
        layerVersionName: `third-party-libs`
    });

    private employeeQueue = new GenericQueue(this, {
        id: "employeeData"
    })

    private createCompanyLambda = new CompanyLambda(this, {
        createLambda: "Create",
        employeeQueue: this.employeeQueue.getQueue(),
        lambdaName: "Company",
        layerVersion: this.layerLibs,
        servicePath: "CompanyLambdas"
    });

    private companyLambda = new GenericLambda(this, {
        createLambda: "Create",
        deleteLambda: "Delete",
        lambdaName: "Company",
        layerVersion: this.layerLibs,
        readLambda: "Read",
        servicePath: "CompanyLambdas",
        updateLambda: "Update",
    });

    private createEmployeeLambda = new EmployeeLambda(this, {
        createLambda: "Create",
        lambdaName: "Employee",
        layerVersion: this.layerLibs,
        employeeQueue: this.employeeQueue.getQueue(),
        servicePath: "EmployeeLambdas",
    })

    private employeeLambda = new GenericLambda(this, {
        createLambda: "Create",
        deleteLambda: "Delete",
        lambdaName: "Employee",
        layerVersion: this.layerLibs,
        readLambda: "Read",
        servicePath: "EmployeeLambdas",
        updateLambda: "Update",
    })

    private officeLambda = new GenericLambda(this, {
        createLambda: "Create",
        deleteLambda: "Delete",
        lambdaName: "Office",
        layerVersion: this.layerLibs,
        readLambda: "Read",
        servicePath: "OfficeLambdas",
        updateLambda: "Update",
    });
    private departmentLambda = new GenericLambda(this, {
        createLambda: "Create",
        deleteLambda: "Delete",
        lambdaName: "Department",
        layerVersion: this.layerLibs,
        readLambda: "Read",
        servicePath: "DepartmentLambdas",
        updateLambda: "Update",
    });
    private roleLambda = new GenericLambda(this, {
        createLambda: "Create",
        deleteLambda: "Delete",
        lambdaName: "Role",
        layerVersion: this.layerLibs,
        readLambda: "Read",
        servicePath: "RoleLambdas",
        updateLambda: "Update",
    });

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        this.initializeSuffix();
        this.initializeDocumentBucket();
        this.deploymentBucket = new Bucket(this, "hr-app-client-ui", {
            autoDeleteObjects: true,
            bucketName: config.uiBucketName,
            publicReadAccess: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            websiteErrorDocument: "index.html",
            websiteIndexDocument: "index.html",
        });

        new GenericTable(this, {
            tableName: "Companies",
            primaryKey: "companyId",
            secondaryIndexes: ["companyName"],
        });

        const hrAppCloudFront = new CloudFrontWebDistribution(this, "hr-app-distribution", {
                originConfigs: [
                    {
                        behaviors: [{isDefaultBehavior: true,},],
                        s3OriginSource: {s3BucketSource: this.deploymentBucket,},
                    },
                ],
            }
        );

        this.policies = new Policies(this.documentBucket);
        this.authorizer = new AuthorizerWrapper(this, this.api, this.policies);

        const optionsWithAuthorizer: MethodOptions = {
            authorizationType: AuthorizationType.COGNITO,
            authorizer: {
                authorizerId: this.authorizer.authorizer.authorizerId,
            },
        };

        const optionsWithCors: ResourceOptions = {
            defaultCorsPreflightOptions: {
                allowOrigins: Cors.ALL_ORIGINS,
                allowMethods: Cors.ALL_METHODS,
            },
        };

        new BucketDeployment(this, "hr-app-client-ui-deployment", {
            destinationBucket: this.deploymentBucket,
            sources: [
                Source.asset(
                    join(__dirname, "..", "..", "app", "frontend", "client-ui", "build")
                ),
            ],
            distribution: hrAppCloudFront,
            distributionPaths: ["/*"],
        });

        new CfnOutput(this, "hrAppWebAppCloudFrontUrl", {
            value: hrAppCloudFront.distributionDomainName,
        });

        // company API integration
        const companyResource = this.api.root.addResource(
            "company-api",
            optionsWithCors
        );

        companyResource.addMethod(
            "POST",
            this.createCompanyLambda.createLambdaIntegration,
            optionsWithAuthorizer
        );
        companyResource.addMethod(
            "GET",
            this.companyLambda.readLambdaIntegration,
            optionsWithAuthorizer
        );
        companyResource.addMethod(
            "PUT",
            this.companyLambda.updateLambdaIntegration,
            optionsWithAuthorizer
        );
        companyResource.addMethod(
            "DELETE",
            this.companyLambda.deleteLambdaIntegration,
            optionsWithAuthorizer
        );


        //Employee API integrations:
        const employeeResource = this.api.root.addResource(
            "employee-api",
            optionsWithCors
        );
        employeeResource.addMethod( // create employee
            "POST",
            this.createEmployeeLambda.createLambdaIntegration,
            optionsWithAuthorizer
        );
        employeeResource.addMethod(
            "GET",
            this.employeeLambda.readLambdaIntegration,
            optionsWithAuthorizer
        );
        employeeResource.addMethod(
            "PUT",
            this.employeeLambda.updateLambdaIntegration,
            optionsWithAuthorizer
        );
        employeeResource.addMethod(
            "DELETE",
            this.employeeLambda.deleteLambdaIntegration,
            optionsWithAuthorizer
        );


        //Office API integrations:
        const officeResource = this.api.root.addResource(
            "office-api",
            optionsWithCors
        );

        officeResource.addMethod(
            "POST",
            this.officeLambda.createLambdaIntegration,
            optionsWithAuthorizer
        );
        officeResource.addMethod(
            "GET",
            this.officeLambda.readLambdaIntegration,
            optionsWithAuthorizer
        );
        officeResource.addMethod(
            "PUT",
            this.officeLambda.updateLambdaIntegration,
            optionsWithAuthorizer
        );
        officeResource.addMethod(
            "DELETE",
            this.officeLambda.deleteLambdaIntegration,
            optionsWithAuthorizer
        );

        //Department API integrations:

        const departmentResource = this.api.root.addResource(
            "department-api",
            optionsWithCors
        );

        departmentResource.addMethod(
            "POST",
            this.departmentLambda.createLambdaIntegration,
            optionsWithAuthorizer
        );
        departmentResource.addMethod(
            "GET",
            this.departmentLambda.readLambdaIntegration,
            optionsWithAuthorizer
        );
        departmentResource.addMethod(
            "PUT",
            this.departmentLambda.updateLambdaIntegration,
            optionsWithAuthorizer
        );
        departmentResource.addMethod(
            "DELETE",
            this.departmentLambda.deleteLambdaIntegration,
            optionsWithAuthorizer
        );

        //Role API integrations:
        const roleResource = this.api.root.addResource("role-api", optionsWithCors);

        roleResource.addMethod(
            "POST",
            this.roleLambda.createLambdaIntegration,
            optionsWithAuthorizer
        );
        roleResource.addMethod(
            "GET",
            this.roleLambda.readLambdaIntegration,
            optionsWithAuthorizer
        );
        roleResource.addMethod(
            "PUT",
            this.roleLambda.updateLambdaIntegration,
            optionsWithAuthorizer
        );
        roleResource.addMethod(
            "DELETE",
            this.roleLambda.deleteLambdaIntegration,
            optionsWithAuthorizer
        );
    }

    private initializeSuffix() {
        const shortStackId = cdk.Fn.select(2, cdk.Fn.split("/", this.stackId));
        const Suffix = cdk.Fn.select(4, cdk.Fn.split("-", this.stackId));
        this.suffix = Suffix;
    }

    private initializeDocumentBucket() {
        this.documentBucket = new Bucket(
            this,
            `document-bucket-${config.environmentKey}`,
            {
                bucketName: `document-bucket-${this.suffix}`,
                cors: [
                    {
                        allowedMethods: [
                            HttpMethods.HEAD,
                            HttpMethods.GET,
                            HttpMethods.PUT,
                        ],
                        allowedOrigins: ["*"],
                        allowedHeaders: ["*"],
                    },
                ],
            }
        );
        new CfnOutput(this, "document-bucket-name", {
            value: this.documentBucket.bucketName,
        });
    }
}
