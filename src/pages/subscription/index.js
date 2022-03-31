import { AddIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  DarkMode,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import Router from "next/router";
import { DarkModeSwitch } from "../../components/DarkModeSwitch";

export default function Subscription() {
  const logo = useColorModeValue(
    "https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Logo.png",
    "https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Logo+Dark.png"
  );
  const [data, setdata] = useState({});
  const [NFCdata, setNFCdata] = useState({});
  const [status, setStatus] = useState("");
  const [statusNFC, setStatusNFC] = useState("");
  const [spinner, setspinner] = useState(false);
  const { data: session } = useSession();
  const [isLoading, setisLoading] = useState(false);
  const [isLoadingNFC, setisLoadingNFC] = useState(false);
  const toast = useToast();
  const textColor = useColorModeValue("black", "white");
  const bg = useColorModeValue("white", "black.100");
  const bg1 = useColorModeValue("white", "black.200");

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

  //fetching status of all  subscription
  useEffect(() => {
    setisLoading(true);
    async function fetchMyAPI() {
      const res = await fetch("/api/razorpay/subscriptionstatus");
      const data1 = await res.json();
      console.log(data1);
      setdata(data1 && data1);
      //if sub exist
      if (res.status === 200) {
        //if staus is active
        if (data1.status === "active") {
          setStatus("Active");
          setisLoading(false);
          return;
        }
        //if status is created
        if (data1.status === "created") {
          setStatus("Created");
          Router.reload;
          return;
        }
        if (data1.status === "cancelled") {
          setStatus("Cancelled");
          return;
        }
        if (data1.status === "completed") {
          setStatus("Completed");
          return;
        }
        if (data1.status === "expired") {
          setStatus("Expired");
          return;
        }
        if (data1.status === "authenticated") {
          setStatus("authenticated");
          return;
        }
      }
      if (res.status === 400) {
        setStatus("No Subscription Found");
        setisLoading(false);
        return;
      }
      if (res.status === 401) {
        setStatus("No Subscription Found");
        setisLoading(false);
        return;
      }
      if (res.status === 402) {
        setStatus("No Subscription Found");
        setisLoading(false);
        return;
      }
      if (res.status === 500) {
        setStatus("Something Went Wrong");
        setisLoading(false);
        return;
      }
    }
    fetchMyAPI().then(() => {
      setisLoading(false);
    });

    setisLoadingNFC(true);

    async function fetchMyAPINFC() {
      const res = await fetch("/api/razorpay/subscriptionstatus/nfc");
      const data1 = await res.json();
      console.log(data1);
      setNFCdata(data1 && data1);
      //if sub exist
      if (res.status === 200) {
        //if staus is active
        if (data1.status === "active") {
          setStatusNFC("Active");
          setisLoadingNFC(false);
          return;
        }
        //if status is created
        if (data1.status === "created") {
          setStatusNFC("Created");
          Router.reload;
          return;
        }
        if (data1.status === "cancelled") {
          setStatusNFC("Cancelled");
          return;
        }
        if (data1.status === "completed") {
          setStatusNFC("Completed");
          return;
        }
        if (data1.status === "expired") {
          setStatusNFC("Expired");
          return;
        }
        if (data1.status === "authenticated") {
          setStatusNFC("authenticated");
          return;
        }
      }
      if (res.status === 400) {
        setStatusNFC("No Subscription Found");
        setisLoadingNFC(false);
        return;
      }
      if (res.status === 401) {
        setStatusNFC("No Subscription Found");
        setisLoadingNFC(false);
        return;
      }
      if (res.status === 402) {
        setStatusNFC("No Subscription Found");
        setisLoadingNFC(false);
        return;
      }
      if (res.status === 500) {
        setStatusNFC("Something Went Wrong");
        setisLoadingNFC(false);
        return;
        c;
      }
    }
    fetchMyAPINFC().then(() => {
      setisLoadingNFC(false);
    });

    return () => {
      console.log("cleanup");
    };
  }, []);

  //cancel subscription premium user
  async function handleClick(option) {
    setspinner(true);
    const res = await fetch("/api/razorpay/cancelsubscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ option }),
    });
    const data = await res.json();

    if (res.status === 200) {
      setspinner(false);
      Toast("Successfully Cancelled your Subscription", "", "success");
      return Router.push("/pricing");
    }
    if (res.status === 400) {
      setspinner(false);
      Toast("Something went wrong", "", "error");
    }
    if (res.status === 500) {
      setspinner(false);
      Toast("Something went wrong", "", "error");
    }
    setdata(data);
  }
  async function handleClickNFC(option) {
    setspinner(true);
    const res = await fetch("/api/razorpay/cancelsubscription/nfc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ option }),
    });
    const data = await res.json();

    if (res.status === 200) {
      setspinner(false);

      Toast("Successfully Cancelled your Subscription", "", "success");
      return Router.push("/pricing");
    }
    if (res.status === 400) {
      setspinner(false);
      Toast("Something went wrong", "", "error");
    }
    if (res.status === 500) {
      setspinner(false);
      Toast("Something went wrong", "", "error");
    }
    setdata(data);
  }

  return (
    <Box h="100vh">
      <DarkModeSwitch />

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
            {/* <NextLink href="/" passHref> */}
            <Image src={logo} w={["80%", "80%", "100%"]} alt="" />
            {/* </NextLink> */}
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
            >
              Create New Card
            </Button>
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
                  <MenuItem cursor="pointer" onClick={signOut} as={Center}>
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

      {
        <>
          <Box bg={bg1} as={Flex} justifyContent="center" pt="20px" w="100%">
            {isLoading ? (
              <VStack w="95%" mt="10px" maxW={"1205px"} spacing="15px">
                <Box
                  role="group"
                  borderRadius={"30px"}
                  w="80%"
                  boxShadow="8px 8px 35px 0px #0000001A"

                  // bgColor={bg}
                >
                  <VStack
                    as={Flex}
                    justifyContent="space-evenly"
                    h="300px"
                    p="20px"
                    align="start"
                    flexDirection="column"
                  >
                    <Skeleton h="40px" w="30%" />
                    <HStack w="full">
                      <VStack w="20%" alignItems="flex-start">
                        <Skeleton h="20px" w="full" />
                        <Skeleton h="20px" w="full" />
                        <Skeleton h="20px" w="full" />
                        <Skeleton h="20px" w="full" />
                        <Skeleton h="20px" w="full" />
                      </VStack>
                      <VStack pl="10px" w="20%" alignItems="flex-start">
                        <Skeleton h="20px" w="full" />
                        <Skeleton h="20px" w="full" />
                        <Skeleton h="20px" w="full" />
                        <Skeleton h="20px" w="full" />
                        <Skeleton h="20px" w="full" />
                      </VStack>
                    </HStack>
                    <HStack
                      w="full"
                      spacing="40px"
                      mt="20px"
                      mb="30px"
                      h="30px"
                    >
                      <Skeleton h="full" w="25%" />
                    </HStack>
                  </VStack>
                </Box>
              </VStack>
            ) : Object.keys(data).length != 0 ? (
              status == "Active" ? (
                <VStack
                  w={["100%", "95%", "95%"]}
                  mt="10px"
                  maxW={"1205px"}
                  spacing="15px"
                >
                  <Box
                    bg={bg}
                    color={textColor}
                    role="group"
                    borderRadius={"30px"}
                    w={["95%%", "95%", "80%"]}
                    boxShadow="8px 8px 35px 0px #0000001A"

                    // bgColor={bg}
                  >
                    <VStack
                      as={Flex}
                      justifyContent="space-evenly"
                      h={["350px", "350px", "350px"]}
                      p="20px"
                      align="start"
                      flexDirection="column"
                    >
                      <Text
                        fontWeight="extrabold"
                        fontSize={["1.5rem", "1.5rem", "2rem"]}
                      >
                        Subscription
                      </Text>
                      <HStack>
                        <VStack alignItems="flex-start">
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            Plan
                          </Text>
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            Account email
                          </Text>
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            Current Status
                          </Text>
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            Subscription Start
                          </Text>
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            Renewal Date
                          </Text>
                        </VStack>
                        <VStack pl="10px" alignItems="flex-start">
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            : Premium
                          </Text>
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            {session && `:  ${session.user.email}`}
                          </Text>
                          <Text
                            fontWeight="bold"
                            textColor="green"
                            fontSize={[".8rem", ".8rem", "1.1rem"]}
                          >
                            : Active
                          </Text>
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            {`:  ${new Date(
                              data.current_start * 1000
                            ).toDateString()}`}
                          </Text>
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            {`:  ${new Date(
                              data.current_end * 1000
                            ).toDateString()}`}
                          </Text>
                        </VStack>
                      </HStack>

                      <Flex
                        w={["100%", "100%", "60%"]}
                        justifyContent={
                          data.cancelAtNextBilling
                            ? "flex-start"
                            : "space-evenly"
                        }
                        // border="2px solid red"
                        flexDirection={["column", "column", "row"]}
                        // spacing="40px"
                        mt="20px"
                        // h="300px"
                        mb={["10px", "10px", "30px"]}
                        h={["150px", "150px", "40px"]}
                      >
                        <Button
                          isLoading={spinner}
                          onClick={() => handleClick(false)}
                          _hover={{
                            bg: "red",
                          }}
                          _active={{
                            bg: "red",
                          }}
                          fontSize={[".8rem", ".8rem", "1.1rem"]}
                          h="40px"
                          bg="red.400"
                        >
                          Cancel immediately
                        </Button>
                        {data.cancelAtNextBilling ? null : (
                          <Button
                            isLoading={spinner}
                            onClick={() => handleClick(true)}
                            _hover={{
                              bg: "red",
                            }}
                            _active={{
                              bg: "red",
                            }}
                            fontSize={[".8rem", ".8rem", "1.1rem"]}
                            h="40px"
                            bg="red.400"
                          >
                            Cancel at renewal date
                          </Button>
                        )}
                      </Flex>
                      {data.cancelAtNextBilling ? (
                        <Text
                          fontWeight="bold"
                          textColor="red.300"
                          fontSize="12px"
                        >
                          Subscription will be cancelled at the end of the
                          current billing period
                        </Text>
                      ) : (
                        ""
                      )}
                    </VStack>
                  </Box>
                </VStack>
              ) : status == "Created" ? (
                <VStack
                  w={["100%", "95%", "95%"]}
                  mt="10px"
                  maxW={"1205px"}
                  spacing="15px"
                >
                  <Center
                    color={textColor}
                    bg={bg}
                    p="20px"
                    role="group"
                    h={["300px", "350px", "350px"]}
                    borderRadius={"30px"}
                    w={["95%%", "95%", "80%"]}
                    boxShadow="8px 8px 35px 0px #0000001A"

                    // bgColor={bg}
                  >
                    <VStack>
                      <Text
                        fontWeight="extrabold"
                        fontSize={["1.5rem", "1.5rem", "2rem"]}
                      >
                        No Subscription Found
                      </Text>
                      <Button onClick={() => Router.push("/pricing")}>
                        Buy Now
                      </Button>
                      <Button onClick={() => Router.reload("/subscription")}>
                        Reload
                      </Button>
                    </VStack>
                  </Center>
                </VStack>
              ) : status == "Cancelled" ? (
                <VStack
                  w={["100%", "95%", "95%"]}
                  mt="10px"
                  maxW={"1205px"}
                  spacing="15px"
                >
                  <Box
                    bg={bg}
                    color={textColor}
                    role="group"
                    borderRadius={"30px"}
                    w={["95%%", "95%", "80%"]}
                    boxShadow="8px 8px 35px 0px #0000001A"

                    // bgColor={bg}
                  >
                    <VStack
                      as={Flex}
                      justifyContent="space-evenly"
                      h={["300px", "350px", "350px"]}
                      p="20px"
                      align="start"
                      flexDirection="column"
                    >
                      <Text
                        fontWeight="extrabold"
                        fontSize={["1.5rem", "1.5rem", "2rem"]}
                      >
                        Subscription
                      </Text>
                      <HStack>
                        <VStack alignItems="flex-start">
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            Plan
                          </Text>
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            Account email
                          </Text>
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            Current Status
                          </Text>
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            Subscription Start
                          </Text>
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            Ended At
                          </Text>
                        </VStack>
                        <VStack pl="10px" alignItems="flex-start">
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            : Premium
                          </Text>
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            {session && `:  ${session.user.email}`}
                          </Text>
                          <Text
                            fontWeight="bold"
                            textColor="red"
                            fontSize={[".8rem", ".8rem", "1.1rem"]}
                          >
                            : Cancelled
                          </Text>
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            {`:  ${new Date(
                              data.current_start * 1000
                            ).toDateString()}`}
                          </Text>
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            {`:  ${new Date(
                              data.ended_at * 1000
                            ).toDateString()}`}
                          </Text>
                        </VStack>
                      </HStack>

                      {/* <HStack
                        spacing="40px"
                        mt="20px"
                        mb={["10px", "10px", "30px"]}
                        h={["20px", "20px", "40px"]}
                      >
                        <Button onClick={() => Router.push("/pricing")}>
                          Buy Now
                        </Button>
                      </HStack> */}
                    </VStack>
                  </Box>
                </VStack>
              ) : status == "Expired" ? (
                <VStack
                  w={["100%", "95%", "95%"]}
                  mt="10px"
                  maxW={"1205px"}
                  spacing="15px"
                >
                  <Box
                    bg={bg}
                    color={textColor}
                    role="group"
                    borderRadius={"30px"}
                    w={["95%%", "95%", "80%"]}
                    boxShadow="8px 8px 35px 0px #0000001A"

                    // bgColor={bg}
                  >
                    <VStack
                      as={Flex}
                      justifyContent="space-evenly"
                      h={["300px", "350px", "350px"]}
                      p="20px"
                      align="start"
                      flexDirection="column"
                    >
                      <Text
                        fontWeight="extrabold"
                        fontSize={["1.5rem", "1.5rem", "2rem"]}
                      >
                        Subscription
                      </Text>
                      <HStack>
                        <VStack alignItems="flex-start">
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            Plan
                          </Text>
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            Account email
                          </Text>
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            Current Status
                          </Text>
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            Subscription Start
                          </Text>
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            Ended At
                          </Text>
                        </VStack>
                        <VStack pl="10px" alignItems="flex-start">
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            : Premium
                          </Text>
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            {`:  ${session && session.user.email}`}
                          </Text>
                          <Text
                            fontWeight="bold"
                            textColor="red"
                            fontSize={[".8rem", ".8rem", "1.1rem"]}
                          >
                            : Expired
                          </Text>
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            {`:  ${new Date(
                              data.current_start * 1000
                            ).toDateString()}`}
                          </Text>
                          <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                            {`:  ${new Date(
                              data.ended_at * 1000
                            ).toDateString()}`}
                          </Text>
                        </VStack>
                      </HStack>

                      <HStack
                        spacing="40px"
                        mt="20px"
                        mb={["10px", "10px", "30px"]}
                        h={["20px", "20px", "40px"]}
                      >
                        <Button onClick={() => Router.push("/pricing")}>
                          Buy Now
                        </Button>
                      </HStack>
                    </VStack>
                  </Box>
                </VStack>
              ) : status == "No Subscription Found" ? (
                <VStack
                  w={["100%", "95%", "95%"]}
                  mt="10px"
                  maxW={"1205px"}
                  spacing="15px"
                >
                  <Center
                    color={textColor}
                    bg={bg}
                    p="20px"
                    role="group"
                    h={["300px", "350px", "350px"]}
                    borderRadius={"30px"}
                    w={["95%%", "95%", "80%"]}
                    boxShadow="8px 8px 35px 0px #0000001A"

                    // bgColor={bg}
                  >
                    <VStack>
                      <Text
                        fontWeight="extrabold"
                        fontSize={["1.5rem", "1.5rem", "2rem"]}
                      >
                        No Subscription Found
                      </Text>
                      <Button onClick={() => Router.push("/pricing")}>
                        Buy Now
                      </Button>
                    </VStack>
                  </Center>
                </VStack>
              ) : status == "Something Went Wrong" ? (
                "Something Went Wrong"
              ) : status == "authenticated" ? (
                <VStack
                  w={["100%", "95%", "95%"]}
                  mt="10px"
                  maxW={"1205px"}
                  spacing="15px"
                >
                  <Center
                    color={textColor}
                    bg={bg}
                    p="20px"
                    role="group"
                    h={["300px", "350px", "350px"]}
                    borderRadius={"30px"}
                    w={["95%%", "95%", "80%"]}
                    boxShadow="8px 8px 35px 0px #0000001A"

                    // bgColor={bg}
                  >
                    <VStack>
                      <Text
                        fontWeight="extrabold"
                        fontSize={["1.5rem", "1.5rem", "2rem"]}
                      >
                        Loading Please Reload
                      </Text>
                      <Button onClick={() => Router.push("/pricing")}>
                        Buy Now
                      </Button>
                      <Button onClick={() => Router.reload("/subscription")}>
                        Reload
                      </Button>
                    </VStack>
                  </Center>
                </VStack>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </Box>
        </>
      }
      {
        <Box
          // mt="50px"
          bg={bg1}
          as={Flex}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          pt="20px"
          w="100%"
        >
          {/* <Box
            // as={Center}
            // textAlign="center"
            // w={["100%", "80%", "80%"]}
            w="50%"
            maxW={"1205px"}
          >
            <Text
              h="full"
              w="full"
              textColor={textColor}
              fontWeight="bold"
              // textAlign="center"
              fontSize={["1.5rem", "2rem", "2rem"]}
            >
              NFC Subscription
            </Text>
          </Box> */}
          {isLoadingNFC ? (
            <VStack w="95%" mt="10px" maxW={"1205px"} spacing="15px">
              <Box
                role="group"
                borderRadius={"30px"}
                w="80%"
                boxShadow="8px 8px 35px 0px #0000001A"

                // bgColor={bg}
              >
                <VStack
                  as={Flex}
                  justifyContent="space-evenly"
                  h="300px"
                  p="20px"
                  align="start"
                  flexDirection="column"
                >
                  <Skeleton h="40px" w="30%" />
                  <HStack w="full">
                    <VStack w="20%" alignItems="flex-start">
                      <Skeleton h="20px" w="full" />
                      <Skeleton h="20px" w="full" />
                      <Skeleton h="20px" w="full" />
                      <Skeleton h="20px" w="full" />
                      <Skeleton h="20px" w="full" />
                    </VStack>
                    <VStack pl="10px" w="20%" alignItems="flex-start">
                      <Skeleton h="20px" w="full" />
                      <Skeleton h="20px" w="full" />
                      <Skeleton h="20px" w="full" />
                      <Skeleton h="20px" w="full" />
                      <Skeleton h="20px" w="full" />
                    </VStack>
                  </HStack>
                  <HStack w="full" spacing="40px" mt="20px" mb="30px" h="30px">
                    <Skeleton h="full" w="25%" />
                  </HStack>
                </VStack>
              </Box>
            </VStack>
          ) : Object.keys(NFCdata).length != 0 ? (
            statusNFC == "Active" ? (
              <VStack
                w={["100%", "95%", "95%"]}
                mt="10px"
                maxW={"1205px"}
                spacing="15px"
              >
                <Box
                  bg={bg}
                  color={textColor}
                  role="group"
                  borderRadius={"30px"}
                  w={["95%%", "95%", "80%"]}
                  boxShadow="8px 8px 35px 0px #0000001A"

                  // bgColor={bg}
                >
                  <VStack
                    as={Flex}
                    justifyContent="space-evenly"
                    h={["350px", "350px", "350px"]}
                    p="20px"
                    align="start"
                    flexDirection="column"
                  >
                    <Text
                      fontWeight="extrabold"
                      fontSize={["1.5rem", "1.5rem", "2rem"]}
                    >
                      Subscription
                    </Text>
                    <HStack>
                      <VStack alignItems="flex-start">
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          Plan
                        </Text>
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          Account email
                        </Text>
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          Current status
                        </Text>
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          Subscription Start
                        </Text>
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          Renewal Date
                        </Text>
                      </VStack>
                      <VStack pl="10px" alignItems="flex-start">
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          : NFC Premium
                        </Text>
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          {session && `:  ${session.user.email}`}
                        </Text>
                        <Text
                          fontWeight="bold"
                          textColor="green"
                          fontSize={[".8rem", ".8rem", "1.1rem"]}
                        >
                          : Active
                        </Text>
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          {`:  ${new Date(
                            NFCdata.current_start * 1000
                          ).toDateString()}`}
                        </Text>
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          {`:  ${new Date(
                            NFCdata.current_end * 1000
                          ).toDateString()}`}
                        </Text>
                      </VStack>
                    </HStack>

                    <Flex
                      w={["100%", "100%", "60%"]}
                      justifyContent={
                        NFCdata.cancelAtNextBillingNFC
                          ? "flex-start"
                          : "space-evenly"
                      }
                      // border="2px solid red"
                      flexDirection={["column", "column", "row"]}
                      // spacing="40px"
                      mt="20px"
                      // h="300px"
                      mb={["10px", "10px", "30px"]}
                      h={["150px", "150px", "40px"]}
                    >
                      <Button
                        isLoading={spinner}
                        onClick={() => handleClickNFC(false)}
                        _hover={{
                          bg: "red",
                        }}
                        _active={{
                          bg: "red",
                        }}
                        fontSize={[".8rem", ".8rem", "1.1rem"]}
                        h="40px"
                        bg="red.400"
                      >
                        Cancel immediately
                      </Button>
                      {NFCdata.cancelAtNextBillingNFC ? null : (
                        <Button
                          isLoading={spinner}
                          onClick={() => handleClickNFC(true)}
                          _hover={{
                            bg: "red",
                          }}
                          _active={{
                            bg: "red",
                          }}
                          fontSize={[".8rem", ".8rem", "1.1rem"]}
                          h="40px"
                          bg="red.400"
                        >
                          Cancel at renewal date
                        </Button>
                      )}
                    </Flex>
                    {NFCdata.cancelAtNextBillingNFC ? (
                      <Text
                        fontWeight="bold"
                        textColor="red.300"
                        fontSize="12px"
                      >
                        Subscription will be cancelled at the end of the current
                        billing period
                      </Text>
                    ) : (
                      ""
                    )}
                  </VStack>
                </Box>
              </VStack>
            ) : statusNFC == "Created" ? (
              <VStack
                w={["100%", "95%", "95%"]}
                mt="10px"
                maxW={"1205px"}
                spacing="15px"
              >
                <Center
                  color={textColor}
                  bg={bg}
                  p="20px"
                  role="group"
                  h={["300px", "350px", "350px"]}
                  borderRadius={"30px"}
                  w={["95%%", "95%", "80%"]}
                  boxShadow="8px 8px 35px 0px #0000001A"

                  // bgColor={bg}
                >
                  <VStack>
                    <Text
                      fontWeight="extrabold"
                      fontSize={["1.5rem", "1.5rem", "2rem"]}
                    >
                      No Subscription Found
                    </Text>
                    <Button onClick={() => Router.push("/pricing")}>
                      Buy Now
                    </Button>
                    <Button onClick={() => Router.reload("/subscription")}>
                      Reload
                    </Button>
                  </VStack>
                </Center>
              </VStack>
            ) : statusNFC == "Cancelled" ? (
              <VStack
                w={["100%", "95%", "95%"]}
                mt="10px"
                maxW={"1205px"}
                spacing="15px"
              >
                <Box
                  bg={bg}
                  color={textColor}
                  role="group"
                  borderRadius={"30px"}
                  w={["95%%", "95%", "80%"]}
                  boxShadow="8px 8px 35px 0px #0000001A"

                  // bgColor={bg}
                >
                  <VStack
                    as={Flex}
                    justifyContent="space-evenly"
                    h={["300px", "350px", "350px"]}
                    p="20px"
                    align="start"
                    flexDirection="column"
                  >
                    <Text
                      fontWeight="extrabold"
                      fontSize={["1.5rem", "1.5rem", "2rem"]}
                    >
                      Subscription
                    </Text>
                    <HStack>
                      <VStack alignItems="flex-start">
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          Plan
                        </Text>
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          Account email
                        </Text>
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          Current status
                        </Text>
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          Subscription Start
                        </Text>
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          Ended At
                        </Text>
                      </VStack>
                      <VStack pl="10px" alignItems="flex-start">
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          : NFC Premium
                        </Text>
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          {session && `:  ${session.user.email}`}
                        </Text>
                        <Text
                          fontWeight="bold"
                          textColor="red"
                          fontSize={[".8rem", ".8rem", "1.1rem"]}
                        >
                          : Cancelled
                        </Text>
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          {`:  ${new Date(
                            NFCdata.current_start * 1000
                          ).toDateString()}`}
                        </Text>
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          {`:  ${new Date(
                            NFCdata.ended_at * 1000
                          ).toDateString()}`}
                        </Text>
                      </VStack>
                    </HStack>

                    <HStack
                      spacing="40px"
                      mt="20px"
                      mb={["10px", "10px", "30px"]}
                      h={["20px", "20px", "40px"]}
                    >
                      <Button onClick={() => Router.push("/pricing")}>
                        Buy Now
                      </Button>
                    </HStack>
                  </VStack>
                </Box>
              </VStack>
            ) : statusNFC == "Expired" ? (
              <VStack
                w={["100%", "95%", "95%"]}
                mt="10px"
                maxW={"1205px"}
                spacing="15px"
              >
                <Box
                  bg={bg}
                  color={textColor}
                  role="group"
                  borderRadius={"30px"}
                  w={["95%%", "95%", "80%"]}
                  boxShadow="8px 8px 35px 0px #0000001A"

                  // bgColor={bg}
                >
                  <VStack
                    as={Flex}
                    justifyContent="space-evenly"
                    h={["300px", "350px", "350px"]}
                    p="20px"
                    align="start"
                    flexDirection="column"
                  >
                    <Text
                      fontWeight="extrabold"
                      fontSize={["1.5rem", "1.5rem", "2rem"]}
                    >
                      Subscription
                    </Text>
                    <HStack>
                      <VStack alignItems="flex-start">
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          Plan
                        </Text>
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          Account email
                        </Text>
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          Current status
                        </Text>
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          Subscription Start
                        </Text>
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          Ended At
                        </Text>
                      </VStack>
                      <VStack pl="10px" alignItems="flex-start">
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          : NFC Premium
                        </Text>
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          {`:  ${session && session.user.email}`}
                        </Text>
                        <Text
                          fontWeight="bold"
                          textColor="red"
                          fontSize={[".8rem", ".8rem", "1.1rem"]}
                        >
                          : Expired
                        </Text>
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          {`:  ${new Date(
                            NFCdata.current_start * 1000
                          ).toDateString()}`}
                        </Text>
                        <Text fontSize={[".8rem", ".8rem", "1.1rem"]}>
                          {`:  ${new Date(
                            NFCdata.ended_at * 1000
                          ).toDateString()}`}
                        </Text>
                      </VStack>
                    </HStack>

                    <HStack
                      spacing="40px"
                      mt="20px"
                      mb={["10px", "10px", "30px"]}
                      h={["20px", "20px", "40px"]}
                    >
                      <Button onClick={() => Router.push("/pricing")}>
                        Buy Now
                      </Button>
                    </HStack>
                  </VStack>
                </Box>
              </VStack>
            ) : statusNFC == "No Subscription Found" ? (
              <VStack
                w={["100%", "95%", "95%"]}
                mt="10px"
                maxW={"1205px"}
                spacing="15px"
              >
                <Center
                  color={textColor}
                  bg={bg}
                  p="20px"
                  role="group"
                  h={["300px", "350px", "350px"]}
                  borderRadius={"30px"}
                  w={["95%%", "95%", "80%"]}
                  boxShadow="8px 8px 35px 0px #0000001A"

                  // bgColor={bg}
                >
                  <VStack>
                    <Text
                      fontWeight="extrabold"
                      fontSize={["1.5rem", "1.5rem", "2rem"]}
                    >
                      No NFC Subscription Found
                    </Text>
                    {/* <Button onClick={() => Router.push("/pricing")}>
                      Buy Now
                    </Button> */}
                  </VStack>
                </Center>
              </VStack>
            ) : statusNFC == "Something Went Wrong" ? (
              "Something Went Wrong"
            ) : statusNFC == "authenticated" ? (
              <VStack
                w={["100%", "95%", "95%"]}
                mt="10px"
                maxW={"1205px"}
                spacing="15px"
              >
                <Center
                  color={textColor}
                  bg={bg}
                  p="20px"
                  role="group"
                  h={["300px", "350px", "350px"]}
                  borderRadius={"30px"}
                  w={["95%%", "95%", "80%"]}
                  boxShadow="8px 8px 35px 0px #0000001A"

                  // bgColor={bg}
                >
                  <VStack>
                    <Text
                      fontWeight="extrabold"
                      fontSize={["1.5rem", "1.5rem", "2rem"]}
                    >
                      Loading Please Reload
                    </Text>
                    <Button onClick={() => Router.push("/pricing")}>
                      Buy Now
                    </Button>
                    <Button onClick={() => Router.reload("/subscription")}>
                      Reload
                    </Button>
                  </VStack>
                </Center>
              </VStack>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </Box>
      }
    </Box>
  );
}
