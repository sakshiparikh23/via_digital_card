import {
  Box,
  Button,
  Flex,
  Image,
  InputGroup,
  InputRightElement,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useRef, useState } from "react";
import dbConnect from "../../lib/dbConnect";
import Token from "../../models/Token";
import { Formik, Field, Form } from "formik";
import NextLink from "next/link";
import { AiOutlineMail, AiOutlineEye } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";
import * as Yup from "yup";
import { useRouter } from "next/router";

export default function ResetPasswordTokenPage({ token, valid }) {
  const toast = useToast();

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
  const [show, setShow] = React.useState(false);
  const showPassword = () => setShow(!show);
  const textColor = useColorModeValue("black", "white");
  const textColor1 = useColorModeValue("black", "#C8C8C8");
  const textColor2 = useColorModeValue("blue", "white");
  const [errorMessage, seterrorMessage] = useState("");
  const [Loading, setLoading] = useState(false);
  const bg = useColorModeValue("white", "black.200");

  const initialValues = {
    password: "",
    repassword: "",
  };

  const router = useRouter();

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "eg : jhonDoe@123, Must Contain 8 Characters"
      )
      .required("Required"),
    repassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password does not matched")
      .required("Required"),
  });
  const handleSubmit = async (values) => {
    setLoading(true);
    console.log(values.password);
    const res = await fetch("/api/auth/resetpassword", {
      method: "PUT",
      body: JSON.stringify({
        token,
        password: values.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 401) {
      Toast("Link Expired Please Try again", "Error", "error");
      setLoading(false);
    }
    if (res.status === 400) {
      Toast(
        "Error Updating user or Link Expired Please Try again",
        "Error",
        "error"
      );
      setLoading(false);
    }
    if (res.status === 200) {
      Toast("Successfully Password Updated", "Please Signin", "success");
      router.replace("/auth/signin");
    }
    setLoading(false);
  };
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
      <Head>
        <title>Forget password</title>
      </Head>
      <>
        <Flex w="100%" p="15px 20px" bgColor={bg} minH={"700px"} h="100vh">
          <Box
            h="100%"
            w="max-content"
            display={{ base: "none", lg: "block" }}
            flexShrink={"0"}
          >
            <Image
              src="https://res.cloudinary.com/dbm7us31s/image/upload/v1646849213/digital%20card/SignUp/Mask_Group_2_h7vkom.png"
              alt=""
              h="100%"
              maxW="743px"
              w="100%"
            />
          </Box>
          <Flex
            justifyContent={"space-between"}
            flexDir={"column"}
            pl={{ base: "0", lg: "8vw" }}
            w={{ base: "auto", lg: "100%" }}
            m={{ base: "0px auto", lg: "0px" }}
            color={textColor}
          >
            <Box w="100%" maxW={"473px"}>
              <Flex alignItems={"center"}>
                <Box fontSize={"2rem"} display={{ base: "block", lg: "none" }}>
                  <BsArrowLeftShort />
                </Box>
                <Text
                  fontSize={{ base: "1.125rem", lg: "1.7rem", xl: "2.25rem" }}
                >
                  Recovery password
                </Text>
              </Flex>
              <Text fontSize={"1.5rem"} color={textColor1} mt="21px">
                Create new password
              </Text>
              <Text
                fontSize={"1rem"}
                lineHeight="35px"
                color={textColor1}
                mt="16px"
                fontWeight={"300"}
              >
                Your new password must be different from previous used
                passwords.
              </Text>
              <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                {(props) => (
                  <Form>
                    <Flex>
                      <Field name="password">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              (form.errors.password && form.touched.password) ||
                              errorMessage
                            }
                          >
                            <InputGroup
                              size="lg"
                              marginTop={15}
                              variant="outline"
                            >
                              <Input
                                pr="4.5rem"
                                type={show ? "text" : "password"}
                                placeholder="Password"
                                focusBorderColor="#88E000"
                                id="password"
                                color={textColor}
                                {...field}
                              />
                              <InputRightElement width="4.5rem">
                                <Button
                                  color={textColor}
                                  h="1.75rem"
                                  size="sm"
                                  onClick={showPassword}
                                >
                                  {show ? "Hide" : "Show"}
                                </Button>
                              </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>
                              {form.errors.password || errorMessage}{" "}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Flex>
                      <Field name="repassword">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              (form.errors.repassword &&
                                form.touched.repassword) ||
                              errorMessage
                            }
                          >
                            <InputGroup
                              size="lg"
                              marginTop={15}
                              variant="outline"
                            >
                              <Input
                                pr="4.5rem"
                                type={show ? "text" : "password"}
                                placeholder="Re-enter Password"
                                focusBorderColor="#88E000"
                                id="repassword"
                                color={textColor}
                                {...field}
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {form.errors.repassword || errorMessage}{" "}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Button
                      type="submit"
                      fontWeight={"600"}
                      fontSize={{ base: "1.125rem", md: "1.5rem" }}
                      maxW="388px"
                      w={{ base: "100%", xs: "388px" }}
                      h="62px"
                      mt="40px"
                    >
                      Sign In
                    </Button>
                  </Form>
                )}
              </Formik>
              {/* <Box
                mt="38px"
                fontSize={{ base: "0.875rem", md: "1rem" }}
                w="100%"
                maxW={"388px"}
              >
                <Input
                  h={{ base: "54px", md: "75px" }}
                  type="email"
                  placeholder="Enter Email Address"
                />
              </Box>
              <Text color={"#747474"} m="10px 0px">
                Must be atleast 8 characters.
              </Text> */}

              {/* <Box
                w="100%"
                h="75px"
                fontSize={{ base: "0.875rem", md: "1rem" }}
                maxW={"388px"}
                position="relative"
              >
                <Input
                  h={{ base: "54px", md: "75px" }}
                  type="password"
                  placeholder="Password"
                />
                <Box
                  pos="absolute"
                  color="#747474"
                  fontSize={"2rem"}
                  top="20px"
                  right="20px"
                >
                  <AiOutlineEye />
                </Box>
              </Box>
              <Text color={"#747474"} m="10px 0px">
                Both password must match.
              </Text> */}
            </Box>
            <p style={{ color: textColor1 }}>
              Didn’t receive the email? Check your spam folder or{" "}
              <span style={{ color: textColor2, fontWeight: "500" }}>
                try again
              </span>
            </p>
          </Flex>
        </Flex>
      </>
      {/* <h1>Forget password</h1>
      <p>Enter a new password for your account</p>
      <form onSubmit={handleSubmit}>
        <input
          ref={passwordRef}
          type="password"
          autoComplete="new-password"
          placeholder="New Password"
        />
        <button type="submit">Reset password</button>
      </form> */}
    </>
  );
}

export async function getServerSideProps({ params }) {
  await dbConnect();
  const token = await Token.findById(params.token).exec();
  console.log(token);
  return { props: { token: params.token, valid: !!token } };
}
