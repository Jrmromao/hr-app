import { CognitoUser } from "@aws-amplify/auth";

export interface User {
    userName: string;
    cognitoUser: CognitoUser;
    token: string;
    image?: string;
}

export interface UserFormValues {
    email?: string;
    password: string;
    displayName?: string;
    username: string;
}


export interface UserAttributes{
    Name: string,
    Value: string
}


