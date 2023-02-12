import * as AWS from "aws-sdk";
import { AuthService } from "../../frontend/client-ui/src/services/AuthService";
import { config } from "../../frontend/client-ui/src/services/config";

AWS.config.region = config.REGION;

async function getBuckets() {
  let buckets;
  try {
    buckets = await new AWS.S3().listBuckets().promise();
  } catch (error) {
    buckets = undefined;
  }
  console.log(buckets);
  
  return buckets;
}

async function callStuff() {
  const authService = new AuthService();

  const user = await authService.login(
    config.TEST_USER_NAME,
    config.TEST_USER_PASSWORD
  );
  // await authService.getAWSTemporaryCreds(user);
  // const someCreds = AWS.config.credentials;
 
 
}

callStuff();
