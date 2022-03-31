import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  useColorModeValue,
  Box,
  Flex,
  Text,
  Button,
  Image,
  Center,
  useMediaQuery,
} from "@chakra-ui/react";
const responsive = {
  0: { items: 1 },
  // 568: { items: 1 },
  1024: { items: 2 },
};

export const HowItWorks = () => {
  const className = useColorModeValue("alice", "alice-dark");
  const color = useColorModeValue("black", "white");
  const textColor = useColorModeValue("black", "white");

  const imgUrl = useColorModeValue(
    "https://res.cloudinary.com/dbm7us31s/image/upload/v1646740632/digital%20card/landing-page/Mask_group_1_nc6yde.png",
    "https://res.cloudinary.com/dbm7us31s/image/upload/v1646740623/digital%20card/landing-page/Mask_group_lwbqdk.png"
  );
  const items = [
    <div className="item" key={1} data-value="1">
      <Box w="100%" h="100%">
        <Center>
          <Image src={imgUrl} alt="" />
        </Center>
        <p className="slide-text">
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the
        </p>
      </Box>
    </div>,
    <div className="item" key={2} data-value="2">
      <Box w="100%" h="100%">
        <Center>
          <Image src={imgUrl} alt="" />
        </Center>
        <p className="slide-text">
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the
        </p>
      </Box>
    </div>,
    <div className="item" key={3} data-value="3">
      <Box w="100%" h="100%">
        <Center>
          <Image src={imgUrl} alt="" />
        </Center>
        <p className="slide-text">
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the
        </p>
      </Box>
    </div>,
    <div className="item" data-value="4" key={4}>
      <Box w="100%" h="100%">
        <Center>
          <Image src={imgUrl} alt="" />
        </Center>
        <p className="slide-text">
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the
        </p>
      </Box>
    </div>,
  ];
  const [isMobile] = useMediaQuery("(max-width: 640px)");

  console.log(isMobile);

  return (
    <>
      <Center
        display={["none", "none", "block"]}
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
          bottom={{ base: "0%", sm: "10%" }}
        >
          <Image
            src="https://res.cloudinary.com/dbm7us31s/image/upload/v1646033627/digital%20card/landing-page/doodle-one_zanfpm.png"
            alt="ribbon"
          />
        </Box>

        <Box
          pos="absolute"
          boxSize={{ base: "36px", sm: "auto" }}
          top="20%"
          right="15%"
        >
          <Image
            src="https://res.cloudinary.com/dbm7us31s/image/upload/v1646033631/digital%20card/landing-page/doodle-two_sfme7d.png"
            alt="candy"
          />
        </Box>

        <Box
          zIndex={2}
          w="100%"
          d="flex"
          flexDir={"column"}
          alignItems="center"
          id="howitworks"
        >
          <Text
            fontWeight={"500"}
            mb={{ base: "30px", md: "60px", xl: "100px" }}
            fontSize={{ base: "1.5rem", lg: "2.25rem" }}
          >
            {" "}
            How it works ?
          </Text>
          <div className={className}>
            <AliceCarousel
              onResized={() => {
                console.log("resized");
              }}
              mouseTracking={true}
              // autoWidth={true}
              items={items}
              // paddingLeft={100}
              paddingRight={isMobile ? 0 : 120}
              controlsStrategy="alternate"
              responsive={responsive}
            />
          </div>
        </Box>
      </Center>
      <Center
        display={["block", "block", "none"]}
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
          bottom={{ base: "0%", sm: "10%" }}
        >
          <Image
            src="https://res.cloudinary.com/dbm7us31s/image/upload/v1646033627/digital%20card/landing-page/doodle-one_zanfpm.png"
            alt="ribbon"
          />
        </Box>

        <Box
          pos="absolute"
          boxSize={{ base: "36px", sm: "auto" }}
          top="20%"
          right="15%"
        >
          <Image
            src="https://res.cloudinary.com/dbm7us31s/image/upload/v1646033631/digital%20card/landing-page/doodle-two_sfme7d.png"
            alt="candy"
          />
        </Box>

        <Box
          zIndex={2}
          w="100%"
          d="flex"
          flexDir={"column"}
          alignItems="center"
          id="howitworks"
        >
          <Text
            fontWeight={"500"}
            mb={{ base: "30px", md: "60px", xl: "100px" }}
            fontSize={{ base: "1.5rem", lg: "2.25rem" }}
          >
            {" "}
            How it works ?
          </Text>
          <div className={className}>
            <AliceCarousel
              onResized={() => {
                console.log("resized");
              }}
              mouseTracking={true}
              // autoWidth={true}
              items={items}
              // paddingLeft={100}
              // paddingRight={isMobile ? 0 : 120}
              controlsStrategy="alternate"
              responsive={responsive}
            />
          </div>
        </Box>
      </Center>
    </>
  );
};
