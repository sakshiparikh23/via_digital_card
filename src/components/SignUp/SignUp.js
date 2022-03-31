import React, { useState } from "react";
import NextLink from "next/link";
import {
  Flex,
  Text,
  Box,
  HStack,
  Image,
  Link,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormErrorMessage,
  useColorModeValue,
  Center,
  Checkbox,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  Heading,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { useRouter } from "next/router";
import { DarkModeSwitch } from "../DarkModeSwitch";

export default function SignUp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();
  const bgColor = useColorModeValue("black.200", "white");
  const buttonColor = useColorModeValue("white", "black.200");
  const border = useColorModeValue("white", "#242734");

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
  const logo = useColorModeValue(
    "https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Logo.png",
    "https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Logo+Dark.png"
  );
  // const logo = useColorModeValue(
  //   "https://res.cloudinary.com/dbm7us31s/image/upload/v1646034354/digital%20card/landing-page/logo_zt1jb4.png",
  //   "https://res.cloudinary.com/dbm7us31s/image/upload/v1646034356/digital%20card/landing-page/logo-dark_yijgxs.png"
  // );
  const color = useColorModeValue("white", "#302E2E");
  const textColor = useColorModeValue("gray.800", "white");
  const [show, setShow] = React.useState(false);
  const showPassword = () => setShow(!show);
  const [errorMessage, seterrorMessage] = useState("");
  const [Loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    repassword: "",
    terms: false,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Enter Valid Email").required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "eg : jhonDoe@123, Must Contain 8 Characters"
      )
      .required("Required"),
    repassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password does not matched")
      .required("Required"),
    terms: Yup.boolean()
      .oneOf([true], "You must accept the ToS and Privacy Policy")
      .required("Required"),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          firstName: values.name,
          email: values.email.trim(),
          password: values.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("resss", res);
      if (res.status === 422) {
        Toast("Email already exists", "Please Signin", "error");
        setLoading(false);
      }
      if (res.ok) {
        Toast("Successfully Signed Up", "", "success");
        router.replace("/auth/signin");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DarkModeSwitch />
      <HStack backgroundColor={color} width="full" h="100vh">
        <Box
          h={["0px", "0px", "full"]}
          as={Center}
          w={["0px", "0px", "45%"]}
          py={["0px", "0px", "10px"]}
          display={["none", "none", "flex"]}
        >
          <Image
            display={["none", "none", "flex"]}
            ml={["0px", "0px", "100px"]}
            alt=""
            h={["0px", "0px", "full"]}
            // h="full"
            // w="100%"
            // objectFit="content"
            src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Sign+Up+Right.png"
          />
        </Box>
        <Flex
          m="0px 0px 0px 0px!important"
          flexDirection="column"
          width={{ base: "100%", md: "65%", lg: "65%" }}
          height="full"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            alt=""
            h={["60px", "70px", "70px"]}
            // width={{ base: "250px", md: "200px", lg: "300px" }}
            marginBottom={2}
            src={logo}
          />
          <Text
            fontSize={{ base: "36px", md: "40px", lg: "45px" }}
            py={3}
            fontFamily="mono"
            fontWeight="normal"
            color={textColor}
            textAlign="center"
            alignSelf="center"
          >
            Sign Up
          </Text>
          {/* validation for name */}
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form>
                <Flex>
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          (form.errors.name && form.touched.name) ||
                          errorMessage
                        }
                      >
                        <Input
                          placeholder="Name"
                          width={{ base: "300px", md: "300px", lg: "400px" }}
                          marginTop={15}
                          size="lg"
                          variant="outline"
                          focusBorderColor="#88E000"
                          color={textColor}
                          {...field}
                        />
                        <FormErrorMessage>
                          {form.errors.name || errorMessage}{" "}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Flex>
                {/* validation for email */}
                <Flex>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          (form.errors.email && form.touched.email) ||
                          errorMessage
                        }
                      >
                        <Input
                          placeholder="Enter email address"
                          width={{ base: "300px", md: "300px", lg: "400px" }}
                          marginTop={15}
                          size="lg"
                          variant="outline"
                          focusBorderColor="#88E000"
                          id="email"
                          color={textColor}
                          {...field}
                        />
                        <FormErrorMessage>
                          {form.errors.email || errorMessage}{" "}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Flex>
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
                          width={{ base: "300px", md: "300px", lg: "400px" }}
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
                          (form.errors.repassword && form.touched.repassword) ||
                          errorMessage
                        }
                      >
                        <InputGroup
                          size="lg"
                          width={{ base: "300px", md: "300px", lg: "400px" }}
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
                          {form.errors.email || errorMessage}{" "}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Flex>
                <Flex pt="15px">
                  <Field name="terms">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          (form.errors.terms && form.touched.terms) ||
                          errorMessage
                        }
                      >
                        <HStack>
                          <Checkbox
                            size="md"
                            colorScheme="green"
                            {...field}
                          ></Checkbox>
                          <Text
                            color={textColor}
                            ml={["5px", "5px", "15px"]}
                            fontSize={{ base: "xs", md: "sm", lg: "sm" }}
                          >
                            Creating an account means you’re okay with our{" "}
                            <br />
                            <Modal
                              isOpen={isOpen}
                              onClose={onClose}
                              size={{ base: "sm", md: "md", lg: "sm" }}
                            >
                              <ModalOverlay />
                              <ModalContent
                                w={{ base: "80%", md: "50%", lg: "50%" }}
                                borderRadius={"35px"}
                                bgColor={bgColor}
                              >
                                <ModalCloseButton
                                  color={buttonColor}
                                  borderRadius="50%"
                                  right="35px"
                                  top="35px"
                                  border={`2px solid ${border}`}
                                />
                                <ModalBody
                                  as={Center}
                                  color={"white"}
                                  flexDir="column"
                                >
                                  <VStack spacing="20px">
                                    <Heading>Terms of Services</Heading>
                                    <Text>
                                      Last updated: December 24, 2021 Please
                                      read these Terms of Use (“Terms”, “Terms
                                      of Use”) carefully before using the
                                      http://viadigitalcard.in website (the
                                      “Service”) operated by Via Creative Tech
                                      LLP (“us”, “we”, or “our”). Your access to
                                      and use of the Service is conditioned on
                                      your acceptance of and compliance with
                                      these Terms. These Terms apply to all
                                      visitors, users and others who access or
                                      use the Service. By accessing or using the
                                      Service you agree to be bound by these
                                      Terms. If you disagree with any part of
                                      the terms then you may not access the
                                      Service.
                                    </Text>
                                    <Heading>Privacy Policy</Heading>
                                    <Text>
                                      Last updated: July 26, 2021 Via Creative
                                      Tech (“us”, “we”, or “our”) operates the
                                      Via Digital Card website (the “Service”).
                                      This page informs you of our policies
                                      regarding the collection, use and
                                      disclosure of Personal Information when
                                      you use our Service. We will not use or
                                      share your information with anyone except
                                      as described in this Privacy Policy. We
                                      use your Personal Information for
                                      providing and improving the Service. By
                                      using the Service, you agree to the
                                      collection and use of information in
                                      accordance with this policy. Unless
                                      otherwise defined in this Privacy Policy,
                                      terms used in this Privacy Policy have the
                                      same meanings as in our Terms and
                                      Conditions, accessible at
                                      http://viadigitalcard.in
                                    </Text>
                                  </VStack>
                                </ModalBody>
                              </ModalContent>
                            </Modal>
                            <Link
                              onClick={onOpen}
                              onClose={onClose}
                              fontWeight="bold"
                              pl="4px"
                              color="#0038FF"
                              zIndex={5}
                              mr="5px"
                            >
                              TOS
                            </Link>
                            and our
                            <Link
                              onClick={onOpen}
                              onClose={onClose}
                              fontWeight="bold"
                              pl="4px"
                              color="#0038FF"
                            >
                              Privacy Policy.
                            </Link>
                          </Text>
                        </HStack>
                        <FormErrorMessage>
                          {form.errors.terms || errorMessage}{" "}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Center>
                  <Button
                    type="submit"
                    h={"50px"}
                    fontSize="20px"
                    isLoading={Loading}
                    w={["300px", "300px", "380px"]}
                    mt={10}
                  >
                    Sign Up
                  </Button>
                </Center>
              </Form>
            )}
          </Formik>

          <Flex direction="row" marginTop={35}>
            <Text fontWeight="light" color={textColor}>
              Already have an account ?
            </Text>
            <NextLink href="/auth/signin" passHref>
              <Link fontWeight="bold" px={2} color={textColor}>
                Sign in
              </Link>
            </NextLink>
          </Flex>
        </Flex>
      </HStack>
    </>
  );
}
