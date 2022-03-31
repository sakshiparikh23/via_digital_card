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
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
export const Review = () => {
  const textColor = useColorModeValue("black", "white");
  const ref = useRef();
  const [swipe, setSwipe] = useState(null);
  const handleSlides = () => {
    if (swipe.activeIndex === 2) {
      swipe.slidePrev(400, true);
      swipe.slidePrev(400, true);
      return;
    }
    swipe.slideNext(400, true);
  };
  const handle = (swiper) => {
    setSwipe(swiper);
  };

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
        bottom={{ base: "5%", sm: "30%" }}
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
        top="20%"
        right="15%"
      >
        <Image
          src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Landing+Doodle+1.png"
          alt="ribbon"
          className="react-floater-animated"
        />
      </Box>

      <Box zIndex={2} w="100%" d="flex" flexDir={"column"} alignItems="center">
        <Text
          fontWeight={"500"}
          fontSize={{ base: "1.5rem", md: "2rem", lg: "2.5rem" }}
        >
          {" "}
          Review
        </Text>
        <Box
          w={{ base: "90%", lg: "600px" }}
          mt="40px"
          fontWeight={"500"}
          lineHeight={"39px"}
          textAlign={"center"}
        >
          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            initialSlide={0}
            modules={[Pagination]}
            className="mySwiper"
            ref={ref}
            onSwiper={(swiper) => handle(swiper)}
          >
            <SwiperSlide>
              <VStack spacing={"30px"}>
                <Box w="136px" h="122px">
                  <Image
                    borderRadius={"42px"}
                    src="https://res.cloudinary.com/dbm7us31s/image/upload/v1645085462/digital%20card/card/img_gjy1m4.png"
                    alt=""
                  />
                </Box>
                <Text fontSize={{ base: "1.5rem", lg: "2.25rem" }}>
                  heading
                </Text>
                <Text
                  fontSize={{ base: "1rem", lg: "1.125rem" }}
                  lineHeight="35px"
                >
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the In publishing and
                  graphic design, Lorem ipsum is a placeholder text commonly
                  used to demonstrate the
                </Text>
              </VStack>
            </SwiperSlide>
            <SwiperSlide>
              <VStack spacing={"30px"}>
                <Box w="136px" h="122px">
                  <Image
                    borderRadius={"42px"}
                    src="https://res.cloudinary.com/dbm7us31s/image/upload/v1645085462/digital%20card/card/img_gjy1m4.png"
                    alt=""
                  />
                </Box>
                <Text fontSize="2.25rem">heading</Text>
                <Text fontSize={"1.125rem"} lineHeight="35px">
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the In publishing and
                  graphic design, Lorem ipsum is a placeholder text commonly
                  used to demonstrate the
                </Text>
              </VStack>
            </SwiperSlide>
            <SwiperSlide>
              <VStack spacing={"30px"}>
                <Box w="136px" h="122px">
                  <Image
                    borderRadius={"42px"}
                    src="https://res.cloudinary.com/dbm7us31s/image/upload/v1645085462/digital%20card/card/img_gjy1m4.png"
                    alt=""
                  />
                </Box>
                <Text fontSize="2.25rem">heading</Text>
                <Text fontSize={"1.125rem"} lineHeight="35px">
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the In publishing and
                  graphic design, Lorem ipsum is a placeholder text commonly
                  used to demonstrate the
                </Text>
              </VStack>
            </SwiperSlide>
          </Swiper>
        </Box>

        <Button
          onClick={() => handleSlides()}
          fontSize={"1.5rem"}
          mt="20px"
          w="190px"
          h="73px"
        >
          Next
        </Button>
      </Box>
    </Center>
  );
};
