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
  SimpleGrid,
} from "@chakra-ui/react";
import { BiCheck } from 'react-icons/bi';
export const Pricing = () => {
  const textColor = useColorModeValue("black", "white");
  const textColor1 = useColorModeValue("#7C7C7C", "#C8C8C8");
  const bg = useColorModeValue("white", "black.100");
  const bg1 = useColorModeValue("#F4FFE2", "#474856");

  return (
    <Center
      pos="relative"
      flexDir={"column"}
      w="100%"
      p={{ base: "50px 0px", sm: "100px 0px", lg: "150px 0px" }}
      color={textColor}
    >
      <Box
        pos="absolute"
        boxSize={{ base: "36px", sm: "auto" }}
        left={"5%"}
        top={{ base: "5%", sm: "20%" }}
      >
        <Image
          src="https://res.cloudinary.com/dbm7us31s/image/upload/v1646033631/digital%20card/landing-page/doodle-two_sfme7d.png"
          alt="candy"
          className="react-floater-animated"
        />
      </Box>

      <Box
        pos="absolute"
        boxSize={{ base: "36px", sm: "auto" }}
        top="20%"
        right="15%"
      >
        <Image
          src="https://res.cloudinary.com/dbm7us31s/image/upload/v1646033627/digital%20card/landing-page/doodle-one_zanfpm.png"
          alt="ribbon"
          className="react-floater-animated"
        />
      </Box>

      <Box zIndex={2} w="100%" d="flex" flexDir={"column"} alignItems="center">
        <Text fontWeight={"500"} fontSize={{ base: "1.5rem", lg: "2.25rem" }}>
          Pricing
        </Text>
        <SimpleGrid
          w="100%"
          mt="54px"
          color={textColor}
          p={{base:"15px",sm:"30px",lg:"60px",xl:"90px"}}
          minChildWidth={{base:"320px",sm:"396px"}}
          spacing="1.625rem"
        >
           <Center pt='25px' boxShadow='8px 0px 33px 0px #0000000F' flexDir={"column"} bgColor={bg} borderRadius="27px">
            <Text p='0px 25px' fontSize={"1.5rem"} fontWeight="500">
            Starter
            </Text>
            <Text p='0px 25px'  mt="10px" textAlign={'center'} fontSize={{base:"1rem",sm:'1.125rem'}} lineHeight='35px'>The basics for personal projects experiments.</Text>
            <VStack p='0px 25px' alignItems={'flex-start'} mt='50px' mb='50px' color={textColor1} spacing='8px' fontSize={{base:"1rem",sm:'1.125rem'}}>
                <Flex alignItems={'center'}>
                   <Box fontSize={'1.5rem'} color='greenBrand.100'>
                       <BiCheck/>
                   </Box>
                   <Text ml='27px' lineHeight='31px'>The basics for personal projects experiments.</Text>
                </Flex>
                <Flex alignItems={'center'}>
                   <Box fontSize={'1.5rem'} color='greenBrand.100'>
                       <BiCheck/>
                   </Box>
                   <Text ml='27px' lineHeight='31px'>The basics for personal projects experiments.</Text>
                </Flex>
                <Flex alignItems={'center'}>
                   <Box fontSize={'1.5rem'} color='greenBrand.100'>
                       <BiCheck/>
                   </Box>
                   <Text ml='27px' lineHeight='31px'>The basics for personal projects experiments.</Text>
                </Flex>
                <Flex alignItems={'center'}>
                   <Box fontSize={'1.5rem'} color='greenBrand.100'>
                       <BiCheck/>
                   </Box>
                   <Text ml='27px' lineHeight='31px'>The basics for personal projects experiments.</Text>
                </Flex>
               
               
            </VStack>
            <Center borderBottomRadius={'27px'} flexDir={"column"} w="100%" h="234px" bgColor={bg1}>
              <Text fontWeight={"600"} fontSize="2.25rem" mb="28px">
                Free
              </Text>
              <Button w="183px" h="60px" fontWeight={"600"} fontSize="1.125rem">
                Buy Now
              </Button>
            </Center>
          </Center>
          <Center pt='25px' boxShadow='8px 0px 33px 0px #0000000F' flexDir={"column"} bgColor={bg} borderRadius="27px">
            <Text p='0px 25px' fontSize={"1.5rem"} fontWeight="500">
           Premium
            </Text>
            <Text p='0px 25px'  mt="10px" textAlign={'center'} fontSize={{base:"1rem",sm:'1.125rem'}} lineHeight='35px'>The basics for personal projects experiments.</Text>
            <VStack p='0px 25px' alignItems={'flex-start'} mt='50px' mb='50px' color={textColor1} spacing='8px' fontSize={{base:"1rem",sm:'1.125rem'}}>
                <Flex alignItems={'center'}>
                   <Box fontSize={'1.5rem'} color='greenBrand.100'>
                       <BiCheck/>
                   </Box>
                   <Text ml='27px' lineHeight='31px'>The basics for personal projects experiments.</Text>
                </Flex>
                <Flex alignItems={'center'}>
                   <Box fontSize={'1.5rem'} color='greenBrand.100'>
                       <BiCheck/>
                   </Box>
                   <Text ml='27px' lineHeight='31px'>The basics for personal projects experiments.</Text>
                </Flex>
                <Flex alignItems={'center'}>
                   <Box fontSize={'1.5rem'} color='greenBrand.100'>
                       <BiCheck/>
                   </Box>
                   <Text ml='27px' lineHeight='31px'>The basics for personal projects experiments.</Text>
                </Flex>
                <Flex alignItems={'center'}>
                   <Box fontSize={'1.5rem'} color='greenBrand.100'>
                       <BiCheck/>
                   </Box>
                   <Text ml='27px' lineHeight='31px'>The basics for personal projects experiments.</Text>
                </Flex>
               
               
            </VStack>
            <Center borderBottomRadius={'27px'} flexDir={"column"} w="100%" h="234px" bgColor={bg1}>
              <Text fontWeight={"600"} fontSize="2.25rem" mb="28px">
                Free
              </Text>
              <Button w="183px" h="60px" fontWeight={"600"} fontSize="1.125rem">
                Buy Now
              </Button>
            </Center>
          </Center>
          <Center pt='25px' boxShadow='8px 0px 33px 0px #0000000F' flexDir={"column"} bgColor={bg} borderRadius="27px">
            <Text p='0px 25px' fontSize={"1.5rem"} fontWeight="500">
             NFC Card
            </Text>
            <Text p='0px 25px'  mt="10px" textAlign={'center'} fontSize={{base:"1rem",sm:'1.125rem'}} lineHeight='35px'>The basics for personal projects experiments.</Text>
            <VStack p='0px 25px' alignItems={'flex-start'} mt='50px' mb='50px' color={textColor1} spacing='8px' fontSize={{base:"1rem",sm:'1.125rem'}}>
                <Flex alignItems={'center'}>
                   <Box fontSize={'1.5rem'} color='greenBrand.100'>
                       <BiCheck/>
                   </Box>
                   <Text ml='27px' lineHeight='31px'>The basics for personal projects experiments.</Text>
                </Flex>
                <Flex alignItems={'center'}>
                   <Box fontSize={'1.5rem'} color='greenBrand.100'>
                       <BiCheck/>
                   </Box>
                   <Text ml='27px' lineHeight='31px'>The basics for personal projects experiments.</Text>
                </Flex>
                <Flex alignItems={'center'}>
                   <Box fontSize={'1.5rem'} color='greenBrand.100'>
                       <BiCheck/>
                   </Box>
                   <Text ml='27px' lineHeight='31px'>The basics for personal projects experiments.</Text>
                </Flex>
                <Flex alignItems={'center'}>
                   <Box fontSize={'1.5rem'} color='greenBrand.100'>
                       <BiCheck/>
                   </Box>
                   <Text ml='27px' lineHeight='31px'>The basics for personal projects experiments.</Text>
                </Flex>
               
               
            </VStack>
            <Center borderBottomRadius={'27px'} flexDir={"column"} w="100%" h="234px" bgColor={bg1}>
              <Text fontWeight={"600"} fontSize="2.25rem" mb="28px">
                Free
              </Text>
              <Button w="183px" h="60px" fontWeight={"600"} fontSize="1.125rem">
                Buy Now
              </Button>
            </Center>
          </Center>
        
        </SimpleGrid>
      </Box>
    </Center>
  );
};
