import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import NextLink from "next/link";
import {
  Flex,
  Text,
  Image,
  Input,
  InputGroup,
  Link,
  InputRightElement,
  Button,
  FormControl,
  FormErrorMessage,
  useColorModeValue,
  useToast,
  Center,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { DarkModeSwitch } from "../DarkModeSwitch";

export const SignIn = () => {
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
  const logo = useColorModeValue(
    "https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Logo.png",
    "https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Logo+Dark.png"
  );

  const color = useColorModeValue("white", "#302E2E");
  const textColor = useColorModeValue("gray.800", "white");
  const [show, setShow] = React.useState(false);
  const [Loading, setLoading] = useState(false);
  const showPassword = () => setShow(!show);
  const { data: session, token } = useSession();
  const router = useRouter();
  const [errorMessage, seterrorMessage] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Enter Valid Email").required("Required").trim(),
    password: Yup.string()
      .matches(
        // , One Uppercase, One Lowercase, One Number and One Special Case Character
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters"
      )
      .required("Required"),
  });

  async function handleSubmit(values) {
    if (!session) {
      try {
        setLoading(true);
        const result = await signIn("credentials", {
          redirect: false,
          email: values.email.trim(),
          password: values.password,
        });

        setLoading(false);

        if (result.error) {
          Toast("", result.error, "error");
          console.log(result.error);
        } else {
          Toast("Welcome", "Successfully Signed In", "success");
          router.replace("/cards");
        }
      } catch (error) {
        Toast("", error, "error");
      }
    } else {
      router.push("/");
    }
  }
  return (
    <>
      {/* <DarkModeSwitch /> */}
      <Flex
        bg={color}
        as={Center}
        justifyContent="space-evenly"
        w="full"
        h="100vh"
      >
        <VStack as={Center} px={["", "80px"]}>
          <Image
            alt=""
            h={["60px", "70px", "70px"]}
            // width={{ base: "150px", md: "200px", lg: "300px" }}
            // p="10px"
            src={logo}
          />
          <Text
            fontSize={{ base: "40px", md: "40px", lg: "45px" }}
            py={3}
            fontFamily="mono"
            fontWeight="normal"
            color={textColor}
          >
            Sign in
          </Text>
          <Flex>
            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
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
                          placeholder="Enter email address"
                          mt="20px"
                          id="email"
                          h={["50px", "50px", "60px"]}
                          w={["300px", "300px", "400px"]}
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
                          w={["300px", "300px", "400px"]}
                          mt="20px"
                        >
                          <Input
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Password"
                            id="password"
                            h={["50px", "50px", "60px"]}
                            variant="outline"
                            {...field}
                            color={textColor}
                          />
                          <InputRightElement
                            h={["50px", "50px", "60px"]}
                            width="4.5rem"
                          >
                            <Button
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
                  <NextLink href="/resetpassword" passHref>
                    <Link fontWeight="bold" px={2} color={textColor}>
                      <Text
                        as={Flex}
                        justifyContent="end"
                        color={textColor}
                        fontWeight="semibold"
                      >
                        Recovery password
                      </Text>
                    </Link>
                  </NextLink>

                  <Center>
                    <Button
                      type="submit"
                      h={"50px"}
                      fontSize="20px"
                      isLoading={Loading}
                      w={["300px", "300px", "380px"]}
                    >
                      Sign In
                    </Button>
                  </Center>
                </Form>
              )}
            </Formik>
          </Flex>
          <Flex direction="row" py="40px">
            <Text fontWeight="light" color={textColor}>
              Not a member ?
            </Text>
            <NextLink href="/auth/signup" passHref>
              <Link fontWeight="bold" px={2} color={textColor}>
                Create account now
              </Link>
            </NextLink>
          </Flex>
        </VStack>
        <Flex display={["none", "none", "flex"]}>
          <Image
            w="full"
            alt=""
            py="10px"
            h="100vh"
            src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Sign+In+Right.png"
          />
        </Flex>
      </Flex>
    </>
  );
};
