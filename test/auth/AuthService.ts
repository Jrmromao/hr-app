import { Auth } from 'aws-amplify';
import { Amplify } from 'aws-amplify';
import { config } from './config';
import { CognitoUser } from '@aws-amplify/auth'

// 'eyJraWQiOiIrMkptdHN2NXpuUGxFVkltaG9DWUV2dEo2ejBuZTVzNWV0cklvOG1tXC80WT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1NDdmM2EwZC0yZDI5LTQ5YzEtOWM2Yy1lNTJmOTg3ODJkOWMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfNzVZd0R2SmJGIiwiY29nbml0bzp1c2VybmFtZSI6ImpvYW9yb21hbyIsIm9yaWdpbl9qdGkiOiIwMjJjZTZlOC0yMzI1LTRhNmEtYmE1ZC0wZDJjN2ZiMWUwMDIiLCJhdWQiOiI3MmF2YzUzdjQzbGd1OWk2bzFndXFlZWZxcSIsImV2ZW50X2lkIjoiNzI5OGM2ODktMGMxYS00Y2RlLWJkMWItYTlkMDNmOD…Njc3NjUzOTgsImV4cCI6MTY2Nzc2ODk5NywiaWF0IjoxNjY3NzY1Mzk4LCJqdGkiOiJiNTM3ZmY4ZS05YmUwLTRkMTctYWVkYS1kZmNmNmViYzJkZmIiLCJlbWFpbCI6ImpybXJvbWFvQG1haWwuY29tIn0.WdXKsmaZ3fdbte_7RIDTIMrLCuIiySWmPSPr8uqZDK_88GbEIz0jTbca4U-R5fAurrjKFlLkQSkKyxtvb9_O0Z_k0lMBa9OCtF5cdR1KLGdTP9QBYlCzegW2AVCi8fvZX1g4bNppZ6yBuPbKRyNTYqgo6n872bK4T0_Zptf3dmBpmNpRD-fuCH5SRopS0v6TTuysCG7y7BJ7IAPQWubziKcwhOmI5_TgxaG7mx-kCehs259IGvtzKuTcUQn4a0mdR-1fU5QzuEKSTF6Z8XzG4bGjDonVjYKSWLevk1R-MG8i9y3aYuoH2GjVrGRR7I7KHZTRlZUp735bLXj6gbDciw'
Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: config.REGION,
        userPoolId: config.USER_POOL_ID,
        userPoolWebClientId: config.APP_CLIENT_ID,
        identityPoolId: config.IDENTITY_POOL_ID,
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
})

export class AuthService {


    public async login(userName: string, password: string){


        try {
            const user = await Auth.signIn(userName, password) as CognitoUser;

            return user;
        } catch (error) {
            throw error
        }
    
    }


    // public async getAWSTemporaryCreds(user: CognitoUser){
    //    const cognitoIdentityPool = `cognito-idp.${config.REGION}.amazonaws.com/${config.USER_POOL_ID}`; 
    //    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    //        IdentityPoolId: config.IDENTITY_POOL_ID,
    //        Logins: {
    //            [cognitoIdentityPool]: user.getSignInUserSession()!.getIdToken().getJwtToken()
    //        }
    //    }, {
    //        region: config.REGION
    //    });
    //    await this.refreshCredentials();
    // }


    // private async refreshCredentials(): Promise<void>{
    //     return new Promise((resolve, reject)=>{
    //         (AWS.config.credentials as Credentials).refresh(err =>{
    //             if (err) {
    //                 reject(err)
    //             } else {
    //                 resolve()
    //             }
    //         })
    //     })
    // }
}