import React from "react";
import NextLink from "next/link";
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

export const Hero = () => {
  const textColor = useColorModeValue("black", "white");
  const imageLeft = useColorModeValue(
    "https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Landing+Right.png",
    "https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Landing+Dark+Right.png"
  );
  const imageRight = useColorModeValue(
    "https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Landing+Left.png",
    "https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Landing+Dark+Left.png"
  );
  return (
    <Center
      pos="relative"
      flexDir={"column"}
      w="100%"
      p={{ base: "50px 0px", sm: "100px 0px", lg: "150px 0px" }}
      color={textColor}
    >
      <Box
        zIndex={2}
        mt={{ base: "50px", lg: 0 }}
        d="flex"
        flexDir={"column"}
        alignItems="center"
      >
        <Text fontWeight={"500"} fontSize={{ base: "2rem", lg: "2.25rem" }}>
          {" "}
          Digital Evolution
        </Text>
        <Box
          w={{ base: "90%", sm: "600px" }}
          mt="40px"
          lineHeight={"39px"}
          textAlign={"center"}
        >
          Evolving and adapting has never proved to be more important than now.
          One can only survive changing times if they’re changing with it. The
          days of printing a thousand visiting cards in order to help gain
          exposure for your business are gone. Via Digital Cards are the new
          deal and it’s revolutionary.
        </Box>
        <Text fontSize={"1.125rem"}></Text>
        <NextLink href="/auth/signup" passHref>
          <Button
            fontSize={"1.125rem"}
            mt="40px"
            w={{ base: "188px", lg: "281px" }}
            h="60px"
          >
            Create Now
          </Button>
        </NextLink>
      </Box>
      <Box pos={{ base: "static", lg: "absolute" }} left="50px" top="10%">
        <Image src={imageLeft} alt="" className="react-floater-animated" />
      </Box>
      <Box
        pos="absolute"
        d={{ base: "none", lg: "block" }}
        right="50px"
        bottom={"15%"}
      >
        <Image src={imageRight} alt="" className="react-floater-animated" />
      </Box>
      <Box
        pos="absolute"
        d={{ base: "none", lg: "block" }}
        right={"15%"}
        top="10%"
      >
        <Image
          src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Landing+Doodle+2.png"
          alt="candy"
          className="react-floater-animated"
        />
      </Box>
      <Box
        pos="absolute"
        boxSize={{ base: "36px", sm: "auto" }}
        d={{ base: "block", lg: "none" }}
        left={"0"}
        top="35%"
      >
        <Image
          src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Landing+Doodle+2.png"
          alt="candy"
          className="react-floater-animated"
        />
      </Box>
      <Box
        pos="absolute"
        boxSize={{ base: "36px", sm: "auto" }}
        left={{ base: "0", lg: "10%" }}
        bottom={{ base: "5%", lg: "25%" }}
      >
        <Image
          src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Landing+Doodle+2.png"
          alt="candy"
          className="react-floater-animated"
        />
      </Box>
      <Box
        pos="absolute"
        boxSize={{ base: "36px", sm: "auto" }}
        top="10%"
        left={{ base: "90%", lg: "30%" }}
      >
        <Image
          src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Landing+Doodle+1.png"
          alt="ribbon"
          className="react-floater-animated"
        />
      </Box>
      <Box
        pos="absolute"
        boxSize={{ base: "36px", sm: "auto" }}
        right={{ base: 0, lg: "10%" }}
        bottom={"10%"}
      >
        <Image
          src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Landing+Doodle+1.png"
          alt="ribbon"
          className="react-floater-animated"
        />
      </Box>
    </Center>
  );
};
