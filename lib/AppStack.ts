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

export class AppStack extends cdk.Stack {
  private suffix: string;

  private deploymentBucket: Bucket;
  private documentBucket: Bucket;

  private api = new RestApi(this, "HRAppAPI");
  private authorizer: AuthorizerWrapper;
  private policies: Policies;

  private employeeTable = new GenericTable(this, {
    tableName: "EmployeeTable",
    primaryKey: "employeeId",
    createLambdaPath: "Create",
    readLambdaPath: "Read",
    updateLambdaPath: "Update",
    deleteLambdaPath: "Delete",
    servicePath: "EmployeeLambdas",
    secondaryIndexes: ["user"],
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
    const reservationResource = this.api.root.addResource(
      "api",
      optionsWithCors
    );
    reservationResource.addMethod(
      "POST",
      this.employeeTable.createLambdaIntegration,
      optionsWithAuthorizer
    );
    reservationResource.addMethod(
      "GET",
      this.employeeTable.readLambdaIntegration,
      optionsWithAuthorizer
    );
    reservationResource.addMethod(
      "PUT",
      this.employeeTable.updateLambdaIntegration,
      optionsWithAuthorizer
    );
    reservationResource.addMethod(
      "DELETE",
      this.employeeTable.deleteLambdaIntegration,
      optionsWithAuthorizer
    );
    //Office API integrations:
    const officeResource = this.api.root.addResource("api", optionsWithCors);
    reservationResource.addMethod(
      "POST",
      this.officeTable.createLambdaIntegration,
      optionsWithAuthorizer
    );
    reservationResource.addMethod(
      "GET",
      this.officeTable.readLambdaIntegration,
      optionsWithAuthorizer
    );
    reservationResource.addMethod(
      "PUT",
      this.officeTable.updateLambdaIntegration,
      optionsWithAuthorizer
    );
    reservationResource.addMethod(
      "DELETE",
      this.officeTable.deleteLambdaIntegration,
      optionsWithAuthorizer
    );
    //Department API integrations:
    const departmentResource = this.api.root.addResource(
      "api",
      optionsWithCors
    );
    reservationResource.addMethod(
      "POST",
      this.departmentTable.createLambdaIntegration,
      optionsWithAuthorizer
    );
    reservationResource.addMethod(
      "GET",
      this.departmentTable.readLambdaIntegration,
      optionsWithAuthorizer
    );
    reservationResource.addMethod(
      "PUT",
      this.departmentTable.updateLambdaIntegration,
      optionsWithAuthorizer
    );
    reservationResource.addMethod(
      "DELETE",
      this.departmentTable.deleteLambdaIntegration,
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
