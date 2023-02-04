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
import {Code, ILayerVersion, LayerVersion, Runtime} from "aws-cdk-lib/aws-lambda";
import {GenericLambda} from "./utils/GenericLambda";

export class AppStack extends cdk.Stack {
    private suffix: string;

    private deploymentBucket: Bucket;
    private documentBucket: Bucket;

    private api = new RestApi(this, "HRAppAPI");
    private authorizer: AuthorizerWrapper;
    private policies: Policies;


    private layerLibs = new LayerVersion(this, `third-party-libs`, {
        compatibleRuntimes: [
            Runtime.PYTHON_3_9,
            Runtime.PYTHON_3_8,
        ],
        code: Code.fromAsset(join(__dirname, '..', 'layer')),
        description: 'Uses a 3rd party libraries',
        layerVersionName: `third-party-libs`
    });

    private companyLambda = new GenericLambda(this, {
        lambdaName: "Company",
        servicePath: "CompanyLambdas",
        createLambda: "Create",
        readLambda: "Read",
        updateLambda: "Update",
        deleteLambda: "Delete",
        layerVersion: this.layerLibs,
    });

    private employeeLambda = new GenericLambda(this, {
        lambdaName: "Employee",
        servicePath: "EmployeeLambdas",
        createLambda: "Create",
        readLambda: "Read",
        updateLambda: "Update",
        deleteLambda: "Delete",
        layerVersion: this.layerLibs,
    })

    private officeLambda = new GenericLambda(this, {
        lambdaName: "Office",
        createLambda: "Create",
        readLambda: "Read",
        updateLambda: "Update",
        deleteLambda: "Delete",
        servicePath: "OfficeLambdas",
        layerVersion: this.layerLibs,
    });
    private departmentLambda = new GenericLambda(this, {
        lambdaName: "Department",
        createLambda: "Create",
        readLambda: "Read",
        updateLambda: "Update",
        deleteLambda: "Delete",
        servicePath: "DepartmentLambdas",
        layerVersion: this.layerLibs,
    });
    private roleLambda = new GenericLambda(this, {
        lambdaName: "Role",
        createLambda: "Create",
        readLambda: "Read",
        updateLambda: "Update",
        deleteLambda: "Delete",
        servicePath: "RoleLambdas",
        layerVersion: this.layerLibs,
    });

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        this.initializeSuffix();
        this.initializeDocumentBucket();
        this.deploymentBucket = new Bucket(this, "hr-app-client-ui", {
            bucketName: config.uiBucketName,
            publicReadAccess: true,
            websiteIndexDocument: "index.html",
            websiteErrorDocument: "index.html",
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });

        new GenericTable(this, {
            tableName: "Company",
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
            this.companyLambda.createLambdaIntegration,
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
        employeeResource.addMethod(
            "POST",
            this.employeeLambda.createLambdaIntegration,
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
            `document-bucket-${config.environment}`,
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
