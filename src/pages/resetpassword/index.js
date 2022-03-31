import NextLink from "next/link";
import Head from "next/head";
import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Input,
  Text,
  FormControl,
  FormErrorMessage,
  useColorModeValue,
  useToast,
  Center,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { DarkModeSwitch } from "../../components/DarkModeSwitch";

function Reset() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
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
  const [errorMessage, seterrorMessage] = useState("");
  const [Loading, setLoading] = useState(false);

  const handleMail = async (values) => {
    setLoading(true);
    setEmail(values.email);

    const res = await fetch("/api/auth/resetpassword", {
      method: "POST",
      body: JSON.stringify({ email: values.email.toLowerCase().trim() }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 400) {
      Toast("User does not exist", "", "error");
      setLoading(false);
    }
    if (res.status === 500) {
      Toast("Error", "", "error");
      setLoading(false);
    }
    if (res.status === 402) {
      Toast("We have already sent you an email.", "", "error");
      setLoading(false);
    }
    if (res.status === 201) {
      Toast("Email sent to", `${values.email}`, "success");
      setLoading(false);
      setEmailSent(true);
    }
    if (data.error) {
      Toast("Error", data.error, "error");
      setLoading(false);
    }
    setLoading(false);
  };
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Enter Valid Email").required("Required").trim(),
  });
  const textColor = useColorModeValue("black", "white");
  const textColor1 = useColorModeValue("black", "#C8C8C8");
  const textColor2 = useColorModeValue("blue", "white");

  const bg = useColorModeValue("white", "black.200");
  return (
    <>
      <Head>
        <title>Password Recovery</title>
      </Head>
      <DarkModeSwitch />
      {!emailSent ? (
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
            flexDir={"column"}
            pl={{ base: "0", lg: "8vw" }}
            w={{ base: "auto", lg: "100%" }}
            m={{ base: "0px auto", lg: "0px" }}
            color={textColor}
          >
            <Flex mt={["20px", "20px", "120px"]} alignItems={"center"}>
              <NextLink href="/auth/signin" passHref>
                <Link fontWeight="bold" color={textColor}>
                  <Box
                    ml="-10px"
                    pr="10px"
                    fontSize={"2rem"}
                    display={{ base: "block", lg: "none" }}
                  >
                    <BsArrowLeftShort />
                  </Box>
                </Link>
              </NextLink>
              <Text
                fontSize={{ base: "1.125rem", lg: "1.7rem", xl: "2.25rem" }}
              >
                Recovery password
              </Text>
            </Flex>

            <Box w="100%" maxW={"473px"}>
              <Text mt="21px">
                Enter the email associated with your account we’ll send an email
                with instruction to reset your password.
              </Text>
            </Box>

            <Box
              mt="60px"
              fontSize={{ base: "0.875rem", md: "1rem" }}
              maxW={"388px"}
              w="100%"
            >
              <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleMail}
              >
                {(props) => (
                  <Form>
                    <Field name="email">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            (form.errors.email && form.touched.email) ||
                            errorMessage
                          }
                        >
                          <Input
                            autoComplete="off"
                            placeholder="Enter email address"
                            mt="20px"
                            id="email"
                            size="lg"
                            variant="outline"
                            {...field}
                            color={textColor}
                          />
                          <FormErrorMessage>
                            {form.errors.email || errorMessage}{" "}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Button
                      isLoading={Loading}
                      type="submit"
                      fontSize={{ base: "1.125rem", md: "1.5rem" }}
                      maxW="388px"
                      w={{ base: "100%", xs: "388px" }}
                      h="55px"
                      mt="20px"
                    >
                      Send
                    </Button>
                    <Flex direction="row" py="40px">
                      <Text fontWeight="light" color={textColor}>
                        Already have an account?
                      </Text>
                      <NextLink href="/auth/signin" passHref>
                        <Link fontWeight="bold" px={2} color={textColor}>
                          Sign in
                        </Link>
                      </NextLink>
                    </Flex>
                  </Form>
                )}
              </Formik>
            </Box>
          </Flex>
        </Flex>
      ) : (
        <Flex
          justifyContent={"space-between"}
          flexDir={"column"}
          pl={{ base: "0", lg: "8vw" }}
          pt="50px"
          w={{ base: "auto", lg: "100%" }}
          m={{ base: "0px auto", lg: "0px" }}
          color={textColor}
        >
          <Box>
            <Flex alignItems={"center"}>
              <Box fontSize={"2rem"} display={{ base: "block", lg: "none" }}>
                <BsArrowLeftShort />
              </Box>
              <Text
                fontSize={{ base: "1.125rem", lg: "1.7rem", xl: "2.25rem" }}
              >
                Password Recovery
              </Text>
            </Flex>
            <Box px={["10%", "0px", "0px"]}>
              <Center
                fontSize={"2.5rem"}
                boxSize={{ base: "72px", md: "108px" }}
                bgColor="greenBrand.100"
                borderRadius={"13px"}
                mt="50px"
                color="white"
              >
                <AiOutlineMail />
              </Center>
              <Text fontWeight={"500"} fontSize="1.5rem" mt="40px">
                Check your email
              </Text>
              <Flex>
                <Text color={textColor1} fontSize="1rem" mt="16px">
                  We have sent a password recover instruction to your email
                </Text>
              </Flex>
              {/* <Button
                fontWeight={"600"}
                h="62px"
                mt="40px"
                fontSize={{ base: "1.125rem", md: "1.5rem" }}
                maxW="388px"
                w={{ base: "100%", xs: "388px" }}
              >
                Check your Inbox
              </Button> */}
              <Flex direction="row" mt="10px">
                <Text fontWeight="light" color={textColor}>
                  <NextLink href="/auth/signin" passHref>
                    <Link fontWeight="bold" color={textColor}>
                      Sign in
                    </Link>
                  </NextLink>{" "}
                  with your account
                </Text>
              </Flex>
            </Box>
          </Box>
        </Flex>
      )}
    </>
  );
}

export default Reset;
