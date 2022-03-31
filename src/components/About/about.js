import React from "react";
import {
  VStack,
  Flex,
  Box,
  Button,
  Heading,
  Avatar,
  Text,
  Input,
  HStack,
  Image,
  Divider,
  Stack,
} from "@chakra-ui/react";

function about() {
  return (
    <>
      <HStack w="full" h="full">
        <VStack w="20%" h="100vh" bg="#C4C4C4" justifyContent="center">
          <Avatar
            name=""
            alt=""
            src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Landing+About.png"
            size={5}
            mt="5%"
          />
          <Text size={18} fontFamily="Roboto" color="#171717" py={"5%"}>
            Aks Jain
          </Text>
          <Text
            size={18}
            fontFamily="Roboto"
            color="#5C5C5C"
            pt={"15%"}
            pb={"10%"}
          >
            Home
          </Text>
          <Text size={18} fontFamily="Roboto" color="#5C5C5C" pb={"10%"}>
            How it works?
          </Text>
          <Text size={18} fontFamily="Roboto" color="#5C5C5C" pb={"10%"}>
            About us
          </Text>
          <Text size={18} fontFamily="Roboto" color="#5C5C5C" pb={"10%"}>
            Review
          </Text>
          <Text size={18} fontFamily="Roboto" color="#5C5C5C" pb={"10%"}>
            Contact us
          </Text>
        </VStack>
        <Flex flexDirection="column" w="45%" h="100vh" pl="5%">
          <Text
            fontSize="36"
            fontFamily="Roboto"
            color="#000000"
            fontWeight="medium"
            mt="15%"
          >
            My profile
          </Text>
          <Text
            fontSize="24"
            fontFamily="Roboto"
            color="#000000"
            fontWeight="medium"
            mt="10%"
          >
            About
          </Text>
          <Text
            fontSize="15"
            fontFamily="Roboto"
            color="#000000"
            mt="5%"
            lineHeight="10"
            fontWeight="light"
          >
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the In publishing and graphic design,
            Lorem ipsum is a placeholder text commonly used to demonstrate the
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the
          </Text>
        </Flex>
        <Stack direction="row" h="full" bg="#C4C4C4">
          <Divider orientation="vertical" h="60vh" />
        </Stack>
        <Flex flexDirection="column" h="100vh" w="35%" py={"6%"}>
          <Flex flexDirection="row">
            <Text fontSize="18" fontFamily="Roboto" pr={14} color="#171717">
              About us
            </Text>
            <Text fontSize="18" fontFamily="Roboto" pr={14} color="#171717">
              Lets connect
            </Text>
            <Text fontSize="18" fontFamily="Roboto" color="#171717">
              Get in touch
            </Text>
          </Flex>
          <Text
            fontSize="24"
            fontFamily="Roboto"
            color="#171717"
            fontWeight="medium"
            mt="10%"
            ml="10%"
          >
            My dashboard
          </Text>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            boxShadow="dark-lg"
            p="6"
            rounded="md"
            bg="white"
            w="60%"
            h="15vh"
            ml="10%"
            mt="10%"
          >
            <Image
              alt=""
              src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Landing+About+Rect.png"
            />
            <Text
              fontSize="14"
              fontFamily="Roboto"
              color="#171717"
              fontWeight="normal"
              mt="5%"
              ml="10%"
              lineHeight="hidden"
            >
              Save contact
            </Text>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            boxShadow="dark-lg"
            p="6"
            rounded="md"
            bg="white"
            w="60%"
            h="15vh"
            ml="10%"
            mt="10%"
          >
            <Image
              alt=""
              src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Landing+About+Rect.png"
            />
            <Text
              fontSize="14"
              fontFamily="Roboto"
              color="#171717"
              fontWeight="normal"
              mt="5%"
              ml="10%"
              lineHeight="hidden"
            >
              Save contact
            </Text>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            boxShadow="dark-lg"
            p="6"
            rounded="md"
            bg="white"
            w="60%"
            h="15vh"
            ml="10%"
            mt="10%"
          >
            <Image
              alt=""
              src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Landing+About+Rect.png"
            />
            <Text
              fontSize="14"
              fontFamily="Roboto"
              color="#171717"
              fontWeight="normal"
              mt="5%"
              ml="10%"
              lineHeight="hidden"
            >
              Save contact
            </Text>
          </Box>
        </Flex>
      </HStack>
    </>
  );
}

export default about;
