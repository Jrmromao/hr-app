import { Auth } from "aws-amplify";
import { Amplify } from "aws-amplify";
import { config } from "./config";
import { CognitoUser } from "@aws-amplify/auth";
import { Credentials } from "aws-sdk";
import * as AWS from "aws-sdk";
import { User, UserAttributes } from "../models/user";

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.REGION,
    userPoolId: config.USER_POOL_ID,
    userPoolWebClientId: config.APP_CLIENT_ID,
    identityPoolId: config.IDENTITY_POOL_ID,
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
});

export class AuthService {
  public async login(userName: string, password: string): Promise<User> {
    try {
      const user = (await Auth.signIn(userName, password)) as CognitoUser;

      return {
        cognitoUser: user,
        userName: user.getUsername(),
        token: user.getSignInUserSession()!.getIdToken().getJwtToken(),
      };
    } catch (error) {
      throw error;
    }
  }

 
  public async getUserAttributes(user: CognitoUser): Promise<UserAttributes[]> {
    const result: UserAttributes[] = [];
    const attributes = await Auth.userAttributes(user);
    result.push(...attributes);
    return result;
  }

  public async getAWSTemporaryCreds(user: CognitoUser) {
    const cognitoIdentityPool = `cognito-idp.${config.REGION}.amazonaws.com/${config.USER_POOL_ID}`;

    AWS.config.credentials = new AWS.CognitoIdentityCredentials(
      {
        IdentityPoolId: config.IDENTITY_POOL_ID,
        Logins: {
          [cognitoIdentityPool]: user
            .getSignInUserSession()!
            .getIdToken()
            .getJwtToken(),
        },
      },
      {
        region: config.REGION,
      }
    );
    await this.refreshCredentials();
  }

  private async refreshCredentials(): Promise<void> {
    return new Promise((resolve, reject) => {
      (AWS.config.credentials as Credentials).refresh((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
