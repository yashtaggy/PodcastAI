"use client";

import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "ap-south-1_efqNsC6ek",
      userPoolClientId: "16jbns9qd6evopma14e9kt9vi9",
    },
  },
});