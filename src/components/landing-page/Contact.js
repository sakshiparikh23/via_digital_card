import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Center,
  Flex,
  HStack,
  VStack,
  Text,
  Image,
  Button,
  useColorModeValue,
  Input,
  Textarea,
  useColorMode,
  FormControl,
  useToast,
} from "@chakra-ui/react";

export const Contact = () => {
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
  const [data, setData] = useState({});
  const [Loading, setLoading] = useState(false);

  const textColor = useColorModeValue("black", "white");
  const bg = useColorModeValue("white", "black.100");
  const select = useColorModeValue("custom-select-light", "custom-select");
  const { colorMode, toggleColorMode } = useColorMode();
  console.log(colorMode);
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

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setData({
      ...data,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const res = await fetch("/api/contactForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    console.log(json);
    if (res.status === 200) {
      Toast("Success", "Your message has been sent", "success");
      setLoading(false);
    }
    if (res.status === 500) {
      Toast("Error", "Your message has not been sent", "error");
      setLoading(false);
    }
  }

  return (
    <Center
      pos="relative"
      flexDir={"column"}
      w="100%"
      pt={["50px", "0px", "0px"]}
      pb="150px"
      color={textColor}
      id="contact"
    >
      <Box pos="absolute" bottom="5%" right="5%">
        <Image
          src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Landing+Doodle+1.png"
          alt="ribbon"
          className="react-floater-animated"
        />
      </Box>

      <Center zIndex={2} w="100%" flexDir={"column"}>
        <Text fontWeight={"500"} fontSize={["3rem", "3rem", "4.5rem"]}>
          {" "}
          Contact Us
        </Text>
        <Text
          fontSize={{ base: "2.25rem", sm: "4rem" }}
          color="greenBrand.100"
          fontWeight={"600"}
          mt="45px"
          mb="30px"
        >
          Hello !
        </Text>
        <Box
          w={{ base: "92%", "2sm": "90%" }}
          maxW={"1100px"}
          bgColor={{ base: "transparent", "2sm": bg }}
          borderRadius={"44px"}
          p={{ base: "0px", "2sm": "50px" }}
        >
          <form onSubmit={handleSubmit}>
            <Flex
              w="100%"
              flexDir={{ base: "column", "2sm": "row" }}
              alignItems={"center"}
            >
              <Input
                onChange={(e) => handleChange(e)}
                id="name"
                name="name"
                required
                mr={{ base: "0", "2sm": "60px" }}
                type="text"
                _placeholder={{ color: "greenBrand.100" }}
                placeholder="Name"
                h={{ base: "55px", "2sm": "75px" }}
                fontSize={{ base: "0.875rem", md: "1.125rem" }}
              />
              <Input
                onChange={(e) => handleChange(e)}
                required
                name="email"
                id="email"
                type="email"
                mt={{ base: "20px", "2sm": "0" }}
                _placeholder={{ color: "greenBrand.100" }}
                placeholder="Email"
                h={{ base: "55px", "2sm": "75px" }}
                fontSize={{ base: "0.875rem", md: "1.125rem" }}
              />
            </Flex>
            <Flex
              mt={{ base: "20px", "2sm": "57px" }}
              justifyContent={"space-between"}
              w="100%"
              alignItems={"center"}
              flexDir={{ base: "column", "2sm": "row" }}
            >
              <Input
                name="CompanyName"
                onChange={(e) => handleChange(e)}
                id="CompanyName"
                required
                _placeholder={{ color: "greenBrand.100" }}
                type="text"
                placeholder="Company name"
                h={{ base: "55px", "2sm": "75px" }}
                w={{ base: "100%", "2sm": "47%" }}
                flexShrink={"0"}
                fontSize={{ base: "0.875rem", md: "1.125rem" }}
                mb={{ base: "20px", "2sm": "0" }}
              />
            </Flex>
            <Textarea
              name="message"
              onChange={(e) => handleChange(e)}
              id="message"
              required
              borderColor={"#88E000"}
              mt={{ base: "20px", "2sm": "57px" }}
              rows="10"
              w="100%"
              placeholder="Your Message"
              _placeholder={{ color: "greenBrand.100" }}
              fontSize={{ base: "0.875rem", md: "1.125rem" }}
            ></Textarea>
            <Button
              type="submit"
              // onClick={() => handleSlides()}
              fontSize={{ base: "1.125rem", "2sm": "1.5rem" }}
              m="20px auto"
              w={{ base: "319px", "2sm": "283px" }}
              h={{ base: "62px", "2sm": "84px" }}
              d="block"
              mt="57px"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Center>
    </Center>
  );
};
