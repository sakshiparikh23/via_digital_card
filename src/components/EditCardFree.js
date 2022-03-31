import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import {
  Input,
  FormControl,
  FormErrorMessage,
  useColorModeValue,
  Textarea,
  Center,
  Button,
  CloseButton,
  Flex,
  Avatar,
  useToast,
  Box,
  FormLabel,
  Spacer,
  Icon,
  Text,
} from "@chakra-ui/react";
import { mixed, number, object, string } from "yup";
import { BsUpload } from "react-icons/bs";
import { useS3Upload } from "next-s3-upload";
import { InfoIcon } from "@chakra-ui/icons";

export default function Card({ inputData }) {
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

  function removeLink(str) {
    return str.replace(/^.*[\\\/]/, "");
  }

  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  let { FileInput: FileInputBrochure, openFileDialog: openFileDialogBrochure } =
    useS3Upload();

  const [value, setValue] = useState("");

  const [profile, setProfile] = useState(null);
  const [document, setDocument] = useState(null);
  const [docvalue, setDocValue] = useState("");

  const [Loading, setLoading] = useState(false);
  const textColor = useColorModeValue("gray.800", "white");
  const [errorMessage, seterrorMessage] = useState("");
  const contentType = "application/json";
  const [data, setData] = useState({
    name: inputData.name,
    profilePhoto: inputData.profilePhoto,
    email: inputData.email,
    username: inputData.username,
    brochure: inputData.brochure,
    pnumber: inputData.pnumber,
    snumber: inputData.snumber,
    address: inputData.address,
    designation: inputData.designation,
    tagline: inputData.tagline,
    bio: inputData.bio,
    website: inputData.website,
    whatsapp: inputData.socialLinks.whatsapp,
    linkedin: inputData.socialLinks.linkedin,
    instagram: inputData.socialLinks.instagram,
    twitter: inputData.socialLinks.twitter,
    youtube: inputData.socialLinks.youtube,
    facebook: inputData.socialLinks.facebook,
    payment: inputData.payment,
    google: inputData.google,
  });
  function handleChangePhoto(e) {
    setProfile(e);
    setValue(e.size);
  }
  function handleChangeDoc(e) {
    setDocument(e);
    setDocValue(e.size);
  }

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setData({
      ...data,
      [name]: value,
    });
  };
  const router = useRouter();
  //handle submit
  const handleSubmit = async () => {
    setLoading(true);

    let photoUrl = "";
    if (profile) {
      let { url } = await uploadToS3(profile);
      photoUrl = url;
    }
    if (photoUrl === "") {
      photoUrl = data.profilePhoto;
    }

    let docUrl = "";
    if (document) {
      let { url: docurl } = await uploadToS3(document);
      docUrl = docurl;
    }
    if (docUrl === "") {
      docUrl = data.brochure;
    }

    console.log(photoUrl);

    const values = {
      _id: inputData._id,
      card_id: inputData.card_id,
      name: data.name,
      profilePhoto: photoUrl,
      email: data.email,
      brochure: docUrl,
      username: data.username,
      pnumber: data.pnumber,
      snumber: data.snumber,
      address: data.address,
      designation: data.designation,
      tagline: data.tagline,
      bio: data.bio,
      website: data.website || "",
      socialLinks: {
        whatsapp: data.whatsapp || "",
        twitter: data.twitter || "",
        instagram: data.instagram || "",
        facebook: data.facebook || "",
        linkedin: data.linkedin || "",
        youtube: data.youtube || "",
      },
      payment: data.payment || "",
    };

    const response = await fetch("/api/cards", {
      method: "PUT",
      headers: {
        Accept: contentType,
        "Content-Type": contentType,
      },
      body: JSON.stringify(values),
    });
    const responseData = await response.json();
    if (responseData.error) {
      seterrorMessage(responseData.error);
      setLoading(false);
    } else {
      router.replace("/cards");
    }
  };

  return (
    <div>
      <Box w="full">
        <Formik
          validationSchema={Yup.object().shape({
            profilePhoto:
              profile != null
                ? Yup.mixed()
                    .notRequired()
                    .test(
                      "profilePhoto",
                      "File size is too large, Must be less than 1MB",
                      (value) => value && value <= 1024 * 1024
                    )
                    .notRequired()
                : null,
            name: Yup.string().required("Required"),
            email: Yup.string().email("Enter Valid Email").required("Required"),
            username: Yup.string().required("Required"),
            document:
              document != null
                ? Yup.mixed()
                    .notRequired()
                    .test(
                      "document",
                      `File size is too large, Must be less than 1MB`,
                      (value) => value && value <= 1024 * 1024
                    )
                    .notRequired()
                : null,
            pnumber: string()
              .min(10, "Must be Valid Phone Number")
              .max(10, "Must be Valid Phone Number")
              .required("Required"),

            address: string().required("Required"),
            designation: Yup.string(),
            tagline: string(),
            bio: string().required("Required"),
            whatsapp: string()
              .min(10, "Must be Valid Phone Number")
              .max(10, "Must be Valid Phone Number"),
            website: Yup.string().url().label("Path"),
            linkedin: Yup.string().url().label("Path"),
            twitter: Yup.string().url().label("Path"),
            instagram: Yup.string().url().label("Path"),
            facebook: Yup.string().url().label("Path"),
            payment: Yup.string().url().label("Path"),
            google: Yup.string().url().label("Path"),
          })}
          initialValues={{
            name: inputData.name,
            email: inputData.email,
            username: inputData.username,
            pnumber: inputData.pnumber,
            designation: inputData.designation,
            address: inputData.address,
            tagline: inputData.tagline,
            bio: inputData.bio,
            website: inputData.website,
            whatsapp: inputData.socialLinks.whatsapp,
            twitter: inputData.socialLinks.twitter,
            linkedin: inputData.socialLinks.linkedin,
            instagram: inputData.socialLinks.instagram,
            facebook: inputData.socialLinks.facebook,
            payment: inputData.payment,
            google: inputData.google,
          }}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
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
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : inputData.profilePhoto
                  }
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
                        onChange={(e) => {
                          handleChangePhoto(e);
                          form.setFieldValue("profilePhoto", e.size);
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
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    onChange={(e) => handleChange(e)}
                    isInvalid={
                      (form.errors.name && form.touched.name) || errorMessage
                    }
                  >
                    <FormLabel color={textColor} htmlFor="name" marginTop={15}>
                      Name:
                    </FormLabel>
                    <Input
                      placeholder="Enter Name"
                      w="full"
                      h="60px"
                      size="lg"
                      variant="outline"
                      focusBorderColor="#88E000"
                      id="name"
                      color={textColor}
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
                    onChange={(e) => handleChange(e)}
                    isInvalid={
                      (form.errors.email && form.touched.email) || errorMessage
                    }
                  >
                    <FormLabel color={textColor} htmlFor="email" mt="20px">
                      Email:
                    </FormLabel>
                    <Input
                      placeholder="Enter email address"
                      id="email"
                      w="full"
                      h="60px"
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
              <Field name="username">
                {({ field, form }) => (
                  <FormControl
                    onChange={(e) => handleChange(e)}
                    isInvalid={
                      (form.errors.username && form.touched.username) ||
                      errorMessage
                    }
                  >
                    <FormLabel color={textColor} htmlFor="username" mt="20px">
                      Username:
                    </FormLabel>
                    <Input
                      placeholder="Enter Username"
                      id="username"
                      w="full"
                      h="60px"
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
              <Field name="document">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      (form.errors.document && form.touched.document) ||
                      errorMessage
                    }
                  >
                    <FormLabel color={textColor} htmlFor="name" marginTop={15}>
                      Upload Brochure :
                    </FormLabel>
                    <Input
                      value={field.value}
                      display="none"
                      type="hidden"
                      {...field}
                    />
                    <FileInputBrochure
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => {
                        handleChangeDoc(e);
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
                      <Text color={textColor}>
                        {document && document
                          ? document.name
                          : inputData.brochure
                          ? removeLink(inputData?.brochure)
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
                          onClick={openFileDialogBrochure}
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
                    onChange={(e) => handleChange(e)}
                    isInvalid={
                      (form.errors.pnumber && form.touched.pnumber) ||
                      errorMessage
                    }
                  >
                    <FormLabel color={textColor} htmlFor="number" mt="20px">
                      Primary Phone Number:
                    </FormLabel>
                    <Input
                      type="number"
                      id="number"
                      placeholder="Primary Phone Number"
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
              <Field>
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel color={textColor} htmlFor="number" mt="20px">
                      Secondary Phone Number:
                    </FormLabel>
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
                  </FormControl>
                )}
              </Field>
              {/* <Field name="snumber">
                {({ field, form }) => (
                  <FormControl
                    onChange={(e) => handleChange(e)}
                    isInvalid={
                      (form.errors.snumber && form.touched.snumber) ||
                      errorMessage
                    }
                  >
                    <FormLabel color={textColor} htmlFor="number" mt="20px">
                      Secondary Phone Number:
                    </FormLabel>
                    <Input
                      id="number"
                      type="number"
                      placeholder="Secondary Phone Number"
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
              </Field> */}
              <Field name="address">
                {({ field, form }) => (
                  <FormControl
                    onChange={(e) => handleChange(e)}
                    isInvalid={
                      (form.errors.address && form.touched.address) ||
                      errorMessage
                    }
                  >
                    <FormLabel color={textColor} htmlFor="address" mt="20px">
                      Address:
                    </FormLabel>
                    <Textarea
                      id="address"
                      placeholder="Address"
                      variant="outline"
                      focusBorderColor="#88E000"
                      borderColor="#88E000"
                      border="1px"
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
              {/* <Field>
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel
                      color={textColor}
                      htmlFor="designation"
                      mt="20px"
                    >
                      Designation:
                    </FormLabel>
                    <Input
                      isDisabled={true}
                      placeholder="Designation"
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
                  </FormControl>
                )}
              </Field> */}
              <Field name="designation">
                {({ field, form }) => (
                  <FormControl
                    onChange={(e) => handleChange(e)}
                    isInvalid={
                      (form.errors.designation && form.touched.designation) ||
                      errorMessage
                    }
                  >
                    <FormLabel
                      color={textColor}
                      htmlFor="designation"
                      mt="20px"
                    >
                      Designation:
                    </FormLabel>
                    <Input
                      id="designation"
                      placeholder="Designation"
                      width="full"
                      size="lg"
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
                    onChange={(e) => handleChange(e)}
                    isInvalid={
                      (form.errors.tagline && form.touched.tagline) ||
                      errorMessage
                    }
                  >
                    <FormLabel color={textColor} htmlFor="Tagline" mt="20px">
                      Tagline:
                    </FormLabel>
                    <Input
                      id="Tagline"
                      placeholder="Tagline"
                      width="full"
                      size="lg"
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
                    onChange={(e) => handleChange(e)}
                    isInvalid={
                      (form.errors.bio && form.touched.bio) || errorMessage
                    }
                  >
                    <FormLabel color={textColor} htmlFor="bio" mt="20px">
                      Bio:
                    </FormLabel>
                    <Input
                      id="bio"
                      placeholder="Bio"
                      width="full"
                      size="lg"
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
              <Field name="website">
                {({ field, form }) => (
                  <FormControl
                    onChange={(e) => handleChange(e)}
                    isInvalid={
                      (form.errors.website && form.touched.website) ||
                      errorMessage
                    }
                  >
                    <FormLabel color={textColor} htmlFor="website" mt="20px">
                      Website:
                    </FormLabel>
                    <Input
                      id="website"
                      placeholder="website"
                      width="full"
                      size="lg"
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
              <Field name="whatsapp">
                {({ field, form }) => (
                  <FormControl
                    onChange={(e) => handleChange(e)}
                    isInvalid={
                      (form.errors.whatsapp && form.touched.whatsapp) ||
                      errorMessage
                    }
                  >
                    <FormLabel color={textColor} htmlFor="whatsapp" mt="20px">
                      Whatsapp:
                    </FormLabel>
                    <Input
                      id="whatsapp"
                      placeholder="Number"
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
              <Field name="twitter">
                {({ field, form }) => (
                  <FormControl
                    onChange={(e) => handleChange(e)}
                    isInvalid={
                      (form.errors.twitter && form.touched.twitter) ||
                      errorMessage
                    }
                  >
                    <FormLabel color={textColor} htmlFor="twitter" mt="20px">
                      Twitter:
                    </FormLabel>
                    <Input
                      id="twitter"
                      placeholder="Link"
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
                    onChange={(e) => handleChange(e)}
                    isInvalid={
                      (form.errors.linkedin && form.touched.linkedin) ||
                      errorMessage
                    }
                  >
                    <FormLabel color={textColor} htmlFor="linkedin" mt="20px">
                      Linkedin:
                    </FormLabel>
                    <Input
                      id="linkedin"
                      placeholder="Link"
                      size="lg"
                      width="full"
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
                    onChange={(e) => handleChange(e)}
                    isInvalid={
                      (form.errors.instagram && form.touched.instagram) ||
                      errorMessage
                    }
                  >
                    <FormLabel color={textColor} htmlFor="instagram" mt="20px">
                      Instagram:
                    </FormLabel>
                    <Input
                      id="instagram"
                      placeholder="Link"
                      width="full"
                      size="lg"
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
                      (form.errors.youtube && form.touched.youtube) ||
                      errorMessage
                    }
                  >
                    <FormLabel color={textColor} htmlFor="facebook" mt="20px">
                      Youtube :
                    </FormLabel>
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
              {/* <Field name="youtube">
                {({ field, form }) => (
                  <FormControl
                    onChange={(e) => handleChange(e)}
                    isInvalid={
                      (form.errors.youtube && form.touched.youtube) ||
                      errorMessage
                    }
                  >
                    <FormLabel color={textColor} htmlFor="youtube" mt="20px">
                      Youtube Video:
                    </FormLabel>
                    <Input
                      id="youtube"
                      placeholder="Link"
                      width="full"
                      size="lg"
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
              </Field> */}
              <Field name="facebook">
                {({ field, form }) => (
                  <FormControl
                    onChange={(e) => handleChange(e)}
                    isInvalid={
                      (form.errors.facebook && form.touched.facebook) ||
                      errorMessage
                    }
                  >
                    <FormLabel color={textColor} htmlFor="facebook" mt="20px">
                      Facebook:
                    </FormLabel>
                    <Input
                      id="facebook"
                      placeholder="Link"
                      width="full"
                      size="lg"
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
              <Field name="payment">
                {({ field, form }) => (
                  <FormControl
                    onChange={(e) => handleChange(e)}
                    isInvalid={
                      (form.errors.payment && form.touched.payment) ||
                      errorMessage
                    }
                  >
                    <FormLabel color={textColor} htmlFor="payment" mt="20px">
                      Payment:
                    </FormLabel>
                    <Input
                      id="payment"
                      placeholder="payment link"
                      w="full"
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
              <Field name="google">
                {({ field, form }) => (
                  <FormControl
                    onChange={(e) => handleChange(e)}
                    isInvalid={
                      (form.errors.google && form.touched.google) ||
                      errorMessage
                    }
                  >
                    <FormLabel color={textColor} htmlFor="payment" mt="20px">
                      Google:
                    </FormLabel>
                    <Input
                      id="payment"
                      placeholder="Link"
                      w="full"
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
              <Center>
                <Button
                  type="submit"
                  h={"50px"}
                  fontSize="20px"
                  isLoading={Loading}
                  w={["300px", "300px", "380px"]}
                  mt={10}
                >
                  Update
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
}
