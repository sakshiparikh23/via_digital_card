import React, { useEffect, useState } from "react";
import { boolean, mixed, object, string } from "yup";
import { Step, Steps } from "chakra-ui-steps";
import {
  VStack,
  Flex,
  Box,
  Avatar,
  Text,
  Input,
  HStack,
  Image,
  Center,
  Button,
  Stack,
  FormControl,
  FormErrorMessage,
  Textarea,
  useColorModeValue,
  CloseButton,
  useToast,
  Skeleton,
  Icon,
  IconButton,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { InfoIcon } from "@chakra-ui/icons";
import { BsUpload } from "react-icons/bs";
import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { DarkModeSwitch } from "../../components/DarkModeSwitch";
import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import { useS3Upload } from "next-s3-upload";
import Head from "next/head";
import Select from "react-select";

const steps = [
  {
    label: "Profile",
  },
  {
    label: "About",
  },
  {
    label: "Links",
  },
];

function Card() {
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  const [Color, setColor] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [profile, setProfile] = useState(null);
  const [document, setDocument] = useState(null);
  const [errorMessage, seterrorMessage] = useState("");
  const [value, setValue] = useState("");
  const [docvalue, setDocValue] = useState("");
  const textColor = useColorModeValue("gray.800", "white");
  const color = useColorModeValue("white", "#302E2E");
  const toast = useToast();
  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor:
        (state.isFocused && "#353647") ||
        (state.isSelected && "transparent") ||
        "transparent",
    }),
  };
  const customStylesLight = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor:
        (state.isFocused && "#F4FFE2") ||
        (state.isSelected && "transparent") ||
        "transparent",
      color: "black",
    }),
  };
  const select = useColorModeValue("custom-select-light", "custom-select");

  const options = [
    {
      value: "red",
      label: (
        <>
          <HStack>
            <Box bg="#f73131" h="30px" borderRadius="10px" w="30px"></Box>
            <Text>Red</Text>
          </HStack>
        </>
      ),
    },
    {
      value: "lightblue",
      label: (
        <>
          <HStack>
            <Box bg="#60d7f7 " h="30px" borderRadius="10px" w="30px"></Box>
            <Text>Light Blue</Text>
          </HStack>
        </>
      ),
    },
    {
      value: "orange",
      label: (
        <>
          <HStack>
            <Box bg="#ff8533 " h="30px" borderRadius="10px" w="30px"></Box>
            <Text>Orange</Text>
          </HStack>
        </>
      ),
    },
    {
      value: "purple",
      label: (
        <>
          <HStack>
            <Box bg="#d063ff" h="30px" borderRadius="10px" w="30px"></Box>
            <Text>Purple</Text>
          </HStack>
        </>
      ),
    },
    {
      value: "",
      label: (
        <>
          <HStack>
            <Box
              bg="greenBrand.100"
              h="30px"
              borderRadius="10px"
              w="30px"
            ></Box>
            <Text>Default</Text>
          </HStack>
        </>
      ),
    },
  ];

  useEffect(() => {
    setIsFetching(true);
    async function fetchAPINFC() {
      const res = await fetch("/api/auth/getnfc");
      console.log("res", res);
      const data = await res.json();
      console.log("data", data);
      if (res.status === 200) {
        setIsPremium(true);
        console.log("Premium Yes");
      }
      if (res.status === 400) {
        setIsPremium(false);
        console.log("Not Premium");
      }
      if (res.status === 500) {
        setIsPremium(false);
        console.log("Error");
      }
    }
    async function fetchAPI() {
      const res = await fetch("/api/auth/getpremiumuser");
      console.log("res", res);
      const data = await res.json();
      console.log("data", data);
      if (res.status === 200) {
        setIsPremium(true);
        console.log("Premium Yes");
      }
      if (res.status === 400) {
        // setIsPremium(false);
        console.log("Not Premium");
        fetchAPINFC().then(() => setIsFetching(false));
      }
      if (res.status === 500) {
        // setIsPremium(false);
        console.log("Error");
        fetchAPINFC().then(() => setIsFetching(false));
      }
    }
    fetchAPI().then(() => setIsFetching(false));
    return () => {};
  }, []);

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

  const contentType = "application/json";
  async function handleSubmit(values) {
    let uploadProfile;
    profile ? (uploadProfile = profile) : (uploadProfile = null);
    let photoURL;
    if (profile != null) {
      const { url } = await uploadToS3(uploadProfile);
      photoURL = url;
    }
    let uploadDocument;
    document ? (uploadDocument = document) : (uploadDocument = null);
    let DocURL;
    if (document != null) {
      const { url: docurl } = await uploadToS3(uploadDocument);
      DocURL = docurl;
    }

    const data = {
      name: values.name,
      profilePhoto: photoURL ? photoURL : values.profilePhoto,
      email: values.email,
      username: values.username,
      brochure: DocURL ? DocURL : values.document,
      pnumber: values.pnumber,
      snumber: values.snumber,
      address: values.address,
      designation: values.designation,
      tagline: values.tagline,
      bio: values.bio,
      website: values.website || "",
      socialLinks: {
        whatsapp: values.whatsapp || "",
        twitter: values.twitter || "",
        instagram: values.instagram || "",
        facebook: values.facebook || "",
        linkedin: values.linkedin || "",
        youtube: values.youtube || "",
        google: values.google || "",
      },
      payment: values.payment || "",
      views: 0,
      theme: Color,
    };
    console.log(data);

    const response = await fetch("/api/cards", {
      method: "POST",
      headers: {
        Accept: contentType,
        "Content-Type": contentType,
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (responseData.error) {
      Toast("Error", responseData.error, "error");
      return;
    } else if (responseData.success) {
      Toast("Success", "Card created successfully", "success");
      router.push("/cards");
    }
  }
  function handleChange(e) {
    setProfile(e);
    setValue(e.size);
  }
  function handleDocChange(e) {
    setDocument(e);
    setDocValue(e.size);
  }
  let validationShape;

  if (profile === null) {
    validationShape = {
      normal: Yup.object().shape({
        name: Yup.string()
          .required("Required")
          .min(3, "Must be minimum 3 characters")
          .max(30, "Must be maximum 30 characters"),
        email: Yup.string().email("Invalid Email").required("Required"),
        username: Yup.string().required("Required"),
      }),
    };
  } else {
    validationShape = {
      normal: Yup.object().shape({
        profilePhoto: mixed()
          .notRequired()
          .test(
            "profilePhoto",
            "File size is too large, Must be less than 1MB",
            (value) => value && value <= 1024 * 1024
          )
          .notRequired(),
        name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid Email").required("Required"),
        username: Yup.string().required("Required"),
      }),
    };
  }
  let validationDocShape;
  if (document === null) {
    validationDocShape = {
      withdoc: Yup.object().shape({
        pnumber: string()
          .min(10, "Must be Valid Phone Number")
          .max(10, "Must be Valid Phone Number")
          .required("Required"),
        snumber: isPremium
          ? string()
              .min(10, "Must be Valid Phone Number")
              .max(10, "Must be Valid Phone Number")
          : null,
        address: string().required("Required"),
        designation: string(),
        tagline: string(),
        bio: string().required("Required"),
        whatsapp: string()
          .min(10, "Must be Valid Phone Number")
          .max(10, "Must be Valid Phone Number"),
      }),
    };
  } else {
    validationDocShape = {
      withdoc: Yup.object().shape({
        document: mixed()
          .notRequired()
          .test(
            "document",
            `File size is too large, Must be less than ${
              isPremium ? "20MB" : "1MB"
            }`,

            (value) =>
              value && value <= (isPremium ? 20 * 1024 * 1024 : 1024 * 1024)
          )
          .notRequired(),
        pnumber: string()
          .min(10, "Must be Valid Phone Number")
          .max(10, "Must be Valid Phone Number")
          .required("Required"),
        snumber: isPremium
          ? string()
              .min(10, "Must be Valid Phone Number")
              .max(10, "Must be Valid Phone Number")
          : null,
        address: string().required("Required"),
        designation: string(),
        tagline: string(),
        bio: string().required("Required"),
        whatsapp: string()
          .min(10, "Must be Valid Phone Number")
          .max(10, "Must be Valid Phone Number"),
      }),
    };
  }

  return (
    <>
      <Head>
        <title> Create Digital Card </title>
      </Head>
      {/* <DarkModeSwitch /> */}
      <HStack
        spacing="0"
        color={textColor}
        h="100vh"
        bg={["white", "white", "#77C208"]}
      >
        <Image
          alt=""
          className="background"
          display={["none", "none", "flex"]}
          pl="100px"
          h="100vh"
          pos="absolute"
          src="https://res.cloudinary.com/dbm7us31s/image/upload/v1643549357/digital%20card/form/Profile/Group_17_wu2yen.svg"
        />
        <Box
          display={["none", "none", "flex"]}
          pos="relative"
          h={["0px", "0px", "full"]}
          w={["0px", "0px", "40%"]}
          as={Flex}
          justifyContent="end"
          flexDirection="column"
        >
          <Box
            display={["none", "none", "flex"]}
            h="full"
            as={Flex}
            flexDirection="column"
            justifyContent="flex-end"
          >
            <Image
              display={["none", "none", "flex"]}
              alt=""
              h="95%"
              minHeight="90%"
              src="https://res.cloudinary.com/dbm7us31s/image/upload/v1643548927/digital%20card/form/Profile/Saly-14_tzdjim.svg"
            />
          </Box>
        </Box>
        <Box zIndex={1} h="100vh" as={Center} w={["100%", "100%", "60%"]}>
          <Box
            as={Center}
            w={["100%", "100%", "70vh"]}
            h={["100%", "100%", "90vh"]}
          >
            {isFetching ? (
              <Box
                as={Flex}
                flexDirection="column"
                justifyContent="space-evenly"
                p={["0px", "0px", "50px"]}
                w="full"
                h="full"
                bg={color}
                boxShadow="8px 8px 24px 0px rgba(0, 0, 0, 0.1)"
                borderRadius={["0px", "0px", "36px"]}
              >
                <Skeleton height="40px" />
                <Skeleton height="40px" />
                <Skeleton height="40px" />
                <Skeleton height="40px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
              </Box>
            ) : isPremium ? (
              <Box
                as={Flex}
                flexDirection="column"
                justifyContent="space-evenly"
                p={["0px", "0px", "10px"]}
                w="full"
                h="full"
                bg={color}
                boxShadow="8px 8px 24px 0px rgba(0, 0, 0, 0.1)"
                borderRadius={["0px", "0px", "36px"]}
              >
                <Box
                  css={{
                    "&::-webkit-scrollbar": {
                      overflow: "hidden",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-track": {
                      borderRadius: "10px",
                      backgroundColor: "white",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      borderRadius: "10px",
                      backgroundColor: "#77C208",
                    },
                  }}
                  w="100%"
                  h="full"
                  overflow="auto"
                >
                  <Center p="6% 0% 6% 0%">
                    <Image
                      alt=""
                      h={["60px", "70px", "70px"]}
                      // width={{ base: "150px", md: "200px", lg: "300px" }}
                      // p="10px"
                      src={logo}
                    />
                  </Center>
                  {/* <Text
                  fontSize={{ base: "36px", md: "36px", lg: "38px" }}
                  fontFamily="mono"
                  fontStyle=""
                  textAlign="center"
                >
                  Via Digital Card
                </Text> */}

                  <div>
                    <FormikStepper
                      initialValues={{
                        profilePhoto: "",
                        name: "",
                        email: "",
                        username: "",
                        document: "",
                        pnumber: "",
                        snumber: "",
                        address: "",
                        designation: "",
                        tagline: "",
                        bio: "",
                        whatsapp: "",
                        website: "",
                        instagram: "",
                        facebook: "",
                        linkedin: "",
                        youtube: "",
                        payment: "",
                        google: "",
                      }}
                      onSubmit={handleSubmit}
                    >
                      <FormikStep
                        label="Personal Data"
                        validationSchema={validationShape.normal}
                      >
                        <VStack spacing="20px" py="10">
                          <Flex
                            as={Center}
                            w="full"
                            px={["50px", "50px", "50px", "90px"]}
                            py={["10px", "", "0px"]}
                            flexDirection={["column", "column", "row"]}
                          >
                            <Avatar
                              w="140px"
                              ml="20px"
                              h="140px"
                              src={profile ? URL.createObjectURL(profile) : ""}
                              // src="https://res.cloudinary.com/dbm7us31s/image/upload/v1643392997/digital%20card/form/Mask_Group_2_atdo50.svg"
                              boxSize="100px"
                              as={Center}
                            />
                            <Field name="profilePhoto">
                              {({ field, form }) => (
                                <FormControl
                                  isInvalid={
                                    (form.errors.profilePhoto &&
                                      form.touched.profilePhoto) ||
                                    errorMessage
                                  }
                                >
                                  <Input
                                    value={field.value}
                                    display="none"
                                    type="hidden"
                                    {...field}
                                  />
                                  <FileInput
                                    accept="image/jpeg,image/png"
                                    onChange={(e) => {
                                      handleChange(e);
                                      form.setFieldValue(
                                        "profilePhoto",
                                        e.size
                                      );
                                    }}
                                  />

                                  <Flex
                                    as={Center}
                                    // justifyContent="center"
                                    // alignItems="center"
                                  >
                                    <Button
                                      w="200px"
                                      ml={["0px", "0px", "20%"]}
                                      onClick={openFileDialog}
                                      color="white"
                                      bg="#88E000"
                                      mt={["10px", "", ""]}
                                      fontSize={{
                                        base: "12",
                                        md: "13",
                                        lg: "13",
                                      }}
                                      fontWeight="semibold"
                                      fontFamily="Open Sans"
                                    >
                                      {profile && profile
                                        ? "Change Profile Photo"
                                        : "Add Profile Photo"}
                                    </Button>
                                    {profile && profile ? (
                                      <CloseButton
                                        // as={Button}
                                        onClick={() => {
                                          setProfile(null);
                                        }}
                                        variant="ghost"
                                        mt="10px"
                                        ml="10px"
                                        size="md"
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </Flex>
                                  <FormErrorMessage
                                    fontSize={["10px", "sm", "sm"]}
                                    ml={["10%", "0px", "20%"]}
                                  >
                                    {form.errors.profilePhoto || errorMessage}{" "}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </Flex>
                          <Stack
                            as={Center}
                            w="full"
                            spacing="20px"
                            px={["20px", "60px", "80px"]}
                          >
                            <Field name="name">
                              {({ field, form }) => (
                                <FormControl
                                  isInvalid={
                                    (form.errors.name && form.touched.name) ||
                                    errorMessage
                                  }
                                >
                                  <Input
                                    h="60px"
                                    type="text"
                                    placeholder="Enter Name"
                                    marginTop={15}
                                    size="lg"
                                    variant="outline"
                                    focusBorderColor="#88E000"
                                    // color={textColor}
                                    {...field}
                                  />
                                  <FormErrorMessage>
                                    {form.errors.name || errorMessage}{" "}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                            <Field name="email">
                              {({ field, form }) => (
                                <FormControl
                                  isInvalid={
                                    (form.errors.email && form.touched.email) ||
                                    errorMessage
                                  }
                                >
                                  <Input
                                    h="60px"
                                    placeholder="Enter Email"
                                    marginTop={15}
                                    size="lg"
                                    variant="outline"
                                    focusBorderColor="#88E000"
                                    // color={textColor}
                                    {...field}
                                  />
                                  <FormErrorMessage>
                                    {form.errors.email || errorMessage}{" "}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                            <Field name="username">
                              {({ field, form }) => (
                                <FormControl
                                  isInvalid={
                                    (form.errors.username &&
                                      form.touched.username) ||
                                    errorMessage
                                  }
                                >
                                  <Input
                                    h="60px"
                                    placeholder="Enter username"
                                    marginTop={15}
                                    size="lg"
                                    variant="outline"
                                    focusBorderColor="#88E000"
                                    // color={textColor}
                                    {...field}
                                  />
                                  <FormErrorMessage>
                                    {form.errors.username || errorMessage}{" "}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </Stack>
                        </VStack>
                      </FormikStep>
                      <FormikStep
                        label="Bank Accounts"
                        validationSchema={validationDocShape.withdoc}
                      >
                        <VStack px="10%" py="10%" spacing="25px">
                          <Field name="document">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.document &&
                                    form.touched.document) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  value={field.value}
                                  display="none"
                                  type="hidden"
                                  {...field}
                                />
                                <FileInput
                                  type="file"
                                  accept="application/pdf"
                                  onChange={(e) => {
                                    handleDocChange(e);
                                    form.setFieldValue("document", e.size);
                                  }}
                                />

                                <Flex
                                  zIndex="2"
                                  borderRadius="10px"
                                  border="1px solid #88E000"
                                  // border="2px solid red"
                                  pl="20px"
                                  pr="20px"
                                  h="60px"
                                  as={Center}
                                  // justifyContent="center"
                                  // alignItems="center"
                                >
                                  <Text color="#96A2B3">
                                    {document && document
                                      ? document.name
                                      : "Upload Brochure"}
                                  </Text>
                                  <Spacer />
                                  {document && document ? (
                                    <CloseButton
                                      zIndex="10"
                                      // as={Button}
                                      onClick={() => {
                                        setDocument(null);
                                      }}
                                      variant="ghost"
                                      size="md"
                                    />
                                  ) : (
                                    <Icon
                                      onClick={openFileDialog}
                                      zIndex="10"
                                      color="#96A2B3"
                                      // border="2px solid red"
                                      as={BsUpload}
                                      fontSize="30px"
                                    />
                                    // <BsUpload size="md" />
                                  )}
                                </Flex>
                                <FormErrorMessage
                                  // border="2px solid red"
                                  fontSize={["10px", "sm", "sm"]}
                                  ml={["10%", "0px", "20%"]}
                                >
                                  {form.errors.document || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="pnumber">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.pnumber &&
                                    form.touched.pnumber) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  type="number"
                                  placeholder="Primary Phone Number"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.pnumber || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="snumber">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.snumber &&
                                    form.touched.snumber) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  type="number"
                                  placeholder="Secondary Phone Number"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.snumber || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="address">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.address &&
                                    form.touched.address) ||
                                  errorMessage
                                }
                              >
                                <Textarea
                                  placeholder="Address"
                                  mt="10px"
                                  size="lg"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  borderColor="#88E000"
                                  border="1px"
                                  resize="none"
                                  borderRadius="10px"
                                  {...field}
                                  color={textColor}
                                />
                                <FormErrorMessage>
                                  {form.errors.address || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="designation">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.designation &&
                                    form.touched.designation) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  placeholder="Designation"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.designation || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="tagline">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.tagline &&
                                    form.touched.tagline) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  placeholder="Tagline"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.tagline || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="bio">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.bio && form.touched.bio) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  placeholder="Bio"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.bio || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="whatsapp">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.whatsapp &&
                                    form.touched.whatsapp) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  type="number"
                                  placeholder="Whatsapp Number"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.whatsapp || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </VStack>
                      </FormikStep>
                      <FormikStep
                        validationSchema={object({
                          website: string().url().label("Path"),
                          twitter: string().url().label("Path"),
                          linkedin: string().url().label("Path"),
                          instagram: string().url().label("Path"),
                          youtube: string().url().label("Path"),
                          facebook: string().url().label("Path"),
                          payment: string().url().label("Path"),
                          google: string().url().label("Path"),
                        })}
                        label="More Info"
                      >
                        <VStack spacing="20px" px="10%" py="30px">
                          <Select
                            onChange={(e) => {
                              setColor(e.value);
                            }}
                            styles={
                              colorMode === "dark"
                                ? customStyles
                                : customStylesLight
                            }
                            options={options}
                            isSearchable={false}
                            hideSelectedOptions={false}
                            placeholder={"Select A Theme"}
                            className="react-select"
                            classNamePrefix={select}
                          />
                          <Field name="website">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.website &&
                                    form.touched.website) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  placeholder="Website"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.website || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>

                          <Field name="twitter">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.twitter &&
                                    form.touched.twitter) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  placeholder="Twitter"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.twitter || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="linkedin">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.linkedin &&
                                    form.touched.linkedin) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  placeholder="LinkedIn"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.linkedin || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="instagram">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.instagram &&
                                    form.touched.instagram) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  placeholder="Instagram"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.instagram || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="youtube">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.youtube &&
                                    form.touched.youtube) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  placeholder="Youtube"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.youtube || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="facebook">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.facebook &&
                                    form.touched.facebook) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  placeholder="Facebook"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.facebook || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="google">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.google &&
                                    form.touched.google) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  placeholder="Google"
                                  w="full"
                                  h="60px"
                                  marginTop={15}
                                  size="lg"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.google || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="payment">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.payment &&
                                    form.touched.payment) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  placeholder="Payment Link"
                                  w="full"
                                  h="60px"
                                  marginTop={15}
                                  size="lg"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.payment || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </VStack>
                      </FormikStep>
                    </FormikStepper>
                  </div>

                  {/* </Box> */}
                </Box>
              </Box>
            ) : (
              <Box
                as={Flex}
                flexDirection="column"
                justifyContent="space-evenly"
                p={["0px", "0px", "10px"]}
                w="full"
                h="full"
                bg={color}
                boxShadow="8px 8px 24px 0px rgba(0, 0, 0, 0.1)"
                borderRadius={["0px", "0px", "36px"]}
              >
                <Box
                  css={{
                    "&::-webkit-scrollbar": {
                      overflow: "hidden",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-track": {
                      borderRadius: "10px",
                      backgroundColor: "white",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      borderRadius: "10px",
                      backgroundColor: "#77C208",
                    },
                  }}
                  w="100%"
                  h="full"
                  overflow="auto"
                >
                  <Center p="6% 0% 6% 0%">
                    <Image
                      alt=""
                      h={["60px", "70px", "70px"]}
                      // width={{ base: "150px", md: "200px", lg: "300px" }}
                      // p="10px"
                      src={logo}
                    />
                  </Center>
                  {/* <Text
                fontSize={{ base: "36px", md: "36px", lg: "38px" }}
                fontFamily="mono"
                fontStyle=""
                textAlign="center"
              >
                Via Digital Card
              </Text> */}

                  <div>
                    <FormikStepper
                      initialValues={{
                        profilePhoto: "",
                        name: "",
                        email: "",
                        username: "",
                        pnumber: "",
                        snumber: "",
                        address: "",
                        designation: "",
                        tagline: "",
                        bio: "",
                        whatsapp: "",
                        website: "",
                        instagram: "",
                        facebook: "",
                        linkedin: "",
                        youtube: "",
                        payment: "",
                        google: "",
                      }}
                      onSubmit={handleSubmit}
                    >
                      <FormikStep
                        label="Personal Data"
                        validationSchema={validationShape.normal}
                      >
                        <VStack spacing="20px" py="10">
                          <Flex
                            as={Center}
                            w="full"
                            px={["50px", "50px", "50px", "90px"]}
                            py={["10px", "", "0px"]}
                            flexDirection={["column", "column", "row"]}
                          >
                            <Avatar
                              w="140px"
                              ml="20px"
                              h="140px"
                              src={profile ? URL.createObjectURL(profile) : ""}
                              // src="https://res.cloudinary.com/dbm7us31s/image/upload/v1643392997/digital%20card/form/Mask_Group_2_atdo50.svg"
                              boxSize="100px"
                              as={Center}
                            />
                            <Field name="profilePhoto">
                              {({ field, form }) => (
                                <FormControl
                                  isInvalid={
                                    (form.errors.profilePhoto &&
                                      form.touched.profilePhoto) ||
                                    errorMessage
                                  }
                                >
                                  <Input
                                    value={field.value}
                                    display="none"
                                    type="hidden"
                                    {...field}
                                  />
                                  <FileInput
                                    accept="image/jpeg,image/png"
                                    onChange={(e) => {
                                      handleChange(e);
                                      form.setFieldValue(
                                        "profilePhoto",
                                        e.size
                                      );
                                    }}
                                  />

                                  <Flex
                                    as={Center}
                                    // justifyContent="center"
                                    // alignItems="center"
                                  >
                                    <Button
                                      w="200px"
                                      ml={["0px", "0px", "20%"]}
                                      onClick={openFileDialog}
                                      color="white"
                                      bg="#88E000"
                                      mt={["10px", "", ""]}
                                      fontSize={{
                                        base: "12",
                                        md: "13",
                                        lg: "13",
                                      }}
                                      fontWeight="semibold"
                                      fontFamily="Open Sans"
                                    >
                                      {profile && profile
                                        ? "Change Profile Photo"
                                        : "Add Profile Photo"}
                                    </Button>
                                    {profile && profile ? (
                                      <CloseButton
                                        // as={Button}
                                        onClick={() => {
                                          setProfile(null);
                                        }}
                                        variant="ghost"
                                        mt="10px"
                                        ml="10px"
                                        size="md"
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </Flex>
                                  <FormErrorMessage
                                    fontSize={["10px", "sm", "sm"]}
                                    ml={["10%", "0px", "20%"]}
                                  >
                                    {form.errors.profilePhoto || errorMessage}{" "}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </Flex>
                          <Stack
                            as={Center}
                            w="full"
                            spacing="20px"
                            px={["20px", "60px", "80px"]}
                          >
                            <Field name="name">
                              {({ field, form }) => (
                                <FormControl
                                  isInvalid={
                                    (form.errors.name && form.touched.name) ||
                                    errorMessage
                                  }
                                >
                                  <Input
                                    h="60px"
                                    type="text"
                                    placeholder="Enter Name"
                                    marginTop={15}
                                    size="lg"
                                    variant="outline"
                                    focusBorderColor="#88E000"
                                    // color={textColor}
                                    {...field}
                                  />
                                  <FormErrorMessage>
                                    {form.errors.name || errorMessage}{" "}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                            <Field name="email">
                              {({ field, form }) => (
                                <FormControl
                                  isInvalid={
                                    (form.errors.email && form.touched.email) ||
                                    errorMessage
                                  }
                                >
                                  <Input
                                    h="60px"
                                    placeholder="Enter Email"
                                    marginTop={15}
                                    size="lg"
                                    variant="outline"
                                    focusBorderColor="#88E000"
                                    // color={textColor}
                                    {...field}
                                  />
                                  <FormErrorMessage>
                                    {form.errors.email || errorMessage}{" "}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                            <Field name="username">
                              {({ field, form }) => (
                                <FormControl
                                  isInvalid={
                                    (form.errors.username &&
                                      form.touched.username) ||
                                    errorMessage
                                  }
                                >
                                  <Input
                                    h="60px"
                                    placeholder="Enter username"
                                    marginTop={15}
                                    size="lg"
                                    variant="outline"
                                    focusBorderColor="#88E000"
                                    // color={textColor}
                                    {...field}
                                  />
                                  <FormErrorMessage>
                                    {form.errors.username || errorMessage}{" "}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </Stack>
                        </VStack>
                      </FormikStep>
                      <FormikStep
                        validationSchema={validationDocShape.withdoc}
                        label={""}
                      >
                        <VStack px="10%" py="10%" spacing="25px">
                          <Field name="document">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.document &&
                                    form.touched.document) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  value={field.value}
                                  display="none"
                                  type="hidden"
                                  {...field}
                                />
                                <FileInput
                                  type="file"
                                  accept="application/pdf"
                                  onChange={(e) => {
                                    handleDocChange(e);
                                    form.setFieldValue("document", e.size);
                                  }}
                                />

                                <Flex
                                  zIndex="2"
                                  borderRadius="10px"
                                  border="1px solid #88E000"
                                  // border="2px solid red"
                                  pl="20px"
                                  pr="20px"
                                  h="60px"
                                  as={Center}
                                  // justifyContent="center"
                                  // alignItems="center"
                                >
                                  <Text color="#96A2B3">
                                    {document && document
                                      ? document.name
                                      : "Upload Brochure"}
                                  </Text>
                                  <Spacer />
                                  {document && document ? (
                                    <CloseButton
                                      zIndex="10"
                                      // as={Button}
                                      onClick={() => {
                                        setDocument(null);
                                      }}
                                      variant="ghost"
                                      size="md"
                                    />
                                  ) : (
                                    <Icon
                                      onClick={openFileDialog}
                                      zIndex="10"
                                      color="#96A2B3"
                                      // border="2px solid red"
                                      as={BsUpload}
                                      fontSize="30px"
                                    />
                                    // <BsUpload size="md" />
                                  )}
                                </Flex>
                                <FormErrorMessage
                                  // border="2px solid red"
                                  fontSize={["10px", "sm", "sm"]}
                                  ml={["10%", "0px", "20%"]}
                                >
                                  {form.errors.document || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="pnumber">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.pnumber &&
                                    form.touched.pnumber) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  type="number"
                                  placeholder="Primary Phone Number"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.pnumber || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="snumber">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.snumber &&
                                    form.touched.snumber) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  isDisabled={true}
                                  type="number"
                                  placeholder="Secondary Phone Number"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                />
                                <InfoIcon
                                  color="red.200"
                                  pos="absolute"
                                  right="20px"
                                  top="50%"
                                  bottom="50%"
                                />
                                <Box
                                  cursor="pointer"
                                  as={Center}
                                  bg="red.400"
                                  // h="100%"
                                  borderRadius="8px"
                                  color={textColor}
                                  textAlign="center"
                                  // border="2px solid red"
                                  right="50px"
                                  top="45%"
                                  bottom="55%"
                                  pos="absolute"
                                  // w="50%"
                                  p="6px"
                                  h="25px"
                                  display="none"
                                  _groupHover={{ display: "flex" }}
                                >
                                  <Text onClick={() => Router.push("/pricing")}>
                                    Only for Premium User
                                  </Text>
                                </Box>
                                <FormErrorMessage>
                                  {form.errors.snumber || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="address">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.address &&
                                    form.touched.address) ||
                                  errorMessage
                                }
                              >
                                <Textarea
                                  placeholder="Address"
                                  mt="10px"
                                  size="lg"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  borderColor="#88E000"
                                  border="1px"
                                  resize="none"
                                  borderRadius="10px"
                                  {...field}
                                  color={textColor}
                                />
                                <FormErrorMessage>
                                  {form.errors.address || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="designation">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.designation &&
                                    form.touched.designation) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  placeholder="Designation"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.designation || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="tagline">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.tagline &&
                                    form.touched.tagline) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  placeholder="Tagline"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.tagline || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="bio">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.bio && form.touched.bio) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  placeholder="Bio"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.bio || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="whatsapp">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.whatsapp &&
                                    form.touched.whatsapp) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  type="number"
                                  placeholder="Whatsapp Number"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.whatsapp || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </VStack>
                      </FormikStep>
                      <FormikStep label="More Info">
                        <VStack spacing="20px" px="10%" py="30px">
                          <Field name="website">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.website &&
                                    form.touched.website) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  placeholder="https://example.com"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.website || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>

                          <Field name="twitter">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.twitter &&
                                    form.touched.twitter) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  placeholder="https://twitter.com/username"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.twitter || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="linkedin">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.linkedin &&
                                    form.touched.linkedin) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  placeholder="https://linkedin.com/in/username"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.linkedin || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="instagram">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.instagram &&
                                    form.touched.instagram) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  placeholder="https://instagram.com/username"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.instagram || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="youtube">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.youtube &&
                                    form.touched.youtube) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  isDisabled={true}
                                  placeholder="https://youtube.com/link"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <InfoIcon
                                  color="red.200"
                                  pos="absolute"
                                  right="20px"
                                  top="50%"
                                  bottom="50%"
                                />
                                <Box
                                  cursor="pointer"
                                  as={Center}
                                  bg="red.400"
                                  // h="100%"
                                  borderRadius="8px"
                                  color={textColor}
                                  textAlign="center"
                                  // border="2px solid red"
                                  right="50px"
                                  top="45%"
                                  bottom="55%"
                                  pos="absolute"
                                  // w="50%"
                                  p="6px"
                                  h="25px"
                                  display="none"
                                  _groupHover={{ display: "flex" }}
                                >
                                  <Text onClick={() => Router.push("/pricing")}>
                                    Only for Premium User
                                  </Text>
                                </Box>
                                <FormErrorMessage>
                                  {form.errors.youtube || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="facebook">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.facebook &&
                                    form.touched.facebook) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  placeholder="https://facebook.com/username"
                                  marginTop={15}
                                  size="lg"
                                  h="60px"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.facebook || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="google">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.google &&
                                    form.touched.google) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  placeholder="Google Link"
                                  w="full"
                                  h="60px"
                                  marginTop={15}
                                  size="lg"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.google || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="payment">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.payment &&
                                    form.touched.payment) ||
                                  errorMessage
                                }
                              >
                                <Input
                                  placeholder="Payment Link"
                                  w="full"
                                  h="60px"
                                  marginTop={15}
                                  size="lg"
                                  variant="outline"
                                  focusBorderColor="#88E000"
                                  color={textColor}
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.payment || errorMessage}{" "}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </VStack>
                      </FormikStep>
                    </FormikStepper>
                  </div>

                  {/* </Box> */}
                </Box>
              </Box>
            )}
            {/* Skeleton */}
          </Box>
        </Box>
      </HStack>
    </>
  );
}
export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Steps
            p="20px 30px 0 30px"
            responsive={false}
            maxH="70px"
            as={Box}
            color="white"
            colorScheme="brand"
            activeStep={step}
            labelOrientation="vertical"
          >
            {steps.map(({ label }) => (
              <Step label={label} key={label}>
                {/* {label} */}
              </Step>
            ))}
          </Steps>
          {currentChild}
          <Center as={Flex} justifyContent="space-evenly">
            {step > 0 ? (
              <Button
                disabled={isSubmitting}
                // variant="contained"
                h="50px"
                w="130px"
                // color="primary"

                onClick={() => setStep((s) => s - 1)}
              >
                Back
              </Button>
            ) : (
              ""
            )}
            <Button
              disabled={isSubmitting}
              type="submit"
              fontSize="20px"
              w="130px"
              h="50px"
              // w={["300px", "300px", "80px"]}
            >
              {isSubmitting ? "Submitting" : isLastStep() ? "Submit" : "Next"}
            </Button>
          </Center>
        </Form>
      )}
    </Formik>
  );
}

export default Card;
