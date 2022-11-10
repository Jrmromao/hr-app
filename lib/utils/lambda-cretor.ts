import { Code, Function as Lambda, Runtime } from "aws-cdk-lib/aws-lambda";
 import { Construct } from "constructs";
import { join } from "path";
 
interface ILambdaInput {
  scope: Construct;
  id: string;
}

export class LambdaCreator {
  lambda: Lambda;

  constructor({ scope, id }: ILambdaInput) {

    this.lambda = new Lambda(scope, id, {
      functionName: `${id}-lambda`,
      runtime: Runtime.PYTHON_3_9,
      handler: "handler.main",
      code: Code.fromAsset(
        join(__dirname, "..", "..", "backend","Lambdas","hello-world-lambda", "core")
      ),
    });
  }

  getLambda() {
    return this.lambda;
  }
}
