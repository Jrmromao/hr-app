import * as cdk from "aws-cdk-lib";
import { CfnOutput } from "aws-cdk-lib";
import {
  AuthorizationType,
  Cors,
  MethodOptions,
  ResourceOptions,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { CloudFrontWebDistribution } from "aws-cdk-lib/aws-cloudfront";
import { Bucket, HttpMethods } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { join } from "path";
import { AuthorizerWrapper } from "./auth/AuthorizerWrapper";
import { config } from "./config/configuration";
import { GenericTable } from "./utils/GenericTable";
import { Policies } from "./Policies";
import { Code, LayerVersion, Runtime } from "aws-cdk-lib/aws-lambda";

export class AppStack extends cdk.Stack {
  private suffix: string;

  private deploymentBucket: Bucket;
  private documentBucket: Bucket;

  private api = new RestApi(this, "HRAppAPI");
  private authorizer: AuthorizerWrapper;
  private policies: Policies;


  private layerlibs = new LayerVersion(this, `third-party-libs`, {
    compatibleRuntimes: [
      Runtime.PYTHON_3_9,
      Runtime.PYTHON_3_8,
    ],
    code: Code.fromAsset(join(__dirname,'..', 'layer')),
    description: 'Uses a 3rd party libraries',
    layerVersionName: `third-party-libs`
  });


  private employeeTable = new GenericTable(this, {
    tableName: "EmployeeTable",
    primaryKey: "employeeId",
    createLambdaPath: "Create",
    readLambdaPath: "Read",
    updateLambdaPath: "Update",
    deleteLambdaPath: "Delete",
    servicePath: "EmployeeLambdas",
    secondaryIndexes: ["user"],
    layerVersion: this.layerlibs,
  });

  private officeTable = new GenericTable(this, {
    tableName: "OfficeTable",
    primaryKey: "officeId",
    createLambdaPath: "Create",
    readLambdaPath: "Read",
    updateLambdaPath: "Update",
    deleteLambdaPath: "Delete",
    servicePath: "OfficeLambdas",
    secondaryIndexes: ["name"],
    layerVersion: this.layerlibs,
  });

  private departmentTable = new GenericTable(this, {
    tableName: "DepartmentTable",
    primaryKey: "departmentId",
    createLambdaPath: "Create",
    readLambdaPath: "Read",
    updateLambdaPath: "Update",
    deleteLambdaPath: "Delete",
    servicePath: "DepartmentLambdas",
    secondaryIndexes: ["name"],
    layerVersion: this.layerlibs,
  });

  private roleTable = new GenericTable(this, {
    tableName: "RoleTable",
    primaryKey: "roleId",
    createLambdaPath: "Create",
    readLambdaPath: "Read",
    updateLambdaPath: "Update",
    deleteLambdaPath: "Delete",
    servicePath: "RoleLambdas",
    secondaryIndexes: ["name"],
    layerVersion: this.layerlibs,
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

    const hrAppCloudFront = new CloudFrontWebDistribution(
      this,
      "hr-app-distribution",
      {
        originConfigs: [
          {
            behaviors: [
              {
                isDefaultBehavior: true,
              },
            ],
            s3OriginSource: {
              s3BucketSource: this.deploymentBucket,
            },
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

    //Employee API integrations:
    const employeeResource = this.api.root.addResource(
      "employee-api",
      optionsWithCors
    );

    employeeResource.addMethod(
      "POST",
      this.employeeTable.createLambdaIntegration,
      optionsWithAuthorizer
    );
    employeeResource.addMethod(
      "GET",
      this.employeeTable.readLambdaIntegration,
      optionsWithAuthorizer
    );
    employeeResource.addMethod(
      "PUT",
      this.employeeTable.updateLambdaIntegration,
      optionsWithAuthorizer
    );
    employeeResource.addMethod(
      "DELETE",
      this.employeeTable.deleteLambdaIntegration,
      optionsWithAuthorizer
    );
    //Office API integrations:
    const officeResource = this.api.root.addResource(
      "office-api",
      optionsWithCors
    );

    officeResource.addMethod(
      "POST",
      this.officeTable.createLambdaIntegration,
      optionsWithAuthorizer
    );
    officeResource.addMethod(
      "GET",
      this.officeTable.readLambdaIntegration,
      optionsWithAuthorizer
    );
    officeResource.addMethod(
      "PUT",
      this.officeTable.updateLambdaIntegration,
      optionsWithAuthorizer
    );
    officeResource.addMethod(
      "DELETE",
      this.officeTable.deleteLambdaIntegration,
      optionsWithAuthorizer
    );

    //Department API integrations:

    const departementResource = this.api.root.addResource(
      "department-api",
      optionsWithCors
    );

    departementResource.addMethod(
      "POST",
      this.departmentTable.createLambdaIntegration,
      optionsWithAuthorizer
    );
    departementResource.addMethod(
      "GET",
      this.departmentTable.readLambdaIntegration,
      optionsWithAuthorizer
    );
    departementResource.addMethod(
      "PUT",
      this.departmentTable.updateLambdaIntegration,
      optionsWithAuthorizer
    );
    departementResource.addMethod(
      "DELETE",
      this.departmentTable.deleteLambdaIntegration,
      optionsWithAuthorizer
    );

    //Role API integrations:
    const roleResource = this.api.root.addResource("role-api", optionsWithCors);

    roleResource.addMethod(
      "POST",
      this.roleTable.createLambdaIntegration,
      optionsWithAuthorizer
    );
    roleResource.addMethod(
      "GET",
      this.roleTable.readLambdaIntegration,
      optionsWithAuthorizer
    );
    roleResource.addMethod(
      "PUT",
      this.roleTable.updateLambdaIntegration,
      optionsWithAuthorizer
    );
    roleResource.addMethod(
      "DELETE",
      this.roleTable.deleteLambdaIntegration,
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
