import {
  Box,
  Button,
  Center,
  Flex,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export default function VerifyEmail({ token, valid }) {
  const toast = useToast();
  const router = useRouter();

  function Toast(title, message, status) {
    return toast({
      title: title || "",
      description: message,
      status: status,
      position: "top",
      duration: 2000,
      // isClosable: true,
    });
  }
  const [Loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    // setLoading(true);
    e.preventDefault();
    const res = await fetch("/api/auth/verifyemail", {
      method: "PUT",
      body: JSON.stringify({ token: token }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      Toast("Success", "Email verified!", "success");
      setLoading(false);
      console.log("Email verified");
      router.replace("/auth/signin");
    }
    if (res.status == 400) {
      Toast("Error", "Invalid token", "error");

      setLoading(false);
      console.log("Invalid token");
    }
    if (res.status == 500) {
      Toast("Error", "Internal server error", "error");
      setLoading(false);
      console.log("Invalid token");
    }
  }

  const color = useColorModeValue("white", "#302E2E");
  if (!valid)
    return (
      <>
        <h1>Invalid Link</h1>
        <p>
          It looks like your link is invalid. Please close this window and try
          again.
        </p>
      </>
    );

  return (
    <>
      <Box as={Center} h="100vh" w="full" bg={color}>
        <Center h="50%" w="50%" border="2px solid gray" borderRadius="25px">
          <Button
            onClick={handleSubmit}
            isLoading={Loading}
            w={{ base: "100%", xs: "200px" }}
            h="62px"
          >
            Click Here to Verify
          </Button>
        </Center>
      </Box>
    </>
  );
}
export async function getServerSideProps({ params }) {
  await dbConnect();
  const token = await User.findOne({ verifyToken: params.token }).exec();
  console.log(token);
  return { props: { token: params.token, valid: !!token } };
}
