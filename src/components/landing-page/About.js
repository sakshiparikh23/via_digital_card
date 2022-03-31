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
} from "@chakra-ui/react";
export const About = () => {
  const textColor = useColorModeValue("black", "white");
  const bg = useColorModeValue("white", "black.100");
  return (
    <Center
      pos="relative"
      flexDir={"column"}
      w="100%"
      p={{ base: "50px 15px", sm: "100px 25px", lg: "150px 100px" }}
      color={textColor}
      alignItems="flex-start"
      id="about"
    >
      <Box pos="absolute" right={"5%"} bottom="5%">
        <Image
          src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Landing+Doodle+2.png"
          alt="candy"
          className="react-floater-animated"
        />
      </Box>

      <Box pos="absolute" bottom="5%" left="5%">
        <Image
          src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Landing+Doodle+1.png"
          alt="ribbon"
          className="react-floater-animated"
        />
      </Box>

      <Box
        zIndex={2}
        d="flex"
        w="100%"
        flexDir={"column"}
        alignItems="flex-start"
      >
        <Box w="100%" mb="60px">
          <Text fontWeight={"500"} textAlign="center" fontSize="2.25rem">
            {" "}
            About Us
          </Text>
        </Box>

        <Flex alignItems={"center"}  flexDir={{base:"column",md:"row"}}>
          <Box
            w={{ base: "319px", xl: "381px" }}
            h={{ base: "431px", xl: "515px" }}
            flexShrink={"0"}
           
          >
            <Image
              src="https://res.cloudinary.com/dbm7us31s/image/upload/v1646078081/digital%20card/landing-page/about_mqf8ls.png"
              alt=""
              w="100%"
              h="100%"
            />
          </Box>
          <VStack ml={{base:"0",md:"45px"}}  p={{base:"20px",md:"0"}} transform={{base:"translateY(-50px)",md:"translateY(0)"}} borderRadius='23px' bgColor={{base:bg,md:'transparent'}} spacing={"30px"} alignItems={"flex-start"} >
            <Box fontWeight={"500"} fontSize={{base:"1.5rem",md:"2.25rem"}} color={{base:'greenBrand.100',md:textColor}}>
              <Text>Contact-less, Paper-.</Text>
              <Text>less and Effort-less.</Text>
            </Box>
            <Box w={{ base: "90%", xl: "630px" }}>
              <Text fontSize={{base:"1rem",md:"1.125rem"}} lineHeight="35px">
                Contact sharing has never been easier and more simplified. Via
                Digital Card comes with integrated NFC technology which enables
                quick and instant sharing of information. At Via Digital Card,
                we aim to help everyone go digital with more causes than just
                one.{" "}
              </Text>
            </Box>
            <Button display={{base:"none",md:"block"}} fontSize={"1.125rem"} mt="20px" w="214px" h="73px">
              Read More
            </Button>
            <Text display={{base:"block",md:'none'}} fontWeight={'500'} color='greenBrand.100'>Read More</Text>
          </VStack>
        </Flex>
      </Box>
    </Center>
  );
};
