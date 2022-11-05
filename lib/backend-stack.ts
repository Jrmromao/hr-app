import * as cdk from "aws-cdk-lib";
import { CfnOutput } from "aws-cdk-lib";
import { CloudFrontWebDistribution } from "aws-cdk-lib/aws-cloudfront";

import { Bucket, HttpMethods } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { join } from "path";
import { LambdaCreator } from "./utils/lambda-cretor";

export class HrApptack extends cdk.Stack {
  private suffix: string;

  private deploymentBucket: Bucket;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.initializeSuffix();

    new LambdaCreator({
      scope: this,
      id: "hello-world",
    });

    const bucketName = "hr-app-client-ui" + this.suffix;

    this.deploymentBucket = new Bucket(this, "hr-app-client-ui", {
      bucketName: bucketName,
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
    });

    const hrAppCloudFront = new CloudFrontWebDistribution(
      this,
      "hr-app-client-ui-distribution",
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
  }

  private initializeSuffix() {
    const shortStackId = cdk.Fn.select(2, cdk.Fn.split("/", this.stackId));
    const Suffix = cdk.Fn.select(4, cdk.Fn.split("-", this.stackId));
    this.suffix = Suffix;
  }
}
