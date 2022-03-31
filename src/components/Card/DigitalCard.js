import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Flex,
  Image,
  Text,
  HStack,
  Center,
  VStack,
  Button,
  useColorModeValue,
  useDisclosure,
  Link,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";
import FileSaver from "file-saver";
import { FiPhone } from "react-icons/fi";
import { VscGlobe } from "react-icons/vsc";
import { AiOutlineMail, AiOutlineEye, AiOutlineShareAlt } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { DarkModeSwitch } from "../DarkModeSwitch";
import { SendMessage } from "../modals/SendMessage";
import NextLink from "next/link";
import { RWebShare } from "react-web-share";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import moment from "moment";

export const DigitalCard = ({ data }) => {
  if (data?.socialLinks.youtube != "") {
    function getId(url) {
      let regex =
        /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
      return regex.exec(url)[3];
    }
    const youtubeEmbed = getId(data?.socialLinks?.youtube);
    console.log(youtubeEmbed);
  }

  const bgColor = useColorModeValue("white", "black.200");
  const bgViews = useColorModeValue(
    data?.theme ? `${data.theme}.100` : "greenBrand.100",
    data?.theme ? `${data.theme}.100` : "greenBrand.100"
  );
  const textColor = useColorModeValue("black", "white");
  const textColor2 = useColorModeValue("white", "black");
  const tabColor = useColorModeValue("rgba(23, 23, 23, 0.38)", "gray.300");
  const tabColorMobile = useColorModeValue("#ABABAB", "#4B4C5E");
  const dividerColor = useColorModeValue("#E7E7E7", "#353647");
  const bgDashIcons = useColorModeValue(
    data?.theme ? `${data?.theme}.100` : "greenBrand.100",
    data?.theme ? `${data?.theme}.100` : "greenBrand.100"
  );
  const bgDash = useColorModeValue("white", "black.100");
  const borderColor = useColorModeValue("#E3E3E3", "#353647");
  const activeTabBorder = useColorModeValue("#353647", "#c4c4c4");
  const bgDashIconMobile = useColorModeValue(
    data?.theme ? `${data?.theme}.100` : "greenBrand.100",
    data?.theme ? `${data?.theme}.100` : "greenBrand.100"
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabIndex, setTabIndex] = useState(0);
  const router = useRouter();
  let url = router.asPath;

  const logo = useColorModeValue(
    "https://res.cloudinary.com/dbm7us31s/image/upload/v1646034354/digital%20card/landing-page/logo_zt1jb4.png",
    "https://res.cloudinary.com/dbm7us31s/image/upload/v1646034356/digital%20card/landing-page/logo-dark_yijgxs.png"
  );
  //Vcard
  function handleSave(e) {
    e.preventDefault();
    var file = new Blob(
      [
        `BEGIN:VCARD
VERSION:3.0
N:${data.name}
FN:${data.name}
TITLE:${data.name}
EMAIL;type=Email;type=pref:${data.email} 
TEL;type=MAIN:${data?.pnumber}
TEL;type=CELL;type=VOICE;type=pref:${data?.snumber}
ADR;type=WORK;type=pref:;;;${data.address};;;
END:VCARD
`,
      ],
      { type: "text/vcard;charset=utf-8" }
    );
    let a = document.createElement("a");
    a.download = `${data.name}${data.name}.vcf`;
    a.href = URL.createObjectURL(file);
    var reader = new FileReader();
    if (navigator.userAgent.match("CriOS")) {
      reader.onloadend = (e) => {
        window.open(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (navigator.userAgent.match(/iPad|iPhone|Android/i)) {
      reader.onload = (e) => {
        window.location.href = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      FileSaver.saveAs(file, `${data.name}${data.name}.vcf`, true);
    }
  }

  function checkEmpty() {
    if (
      data.socialLinks.whatsapp == "" &&
      data.socialLinks.instagram == "" &&
      data.socialLinks.facebook == "" &&
      data.socialLinks.twitter == "" &&
      data.socialLinks.linkedin == ""
    ) {
      return false;
    } else {
      return true;
    }
  }

  let check = checkEmpty();

  async function handelupdate(params) {
    const user = data?.card_id;
    console.log(user, params);
    const res = await fetch("/api/cards/insights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: params,
        user: user,
      }),
    });
    // const data = await res.json();
    // if (res.status === 200) {
    //   console.log("updated");
    // }
  }

  return (
    <Box
      color={textColor}
      p="50px 8vw"
      bgColor={bgColor}
      h="100%"
      minH={"100vh"}
    >
      <Box
        display={["block", "block", "block"]}
        position="fixed"
        bottom="2rem"
        right="1rem"
        zIndex={5}
      >
        <RWebShare
          data={{
            text: "Via Digital Card",
            url: process.env.NEXTAUTH_URL + url,
            title: data.designation,
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <Button
            variant={data?.theme ? data.theme : "solid"}
            boxSize={"50px"}
            borderRadius="full"
            as={Center}
            fontSize={"1.7rem"}
          >
            <AiOutlineShareAlt />
          </Button>
        </RWebShare>
      </Box>
      <DarkModeSwitch />
      <Tabs
        display={{ base: "none", "2sm": "block" }}
        onChange={(index) => setTabIndex(index)}
      >
        <TabList border={"none"} justifyContent="space-between">
          <Box>
            <NextLink href="/" passHref>
              <Link>
                <Image src={logo} />
              </Link>
            </NextLink>
          </Box>
          <Flex>
            <Tab
              fontSize={"1.125rem"}
              color={tabColor}
              _selected={{ color: textColor, border: "none" }}
              _active={{ border: "none" }}
              _focus={{ border: "none" }}
            >
              About Us
            </Tab>
            <Tab
              color={tabColor}
              fontSize={"1.125rem"}
              _selected={{ color: textColor, border: "none" }}
              _active={{ border: "none" }}
              _focus={{ border: "none" }}
            >
              {"Let's Connect"}
            </Tab>
            <Tab
              color={tabColor}
              fontSize={"1.125rem"}
              _selected={{ color: textColor, border: "none" }}
              _active={{ border: "none" }}
              _focus={{ border: "none" }}
            >
              Get in touch
            </Tab>
          </Flex>
        </TabList>
        <Flex
          w="100%"
          p="45px 0px 0px 0px"
          justifyContent={"space-between"}
          flexDir={{ "2sm": "column", lg: "row" }}
        >
          <Box>
            <Flex
              alignItems={{ "2sm": "center", lg: "flex-start", xl: "center" }}
              textAlign={{ base: "center", "2sm": "left" }}
              flexDir={{ "2sm": "row", lg: "column", xl: "row" }}
            >
              <Flex
                flexDirection="column"
                w="193px"
                h="195px"
                flexShrink={"0"}
                bgColor={"#c5c5c5"}
                borderRadius="20px"
              >
                <Box h="75%">
                  <Image
                    h="100%"
                    w="100%"
                    alt=""
                    borderTopRadius="20px"
                    objectFit={"cover"}
                    src={
                      data?.profilePhoto
                        ? data.profilePhoto
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                    }
                  />
                </Box>
                <Box borderBottomRadius="20px" h="100%">
                  <Center
                    borderBottomRadius="20px"
                    h="100%"
                    // mt="10px"
                    color={"white"}
                    // borderRadius={"13px"}
                    // w="90px"
                    // h="26px"
                    bgColor={bgViews}
                  >
                    <Box fontSize={"1.5rem"}>
                      <AiOutlineEye />
                    </Box>
                    <Text>{data?.views}</Text>
                  </Center>
                </Box>
              </Flex>
              <Box ml={{ "2sm": "50px", lg: "0", xl: "3.4vw", "2xl": "50px" }}>
                <Text
                  fontSize={{ base: "1.5rem", xs: "1.8rem", "2sm": "2.25rem" }}
                  fontWeight={{ base: "600", "2sm": "500" }}
                  color={textColor}
                >
                  {data?.name}
                </Text>
                <Text
                  fontSize={{
                    base: "0.8125rem",
                    xs: "1.1rem",
                    "2sm": "1.5rem",
                  }}
                  color={"gray.100"}
                >
                  {data?.designation}
                </Text>
                {/* <Center
                  mt="10px"
                  color={"white"}
                  borderRadius={"13px"}
                  w="90px"
                  h="26px"
                  bgColor={bgViews}
                >
                  <Box mr="10px" fontSize={"1.5rem"}>
                    <AiOutlineEye />
                  </Box>
                  <Text>{data?.views}</Text>
                </Center> */}
              </Box>
            </Flex>
            <TabPanels w="100%">
              {/* <TabPanel p="0">
                <HStack
                  mt="43px"
                  spacing={{ "2sm": "40px", lg: "80px", xl: "125px" }}
                >
                  <VStack spacing={"20px"}>
                    <Center
                      as={Button}
                      onClick={handleSave}
                      boxSize={"163px"}
                      bgColor="greenBrand.100"
                      borderRadius={"35px"}
                    >
                      <Image
                        src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/contact.png"
                        alt=""
                      />
                    </Center>
                    <Text fontSize={"1.5rem"}>Save Contact</Text>
                  </VStack>
                  <VStack spacing={"20px"}>
                    <Center
                      boxSize={"163px"}
                      bgColor="greenBrand.100"
                      borderRadius={"35px"}
                    >
                      <Image
                        src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/download.png"
                        alt=""
                      />
                    </Center>
                    <Text fontSize={"1.5rem"}>Download brochure</Text>
                  </VStack>
                  <VStack spacing={"20px"}>
                    <Center
                      boxSize={"163px"}
                      bgColor="greenBrand.100"
                      borderRadius={"35px"}
                    >
                      <Image
                        src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/payment.png"
                        alt=""
                      />
                    </Center>
                    <Text fontSize={"1.5rem"}>Make Payment</Text>
                  </VStack>
                </HStack>
              </TabPanel> */}
              <TabPanel p="0" color={textColor}>
                <Text mt="43px" fontWeight={"500"} fontSize={"1.5rem"}>
                  About
                </Text>
                <Text mt="33px" fontSize={"1.25rem"}>
                  {data?.bio}
                </Text>
                {data && data.socialLinks.youtube != "" ? (
                  <Box mb="40px" pt="50px" h="380px">
                    <Text mb="20px" fontWeight={"500"} fontSize={"1.5rem"}>
                      Youtube Video
                    </Text>

                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeEmbed}`}
                      allow="autoplay; encrypted-media"
                      title="video"
                      width="60%"
                      height="100%"
                      allowFullScreen
                    />
                  </Box>
                ) : (
                  ""
                )}
              </TabPanel>
              <TabPanel p="0" color={textColor}>
                <Text mt="43px" fontWeight={"500"} fontSize={"1.5rem"}>
                  {" Let's Connect"}
                </Text>

                {check ? (
                  ""
                ) : (
                  <Box h="100px" w="300px" as={Center}>
                    No Soical Links Available
                  </Box>
                )}
                <Box
                  mt="15px"
                  ml="-22px"
                  as={Flex}
                  flexWrap="wrap"
                  fontSize={"1.125rem"}
                >
                  {data?.socialLinks.whatsapp != "" ? (
                    <Flex alignItems={"center"} m="22px">
                      <Center
                        as={Link}
                        isExternal
                        boxSize={"72px"}
                        borderRadius="12px"
                        href={`https://api.whatsapp.com/send?phone=${data?.socialLinks.whatsapp}`}
                        border={`2px solid ${borderColor}`}
                      >
                        <Box>
                          <Image
                            src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Whatsapp.png"
                            alt=""
                          />
                        </Box>
                      </Center>
                      <Text ml="35px">Whatsapp</Text>
                    </Flex>
                  ) : (
                    ""
                  )}
                  {data?.socialLinks.twitter != "" ? (
                    <Flex
                      onClick={() => handelupdate("twitter")}
                      alignItems={"center"}
                      m="22px"
                    >
                      <Center
                        as={Link}
                        isExternal
                        boxSize={"72px"}
                        borderRadius="12px"
                        border={`2px solid ${borderColor}`}
                        href={data?.socialLinks.twitter}
                      >
                        <Box>
                          <Image
                            src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Twitter.png"
                            alt=""
                          />
                        </Box>
                      </Center>
                      <Text ml="35px">Twitter</Text>
                    </Flex>
                  ) : (
                    ""
                  )}

                  {data.socialLinks.instagram != "" ? (
                    <Flex
                      onClick={() => handelupdate("instagram")}
                      alignItems={"center"}
                      m="22px"
                    >
                      <Center
                        boxSize={"72px"}
                        borderRadius="12px"
                        border={`2px solid ${borderColor}`}
                      >
                        {" "}
                        <Box
                          as={Link}
                          isExternal
                          href={data?.socialLinks?.instagram}
                        >
                          <Image
                            src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Instagram.png"
                            alt=""
                          />
                        </Box>
                      </Center>
                      <Text ml="35px">Instagram</Text>
                    </Flex>
                  ) : (
                    ""
                  )}
                  {data.socialLinks.facebook != "" ? (
                    <Flex
                      onClick={() => handelupdate("facebook")}
                      alignItems={"center"}
                      m="22px"
                    >
                      <Center
                        boxSize={"72px"}
                        borderRadius="12px"
                        border={`2px solid ${borderColor}`}
                      >
                        <Box
                          as={Link}
                          isExternal
                          href={data?.socialLinks?.facebook}
                        >
                          <Image
                            src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Facebook.png"
                            alt=""
                          />
                        </Box>
                      </Center>
                      <Text ml="35px">Facebook</Text>
                    </Flex>
                  ) : (
                    ""
                  )}
                  {data.socialLinks.linkedin != "" ? (
                    <Flex
                      onClick={() => handelupdate("linkedin")}
                      alignItems={"center"}
                      m="22px"
                    >
                      <Center
                        boxSize={"72px"}
                        borderRadius="12px"
                        border={`2px solid ${borderColor}`}
                      >
                        <Box
                          isExternal
                          as={Link}
                          href={data?.socialLinks?.linkedin}
                        >
                          <Image
                            src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/LinkedIn.png"
                            alt=""
                          />
                        </Box>
                      </Center>
                      <Text ml="35px">LinkedIn</Text>
                    </Flex>
                  ) : (
                    " "
                  )}
                  {data.socialLinks.google != "" ? (
                    <Flex
                      onClick={() => handelupdate("google")}
                      alignItems={"center"}
                      m="22px"
                    >
                      <Center
                        boxSize={"72px"}
                        borderRadius="12px"
                        border={`2px solid ${borderColor}`}
                      >
                        <Box
                          isExternal
                          as={Link}
                          href={data?.socialLinks?.google}
                        >
                          <Image src="/assets/images/greview.png" alt="" />
                        </Box>
                      </Center>
                      <Text ml="35px">Google</Text>
                    </Flex>
                  ) : (
                    " "
                  )}
                  <Button
                    variant={data?.theme ? data.theme : "solid"}
                    w="173px"
                    h="62px"
                    m="22px"
                    onClick={onOpen}
                  >
                    Send Message
                  </Button>
                  <SendMessage
                    isOpen={isOpen}
                    onClose={onClose}
                    card_id={data?.card_id}
                  />
                </Box>
              </TabPanel>
              <TabPanel p="0" w="100%" color={textColor}>
                <Text mt="43px" fontWeight={"500"} fontSize={"1.5rem"}>
                  About
                </Text>
                <Flex
                  mt="33px"
                  flexDir={"column"}
                  w="100%"
                  fontSize={"1.125rem"}
                >
                  <Flex
                    onClick={() => handelupdate("location")}
                    p="0px 0px 25px 0"
                    alignItems={"center"}
                    borderBottom={`2px solid ${borderColor}`}
                  >
                    <Box fontSize={"1.7rem"} color={textColor}>
                      <GoLocation color={textColor} />
                    </Box>
                    <Link
                      href={
                        "https://www.google.com/maps/search/" + data?.address
                      }
                      isExternal
                    >
                      <Text ml="27px">{data?.address}</Text>
                    </Link>
                  </Flex>
                  <Flex
                    p="25px 0px"
                    alignItems={"center"}
                    borderBottom={`2px solid ${borderColor}`}
                  >
                    <Box fontSize={"1.7rem"}>
                      <FiPhone />
                    </Box>
                    <Text ml="27px">
                      {data?.pnumber}{" "}
                      {data?.snumber != "" ? `| ${data.snumber}` : ""}
                      {/* data?.snumber} */}
                    </Text>
                    <Link href={`tel:${data?.pnumber}`}>
                      <Button
                        // color={textColor2}
                        variant={data?.theme ? data.theme : "solid"}
                        fontWeight={400}
                        w="142px"
                        ml="75px"
                      >
                        Call Now
                      </Button>
                    </Link>
                  </Flex>
                  {data.website != "" ? (
                    <Flex
                      onClick={() => handelupdate("website")}
                      p="25px 0px"
                      alignItems={"center"}
                      borderBottom={`2px solid ${borderColor}`}
                    >
                      <Box fontSize={"1.7rem"}>
                        <VscGlobe />
                      </Box>
                      <Link
                        href={"https://" + data?.website}
                        isExternal
                        ml="27px"
                      >
                        {data?.website} <ExternalLinkIcon mx="2px" />
                      </Link>
                      {/* <Text ml="27px"></Text> */}
                    </Flex>
                  ) : (
                    ""
                  )}
                  <Flex
                    p="25px 0px"
                    onClick={() => handelupdate("email")}
                    alignItems={"center"}
                    borderBottom={`2px solid ${borderColor}`}
                  >
                    <Box fontSize={"1.7rem"}>
                      <AiOutlineMail />
                    </Box>
                    <Link href={"mailto:" + data?.email} isExternal>
                      <Text ml="27px">{data?.email}</Text>
                    </Link>
                  </Flex>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Box>
          <Box
            mt={{ "2sm": "40px", lg: "0" }}
            display={"block"}
            borderLeft={{ "2sm": "none", lg: `1px solid ${dividerColor}` }}
            pl={{ lg: "4.1vw", "2xl": "63px" }}
            ml={{ lg: "4.1vw", "2xl": "63px" }}
          >
            <Text fontSize={"1.5rem"} mb="50px" fontWeight="500">
              My Dashboard
            </Text>
            <VStack spacing={"30px"} alignItems="flex-start">
              <Center
                onClick={() => handelupdate("vcf")}
                w={{ "2sm": "498px", lg: "350px", xl: "498px" }}
                h="117px"
                justifyContent={"flex-start"}
                pl="21px"
                bgColor={bgDash}
                borderRadius={"18px"}
                boxShadow="8px 8px 16px 0px rgba(0, 0, 0, 0.1)"
                // as={Button}

                // onClick={handleSave}
              >
                <Button
                  as={Center}
                  onClick={handleSave}
                  variant={data?.theme ? data.theme : "solid"}
                  boxSize={"87px"}
                  borderRadius={"17px"}
                  mr="22px"
                >
                  <Center boxSize={"26px"}>
                    <Image
                      src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/contact.png"
                      alt=""
                    />
                  </Center>
                </Button>
                <Text fontSize={"1.125rem"} color={textColor}>
                  Save Contact
                </Text>
              </Center>

              {data && data.brochure ? (
                <>
                  <Center
                    onClick={() => handelupdate("document")}
                    w={{ sm: "498px", lg: "350px", xl: "498px" }}
                    h="117px"
                    justifyContent={"flex-start"}
                    pl="21px"
                    bgColor={bgDash}
                    borderRadius={"18px"}
                    boxShadow="8px 8px 16px 0px rgba(0, 0, 0, 0.1)"
                  >
                    <Center
                      as={Link}
                      href={data?.brochure}
                      boxSize={"87px"}
                      bgColor={bgDashIcons}
                      borderRadius={"17px"}
                      mr="22px"
                    >
                      <Center boxSize={"26px"}>
                        <Image
                          src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/download.png"
                          alt=""
                        />
                      </Center>
                    </Center>
                    <Text
                      as={Link}
                      href={data?.brochure}
                      fontSize={"1.125rem"}
                      color={textColor}
                    >
                      {/* {data?.brochure} */}
                      Download brochure
                    </Text>
                  </Center>
                </>
              ) : (
                ""
              )}
              {data && data.payment ? (
                <Center
                  onClick={() => handelupdate("payment")}
                  w={{ "2sm": "498px", lg: "350px", xl: "498px" }}
                  h="117px"
                  justifyContent={"flex-start"}
                  pl="21px"
                  borderRadius={"18px"}
                  bgColor={bgDash}
                  boxShadow="8px 8px 16px 0px rgba(0, 0, 0, 0.1)"
                >
                  <Center
                    as={Link}
                    isExternal
                    href={data?.payment}
                    boxSize={"87px"}
                    bgColor={bgDashIcons}
                    borderRadius={"17px"}
                    mr="22px"
                  >
                    <Center boxSize={"26px"}>
                      <Image
                        src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/payment.png"
                        alt=""
                      />
                    </Center>
                  </Center>
                  <Text
                    as={Link}
                    isExternal
                    href={data?.payment}
                    fontSize={"1.125rem"}
                    color={textColor}
                  >
                    Make payment
                  </Text>
                </Center>
              ) : (
                ""
              )}
            </VStack>
          </Box>
        </Flex>
      </Tabs>
      <Box display={{ base: "block", "2sm": "none" }} w="100%">
        <VStack spacing={"48px"} color={textColor}>
          <NextLink href="/" passHref>
            <Link>
              <Image src={logo} />
            </Link>
          </NextLink>
          <Flex alignItems={"center"} textAlign="center" flexDir="column">
            <Box
              w={{ base: "109px", xs: "193px" }}
              h={{ base: "110px", xs: "195px" }}
              flexShrink={"0"}
            >
              <Box h="75%">
                <Image
                  alt=""
                  h="100%"
                  w="100%"
                  borderTopRadius="20px"
                  objectFit="cover"
                  src={
                    data?.profilePhoto
                      ? data?.profilePhoto
                      : // : "https://via.placeholder.com/150"
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                  }
                />
              </Box>
              <Box h="25%">
                <Center h="full" borderBottomRadius="20px" bgColor={bgViews}>
                  <Box fontSize={"1rem"}>
                    <AiOutlineEye />
                  </Box>
                  <Text ml="10px" fontSize="12px">
                    {data?.views}
                  </Text>
                </Center>
              </Box>
            </Box>
            <Box ml={{ "2sm": "50px", lg: "0", xl: "3.4vw", "2xl": "50px" }}>
              <Text
                fontSize={{ base: "1.5rem", xs: "1.8rem", "2sm": "2.25rem" }}
                fontWeight={{ base: "600", "2sm": "500" }}
              >
                {data?.name}
              </Text>
              <Text
                fontSize={{
                  base: "0.8125rem",
                  xs: "1.1rem",
                  "2sm": "1.5rem",
                }}
                color={"gray.100"}
              >
                {data?.designation}
              </Text>
            </Box>
          </Flex>
          <HStack
            w="100%"
            spacing="30px"
            justifyContent="space-evenly"
            // justifyContent={"space-between"}
          >
            <VStack onClick={() => handelupdate("vcf")} spacing={"10px"}>
              <Button
                boxSize={{ base: "45px", xs: "90px", sm: "120px" }}
                borderRadius="8px"
                // bgColor={bgDashIconMobile}
                onClick={handleSave}
                as={Center}
                // variant="solid"
                variant={data.theme && data?.theme ? data.theme : "solid"}
              >
                <Box boxSize={{ base: "20px", xs: "40px", sm: "60px" }}>
                  <Image
                    src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/contact.png"
                    alt=""
                  />
                </Box>
              </Button>
              <Text
                color={"#ABABAB"}
                fontSize={{ base: "0.6875rem", xs: "0.85rem", sm: "1rem" }}
              >
                Save Contact
              </Text>
            </VStack>
            {data && data.brochure ? (
              <VStack spacing={"10px"} onClick={() => handelupdate("document")}>
                <Center
                  as={Link}
                  href={data?.brochure}
                  boxSize={{ base: "45px", xs: "90px", sm: "120px" }}
                  borderRadius="8px"
                  bgColor={bgDashIconMobile}
                >
                  <Box boxSize={{ base: "20px", xs: "40px", sm: "60px" }}>
                    <Image
                      src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/download.png"
                      alt=""
                    />
                  </Box>
                </Center>
                <Text
                  as={Link}
                  href={data?.brochure}
                  fontSize={{ base: "0.6875rem", xs: "0.85rem", sm: "1rem" }}
                  color={"#ABABAB"}
                >
                  Download brochure
                </Text>
              </VStack>
            ) : (
              ""
            )}
            {data && data.payment ? (
              <VStack onClick={() => handelupdate("payment")} spacing={"10px"}>
                <Center
                  boxSize={{ base: "45px", xs: "90px", sm: "120px" }}
                  borderRadius="8px"
                  bgColor={bgDashIconMobile}
                >
                  <Box boxSize={{ base: "20px", xs: "40px", sm: "60px" }}>
                    <Image
                      src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/payment.png"
                      alt=""
                    />
                  </Box>
                </Center>
                <Text
                  as={Link}
                  isExternal
                  href={data?.payment}
                  fontSize={{ base: "0.6875rem", xs: "0.85rem", sm: "1rem" }}
                  color={"#ABABAB"}
                >
                  Make payment
                </Text>
              </VStack>
            ) : (
              ""
            )}
          </HStack>
        </VStack>
        <Tabs w="100%" mt="30px" color={textColor}>
          <TabList border={"none"} justifyContent="space-between">
            <Tab
              fontSize={{ base: "0.875rem", xs: "1rem", sm: "1.125rem" }}
              fontWeight="500"
              p="0"
              color={tabColorMobile}
              _selected={{
                color: textColor,
                borderBottom: `2px solid ${activeTabBorder}`,
              }}
              _active={{ border: "none" }}
              _focus={{ border: "none" }}
            >
              About Us
            </Tab>
            <Tab
              color={tabColorMobile}
              fontWeight="500"
              fontSize={{ base: "0.875rem", xs: "1rem", sm: "1.125rem" }}
              p="0"
              _selected={{
                color: textColor,
                borderBottom: `2px solid ${activeTabBorder}`,
              }}
              _active={{ border: "none" }}
              _focus={{ border: "none" }}
            >
              {"Let's Connect"}
            </Tab>
            <Tab
              color={tabColorMobile}
              fontWeight="500"
              fontSize={{ base: "0.875rem", xs: "1rem", sm: "1.125rem" }}
              p="0"
              _selected={{
                color: textColor,
                borderBottom: `2px solid ${activeTabBorder}`,
              }}
              _active={{ border: "none" }}
              _focus={{ border: "none" }}
            >
              Get in touch
            </Tab>
          </TabList>

          <TabPanels mt="30px">
            <TabPanel p="0">
              <Text
                fontWeight={"600"}
                fontSize={{ base: "1rem", xs: "1.125rem", sm: "1.25rem" }}
              >
                {data?.tagline}
              </Text>
              <Text
                mt="13px"
                fontSize={{ base: "0.75rem", xs: "0.875rem", sm: "1rem" }}
              >
                {data?.bio}
              </Text>
              <Box pt="50px" h="200px">
                {data && data.socialLinks.youtube != "" ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeEmbed}`}
                    // frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="video"
                    width="100%"
                    height="100%"
                  />
                ) : (
                  ""
                )}
              </Box>
            </TabPanel>
            <TabPanel p="0">
              {check ? (
                ""
              ) : (
                <Box h="100px" w="300px" as={Center}>
                  No Social Links Available
                </Box>
              )}
              <SimpleGrid columns={3} spacing={8}>
                {data?.socialLinks.whatsapp != "" ? (
                  <Center
                    boxSize={{ base: "48px", xs: "64px", sm: "80px" }}
                    borderRadius="14px"
                    border={`2px solid ${borderColor}`}
                    as={Link}
                    isExternal
                    href={`https://api.whatsapp.com/send?phone=${data?.socialLinks.whatsapp}`}
                  >
                    <Box
                      flexShrink={"0"}
                      boxSize={{ base: "29px", xs: "45px", sm: "60px" }}
                    >
                      <Image
                        w="100%"
                        src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Whatsapp.png"
                        alt=""
                      />
                    </Box>
                  </Center>
                ) : (
                  ""
                )}
                {data?.socialLinks.twitter != "" ? (
                  <Center
                    onClick={() => handelupdate("twitter")}
                    boxSize={{ base: "48px", xs: "64px", sm: "80px" }}
                    borderRadius="14px"
                    border={`2px solid ${borderColor}`}
                    as={Link}
                    isExternal
                    href={data?.socialLinks.twitter}
                  >
                    <Box
                      flexShrink={"0"}
                      boxSize={{ base: "29px", xs: "45px", sm: "60px" }}
                    >
                      <Image
                        w="100%"
                        src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Twitter.png"
                        alt=""
                      />
                    </Box>
                  </Center>
                ) : (
                  ""
                )}

                {data?.socialLinks.instagram != "" ? (
                  <Center
                    onClick={() => handelupdate("instagram")}
                    boxSize={{ base: "48px", xs: "64px", sm: "80px" }}
                    borderRadius="14px"
                    as={Link}
                    isExternal
                    href={data.socialLinks?.instagram}
                    border={`2px solid ${borderColor}`}
                  >
                    <Box
                      flexShrink={"0"}
                      boxSize={{ base: "29px", xs: "45px", sm: "60px" }}
                    >
                      <Image
                        w="100%"
                        src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Instagram.png"
                        alt=""
                      />
                    </Box>
                  </Center>
                ) : (
                  ""
                )}

                {data?.socialLinks.facebook != "" ? (
                  <Center
                    onClick={() => handelupdate("facebook")}
                    as={Link}
                    isExternal
                    href={data.socialLinks?.facebook}
                    boxSize={{ base: "48px", xs: "64px", sm: "80px" }}
                    borderRadius="14px"
                    border={`2px solid ${borderColor}`}
                  >
                    <Box
                      flexShrink={"0"}
                      boxSize={{ base: "29px", xs: "45px", sm: "60px" }}
                    >
                      <Image
                        w="100%"
                        src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Facebook.png"
                        alt=""
                      />
                    </Box>
                  </Center>
                ) : (
                  ""
                )}

                {data?.socialLinks.linkedin != "" ? (
                  <Center
                    onClick={() => handelupdate("linkedin")}
                    as={Link}
                    isExternal
                    href={data.socialLinks?.linkedin}
                    boxSize={{ base: "48px", xs: "64px", sm: "80px" }}
                    borderRadius="14px"
                    border={`2px solid ${borderColor}`}
                  >
                    <Box
                      flexShrink={"0"}
                      boxSize={{ base: "29px", xs: "45px", sm: "60px" }}
                    >
                      <Image
                        w="100%"
                        src="https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/LinkedIn.png"
                        alt=""
                      />
                    </Box>
                  </Center>
                ) : (
                  ""
                )}
                {data?.socialLinks.google != "" ? (
                  <Center
                    onClick={() => handelupdate("google")}
                    as={Link}
                    isExternal
                    href={data.socialLinks?.google}
                    boxSize={{ base: "48px", xs: "64px", sm: "80px" }}
                    borderRadius="14px"
                    border={`2px solid ${borderColor}`}
                  >
                    <Box
                      flexShrink={"0"}
                      boxSize={{ base: "29px", xs: "45px", sm: "60px" }}
                    >
                      <Image w="100%" src="/assets/images/greview.png" alt="" />
                    </Box>
                  </Center>
                ) : (
                  ""
                )}

                {/* <Spacer /> */}
              </SimpleGrid>
              <Center>
                <Button
                  variant={data?.theme ? data.theme : "solid"}
                  // w="80px"
                  // h="30px"
                  m="2px"
                  onClick={onOpen}
                >
                  Send Message
                </Button>
                <SendMessage
                  isOpen={isOpen}
                  onClose={onClose}
                  card_id={data?.card_id}
                />
              </Center>

              {/* <Center mt="50px">
                <Button w="173px" h="62px" fontWeight={"400"}>
                  Send Message
                </Button>
              </Center> */}
            </TabPanel>
            <TabPanel p="0">
              <Flex
                mt="33px"
                flexDir={"column"}
                w="100%"
                fontSize={{ base: "0.75rem", xs: "0.875rem", sm: "1rem" }}
              >
                <Flex
                  onClick={() => handelupdate("location")}
                  p="0px 0px 25px 0"
                  alignItems={"center"}
                  borderBottom={`2px solid ${borderColor}`}
                >
                  <Box fontSize={"1.7rem"}>
                    <GoLocation />
                  </Box>
                  <Link
                    href={"https://www.google.com/maps/search/" + data?.address}
                    isExternal
                  >
                    <Text ml="27px">{data?.address}</Text>
                  </Link>
                </Flex>
                <Flex
                  p="25px 0px"
                  alignItems={"center"}
                  justifyContent="space-between"
                  borderBottom={`2px solid ${borderColor}`}
                >
                  <Flex alignItems={"center"}>
                    <Box fontSize={"1.7rem"}>
                      <FiPhone />
                    </Box>
                    <Box ml="27px">
                      <Text>{data?.pnumber}</Text>
                      <Text>{data?.snumber}</Text>
                    </Box>
                  </Flex>

                  <Link href={`tel:${data?.pnumber}`}>
                    <Button
                      // color={textColor2}
                      variant={data?.theme ? data.theme : "solid"}
                      fontWeight={400}
                      w="100px"
                    >
                      Call Now
                    </Button>
                  </Link>
                </Flex>
                {data?.website != "" ? (
                  <Flex
                    onClick={() => handelupdate("website")}
                    p="25px 0px"
                    alignItems={"center"}
                    borderBottom={`2px solid ${borderColor}`}
                  >
                    <Box fontSize={"1.7rem"}>
                      <VscGlobe />
                    </Box>

                    <Link isExternal href={data.website} ml="27px">
                      {data?.website}
                    </Link>
                  </Flex>
                ) : (
                  ""
                )}

                <Flex
                  onClick={() => handelupdate("email")}
                  p="25px 0px"
                  alignItems={"center"}
                  borderBottom={`2px solid ${borderColor}`}
                >
                  <Box fontSize={"1.7rem"}>
                    <AiOutlineMail />
                  </Box>
                  <Link href={"mailto:" + data?.email} isExternal>
                    <Text ml="27px">{data?.email}</Text>
                  </Link>
                </Flex>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
