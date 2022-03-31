import { useState, useEffect } from "react";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SignIn } from "../../components/SignIn/SignIn";

const SignInPage = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <SignIn />
    </>
  );
};

export default SignInPage;
