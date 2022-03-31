import React, { useEffect, useState } from "react";
import Head from "next/head";
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
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Container,
  Spacer,
  Avatar,
  useColorMode,
} from "@chakra-ui/react";
import { BiCheck } from "react-icons/bi";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import { signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import Select from "react-select";
import Router from "next/router";
import { useRouter } from "next/router";

const Payment = () => {
  const router = useRouter();
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

  const [isPremium, setIsPremium] = useState(false);

  const [isNFC, setIsNFC] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [Plan, setPlan] = useState("");
  const [NFC, setNFC] = useState("");
  console.log(Plan);
  const contentType = "application/json";

  useEffect(() => {
    async function fetchAPI() {
      setIsFetching(true);
      const res = await fetch("/api/auth/getnfc");
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        Toast("Success", "You Allready have a NFC Subscription ", "success");
        setIsNFC(true);
        console.log("NFC Yes");
        return Router.push("/subscription");
      }
      if (res.status === 400) {
        setIsNFC(false);
        console.log("Not NFC");
      }
      if (res.status === 500) {
        setIsNFC(false);
        console.log("Error");
      }
    }
    fetchAPI().then(() => setIsFetching(false));

    async function fetchAPIPremimum() {
      setIsFetching(true);
      const res = await fetch("/api/auth/getpremiumuser");
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        Toast(
          "Success",
          "You Allready have a Premimum Subscription ",
          "success"
        );
        setIsPremium(true);
        console.log("Premium Yes");
        return Router.push("/subscription");
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
    fetchAPIPremimum().then(() => setIsFetching(false));
  }, []);

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
    { value: "1m", label: "1 Month" },
    { value: "3m", label: "3 Months" },
    { value: "6m", label: "6 Months" },
    { value: "1y", label: "1 Year" },
  ];
  const { data: session } = useSession();

  const logo = useColorModeValue(
    "https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Logo.png",
    "https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Logo+Dark.png"
  );
  const [Loading, setLoading] = useState(false);
  const [LoadingNFC, setLoadingNFC] = useState(false);
  const textColor = useColorModeValue("black", "white");
  const bg = useColorModeValue("white", "black.100");
  const textColor1 = useColorModeValue("#7C7C7C", "#C8C8C8");
  const bg2 = useColorModeValue("white", "black.200");
  const bg1 = useColorModeValue("#F4FFE2", "#474856");

  //testing plans
  const planId = {
    "1m": "plan_JDc9K4JUisQ346",
    "3m": "plan_JDc9K4JUisQ346",
    "6m": "plan_JDc9K4JUisQ346",
    "1y": "plan_JDc9K4JUisQ346",
  };

  //live plans
  // const planId = {
  //   "1m": "plan_J2y8PR677stBzv",
  //   "3m": "plan_JDGtDLZpacpubC",
  //   "6m": "plan_JDGtYXP6LSuR6O",
  //   "1y": "plan_JDGu4dR8J3T6Gk",
  // };

  // const history = useRouter();

  //premimum
  const paymentHandler = async (e) => {
    // if (Plan == "") {
    //   return Toast("Error", "Please select a plan", "error");
    // }

    setLoading(true);
    e.preventDefault();
    console.log(NFC);
    try {
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Plan && planId[Plan]),
        // body: JSON.stringify(NFC),
      });
      const data = await response.json();
      if (response.status === 200) {
        Toast("Payment", "Payment has initialized", "success");
      }
      if (response.status === 400) {
        return Toast("Payment", "Payment has failed", "error");
      }
      if (response.status === 500) {
        return Toast("Payment", "Payment has failed", "error");
      }

      console.log("sub object", data);

      const options = {
        key: process.env.RAZORPAY_KEY,
        subscription_id: data.id,
        name: "Premium Plan",
        description: "Test Payment",

        handler: async (response) => {
          try {
            const temp = {
              subscription_id: data.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              createdAt: Date.now(),
            };

            const res = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(temp),
            });
            const data1 = await res.json();
            if (res.status === 200) {
              setLoading(false);
              Toast("Success", "Payment Successful", "success");
              return Router.replace("/subscription");
            }
            if (res.status === 400) {
              setLoading(false);
              return Toast("Error", "Payment Failed", "error");
            }
            if (res.status === 500) {
              setLoading(false);
              return Toast("Error", "Payment Failed", "error");
            }
            setLoading(false);
          } catch (err) {
            console.log("err", err);
            setLoading(false);
          }
        },
      };
      setLoading(false);

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  //nfc
  const paymentHandlerNFC = async (e) => {
    // if (Plan == "") {
    //   return Toast("Error", "Please select a plan", "error");
    // }

    setLoadingNFC(true);
    e.preventDefault();
    console.log(NFC);
    try {
      const response = await fetch("/api/razorpay/NFC", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(Plan && planId[Plan]),
        //testing plan
        // body: JSON.stringify("plan_JAtBAxzaltOUtD"),

        //live plan
        // body: JSON.stringify("plan_JDGuSxV9STsHsw"),
        body: JSON.stringify("plan_JDc9a5GgVsrYnj"),
      });
      const data = await response.json();
      if (response.status === 200) {
        Toast("Payment", "Payment has initialized", "success");
      }
      if (response.status === 400) {
        return Toast("Payment", "Payment has failed", "error");
      }
      if (response.status === 500) {
        return Toast("Payment", "Payment has failed", "error");
      }

      console.log("sub object", data);

      const options = {
        key: process.env.RAZORPAY_KEY,
        subscription_id: data.id,
        name: "Premium Plan",
        description: "Test Payment",

        handler: async (response) => {
          try {
            const temp = {
              subscription_id: data.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              createdAt: Date.now(),
            };

            const res = await fetch("/api/razorpay/verify_nfc", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(temp),
            });
            const data1 = await res.json();
            if (res.status === 200) {
              setLoadingNFC(false);
              Toast("Success", "Payment Successful", "success");
              return Router.replace("/subscription");
            }
            if (res.status === 400) {
              setLoadingNFC(false);
              return Toast("Error", "Payment Failed", "error");
            }
            if (res.status === 500) {
              setLoadingNFC(false);
              return Toast("Error", "Payment Failed", "error");
            }
            setLoadingNFC(false);
          } catch (err) {
            console.log("err", err);
            setLoadingNFC(false);
          }
        },
      };
      setLoadingNFC(false);

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      setLoadingNFC(false);
      console.log(err);
    }
  };
  return (
    <>
      <Head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Head>
      <>
        <Center
          pos="relative"
          flexDir={"column"}
          w="100%"
          // p={{ base: "50px 0px", sm: "100px 0px", lg: "150px 0px" }}
          color={textColor}
        >
          <Box
            zIndex={2}
            w="100%"
            d="flex"
            flexDir={"column"}
            alignItems="center"
          >
            <Container
              bg={bg}
              pr={["10px", "10px", "100px"]}
              pl={["10px", "10px", "100px"]}
              maxW="100%"
            >
              <Flex
                pt={["0px", "0px", "0px"]}
                as={Center}
                textColor={textColor}
                justifyContent="center"
                alignItems="center"
                h={["80px", "80px", "120px"]}
                w="full"
                flexDirection="row"
              >
                <Box cursor="pointer">
                  <NextLink href="/" passHref>
                    <Image src={logo} w={["80%", "80%", "100%"]} alt="" />
                  </NextLink>
                </Box>
                <Spacer />
                <Box cursor="pointer" display={["none", "none", "flex"]}>
                  {/* <HStack p="0px 20px 0px 20px" h="40px"> */}
                  {/* </HStack> */}
                  {/* <NextLink href="/create" passHref> */}
                  <Button
                    leftIcon={<AddIcon />}
                    mr={4}
                    variant={"outline"}
                    borderColor="greenBrand.100"
                    color={textColor}
                    onClick={() => {
                      router.push("/create");
                    }}
                  >
                    Create New Card
                  </Button>
                  {/* </NextLink> */}
                  <NextLink href="/cards" passHref>
                    <Text
                      p="0px 10px 0px 10px"
                      h="40px"
                      fontWeight="bold"
                      as={Center}
                    >
                      My Cards
                    </Text>
                  </NextLink>
                  {/* </NextLink> */}

                  <HStack p="0px 20px 0px 20px" h="40px">
                    {/* <Avatar boxSize="35px" /> */}

                    <Text onClick={signOut} cursor="pointer" fontWeight="bold">
                      Sign Out
                    </Text>
                  </HStack>
                </Box>
                <Box display={["block", "block", "none"]}>
                  {session ? (
                    <Menu isLazy={true} computePositionOnMount={true}>
                      <MenuButton as={Avatar} boxSize="40px" cursor="pointer" />
                      {/* <Avatar boxSize="40px" as={MenuButton} /> */}

                      <MenuList color={textColor} w="20px">
                        <MenuItem>
                          <NextLink href="/create" passHref>
                            <Button
                              ml={4}
                              variant={"outline"}
                              borderColor="greenBrand.100"
                            >
                              Create New Card +
                            </Button>
                          </NextLink>
                        </MenuItem>

                        <MenuItem cursor="pointer" as={Center}>
                          <NextLink href="/cards" passHref>
                            <Text>My Cards</Text>
                          </NextLink>
                        </MenuItem>
                        <MenuItem
                          cursor="pointer"
                          onClick={signOut}
                          as={Center}
                        >
                          Sign Out
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  ) : (
                    <Flex
                      p="5px"
                      m={{ base: "10px 0px", lg: "0px 20px" }}
                      alignItems={"center"}
                    >
                      <NextLink href="/auth/signin" passHref>
                        <Button>Sign In</Button>
                      </NextLink>
                    </Flex>
                  )}
                </Box>
              </Flex>
            </Container>
            <Box bg={bg2} w="full">
              <Text
                as={Center}
                pt="50px"
                color={textColor}
                fontWeight={"500"}
                fontSize={{ base: "1.5rem", lg: "2.25rem" }}
              >
                Pricing
              </Text>
              <SimpleGrid
                w="100%"
                // mt="54px"
                color={textColor}
                p={{ base: "15px", sm: "30px", lg: "60px", xl: "90px" }}
                minChildWidth={{ base: "320px", sm: "396px" }}
                spacing="1.625rem"
              >
                <Center
                  pt="25px"
                  boxShadow="8px 0px 33px 0px #0000000F"
                  flexDir={"column"}
                  bgColor={bg}
                  borderRadius="27px"
                >
                  <Text p="0px 25px" fontSize={"1.5rem"} fontWeight="500">
                    Starter
                  </Text>
                  <Text
                    p="0px 25px"
                    mt="10px"
                    textAlign={"center"}
                    fontSize={{ base: "1rem", sm: "1.125rem" }}
                    lineHeight="35px"
                  >
                    The basics for personal projects experiments.
                  </Text>
                  <VStack
                    p="0px 25px"
                    alignItems={"flex-start"}
                    mt="50px"
                    mb="50px"
                    color={textColor1}
                    spacing="8px"
                    fontSize={{ base: "1rem", sm: "1.125rem" }}
                  >
                    <Flex alignItems={"center"}>
                      <Box fontSize={"1.5rem"} color="greenBrand.100">
                        <BiCheck />
                      </Box>
                      <Text ml="27px" lineHeight="31px">
                        The basics for personal projects experiments.
                      </Text>
                    </Flex>
                    <Flex alignItems={"center"}>
                      <Box fontSize={"1.5rem"} color="greenBrand.100">
                        <BiCheck />
                      </Box>
                      <Text ml="27px" lineHeight="31px">
                        The basics for personal projects experiments.
                      </Text>
                    </Flex>
                    <Flex alignItems={"center"}>
                      <Box fontSize={"1.5rem"} color="greenBrand.100">
                        <BiCheck />
                      </Box>
                      <Text ml="27px" lineHeight="31px">
                        The basics for personal projects experiments.
                      </Text>
                    </Flex>
                    <Flex alignItems={"center"}>
                      <Box fontSize={"1.5rem"} color="greenBrand.100">
                        <BiCheck />
                      </Box>
                      <Text ml="27px" lineHeight="31px">
                        The basics for personal projects experiments.
                      </Text>
                    </Flex>
                  </VStack>
                  <Center
                    borderBottomRadius={"27px"}
                    flexDir={"column"}
                    w="100%"
                    h="234px"
                    bgColor={bg1}
                  >
                    <Text fontWeight={"600"} fontSize="2.25rem" mb="28px">
                      Free
                    </Text>
                    <Button
                      w="183px"
                      h="60px"
                      fontWeight={"600"}
                      fontSize="1.125rem"
                    >
                      Buy Now
                    </Button>
                  </Center>
                </Center>
                <Center
                  pt="25px"
                  boxShadow="8px 0px 33px 0px #0000000F"
                  flexDir={"column"}
                  bgColor={bg}
                  borderRadius="27px"
                >
                  <Text p="0px 25px" fontSize={"1.5rem"} fontWeight="500">
                    Premium
                  </Text>
                  <Text
                    p="0px 25px"
                    mt="10px"
                    textAlign={"center"}
                    fontSize={{ base: "1rem", sm: "1.125rem" }}
                    lineHeight="35px"
                  >
                    The basics for personal projects experiments.
                  </Text>
                  <VStack
                    p="0px 25px"
                    alignItems={"flex-start"}
                    mt="50px"
                    mb="50px"
                    color={textColor1}
                    spacing="8px"
                    fontSize={{ base: "1rem", sm: "1.125rem" }}
                  >
                    <Flex alignItems={"center"}>
                      <Box fontSize={"1.5rem"} color="greenBrand.100">
                        <BiCheck />
                      </Box>
                      <Text ml="27px" lineHeight="31px">
                        The basics for personal projects experiments.
                      </Text>
                    </Flex>
                    <Flex alignItems={"center"}>
                      <Box fontSize={"1.5rem"} color="greenBrand.100">
                        <BiCheck />
                      </Box>
                      <Text ml="27px" lineHeight="31px">
                        The basics for personal projects experiments.
                      </Text>
                    </Flex>
                    <Flex alignItems={"center"}>
                      <Box fontSize={"1.5rem"} color="greenBrand.100">
                        <BiCheck />
                      </Box>
                      <Text ml="27px" lineHeight="31px">
                        The basics for personal projects experiments.
                      </Text>
                    </Flex>
                    <Flex alignItems={"center"}>
                      <Box fontSize={"1.5rem"} color="greenBrand.100">
                        <BiCheck />
                      </Box>
                      <Text ml="27px" lineHeight="31px">
                        The basics for personal projects experiments.
                      </Text>
                    </Flex>
                  </VStack>
                  <Center
                    borderBottomRadius={"27px"}
                    flexDir={"column"}
                    w="100%"
                    h="234px"
                    bgColor={bg1}
                  >
                    <Select
                      onChange={(e) => {
                        setNFC("");
                        setPlan(e.value);
                      }}
                      styles={
                        colorMode === "dark" ? customStyles : customStylesLight
                      }
                      options={options}
                      isSearchable={false}
                      hideSelectedOptions={false}
                      placeholder={"Plan Duration"}
                      className="react-select"
                      classNamePrefix={select}
                    />

                    <Text
                      fontWeight={"600"}
                      fontSize="2.25rem"
                      pt="10px"
                      mb="10px"
                    >
                      {Plan === "1m"
                        ? "₹ 99"
                        : Plan === "3m"
                        ? "₹ 249"
                        : Plan === "6m"
                        ? "₹ 349"
                        : Plan === "1y"
                        ? "₹ 799"
                        : "Select a Plan"}
                    </Text>
                    <Button
                      onClick={paymentHandler}
                      isLoading={Loading}
                      isDisabled={Plan != "" ? false : true}
                      w="183px"
                      h="60px"
                      fontWeight={"600"}
                      fontSize="1.125rem"
                    >
                      Buy Now
                    </Button>
                  </Center>
                </Center>
                <Center
                  pt="25px"
                  boxShadow="8px 0px 33px 0px #0000000F"
                  flexDir={"column"}
                  bgColor={bg}
                  borderRadius="27px"
                >
                  <Text p="0px 25px" fontSize={"1.5rem"} fontWeight="500">
                    NFC Card
                  </Text>
                  <Text
                    p="0px 25px"
                    mt="10px"
                    textAlign={"center"}
                    fontSize={{ base: "1rem", sm: "1.125rem" }}
                    lineHeight="35px"
                  >
                    The basics for personal projects experiments.
                  </Text>
                  <VStack
                    p="0px 25px"
                    alignItems={"flex-start"}
                    mt="50px"
                    mb="50px"
                    color={textColor1}
                    spacing="8px"
                    fontSize={{ base: "1rem", sm: "1.125rem" }}
                  >
                    <Flex alignItems={"center"}>
                      <Box fontSize={"1.5rem"} color="greenBrand.100">
                        <BiCheck />
                      </Box>
                      <Text ml="27px" lineHeight="31px">
                        The basics for personal projects experiments.
                      </Text>
                    </Flex>
                    <Flex alignItems={"center"}>
                      <Box fontSize={"1.5rem"} color="greenBrand.100">
                        <BiCheck />
                      </Box>
                      <Text ml="27px" lineHeight="31px">
                        The basics for personal projects experiments.
                      </Text>
                    </Flex>
                    <Flex alignItems={"center"}>
                      <Box fontSize={"1.5rem"} color="greenBrand.100">
                        <BiCheck />
                      </Box>
                      <Text ml="27px" lineHeight="31px">
                        The basics for personal projects experiments.
                      </Text>
                    </Flex>
                    <Flex alignItems={"center"}>
                      <Box fontSize={"1.5rem"} color="greenBrand.100">
                        <BiCheck />
                      </Box>
                      <Text ml="27px" lineHeight="31px">
                        The basics for personal projects experiments.
                      </Text>
                    </Flex>
                  </VStack>
                  <Center
                    borderBottomRadius={"27px"}
                    flexDir={"column"}
                    w="100%"
                    h="234px"
                    bgColor={bg1}
                  >
                    <Text fontWeight={"600"} fontSize="2.25rem" mb="28px">
                      ₹ 2399
                    </Text>
                    <Button
                      w="183px"
                      isLoading={LoadingNFC}
                      h="60px"
                      fontWeight={"600"}
                      fontSize="1.125rem"
                      onClick={paymentHandlerNFC}
                    >
                      Buy Now
                    </Button>
                  </Center>
                </Center>
              </SimpleGrid>
            </Box>
          </Box>
        </Center>
      </>
    </>
  );
};

export default Payment;
