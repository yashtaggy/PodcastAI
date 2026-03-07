"use client";

import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "ap-south-1_efqNsC6ek",
      userPoolClientId: "16jbns9qd6evopma14e9kt9vi9",
      loginWith: {
        oauth: {
          domain: "ap-south-1efqnsc6ek.auth.ap-south-1.amazoncognito.com",
          scopes: ["email", "openid", "profile"],
          redirectSignIn: [
            "http://localhost:9002/login",
            "https://zz3deht72s.us-east-1.awsapprunner.com/login"
          ],
          redirectSignOut: [
            "http://localhost:9002/login",
            "https://zz3deht72s.us-east-1.awsapprunner.com/login"
          ],
          responseType: "code"
        }
      }
    },
  },
});