import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class Policies {
  private documentBucket: Bucket;

  public uploadDocument: PolicyStatement;

  constructor(documentBucket: Bucket) {
    this.documentBucket = documentBucket;
    this.initialize();
  }

  private initialize() {
    this.uploadDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:PutObject", "s3:PutObjectAcl"],
      resources: [this.documentBucket.bucketArn + "/*"],
    });
  }
}
