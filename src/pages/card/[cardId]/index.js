import { useSession } from "next-auth/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
  Container,
  Flex,
  Spacer,
  Center,
  Skeleton,
  HStack,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import dbConnect from "../../../lib/dbConnect";
import EditCard from "../../../components/EditCard";
import EditCardFree from "../../../components/EditCardFree";
import { default as ModalCard } from "../../../models/Card";
import { DigitalCard } from "../../../components/Card/DigitalCard";
import { DigitalCardFree } from "../../../components/Card/DigitalCardFree";
import {
  AttachmentIcon,
  DeleteIcon,
  EditIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { useEffect, useState } from "react";

const Cards = ({ Card }) => {
  const [Loading, setLoading] = useState(false);
  const [isNFC, setisNFC] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { data: session, status } = useSession();
  const contentType = "application/json";

  const toast = useToast();
  console.log("isNFC", isNFC);
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

  function updateViews(params) {
    const views = params + 1;
    return views;
  }
  const bg = useColorModeValue("black", "white");

  async function updateviewsDB(params) {
    const values = {
      _id: Card?._id,
      views: params,
    };
    const response = await fetch("/api/cards", {
      method: "PUT",
      headers: {
        Accept: contentType,
        "Content-Type": contentType,
      },
      body: JSON.stringify(values),
    });
    const responseData = await response.json();
  }

  useEffect(() => {
    setIsFetching(true);

    async function fetchAPINFC() {
      const res = await fetch("/api/auth/getnfccard", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify({ card_id: Card?.card_id }),
      });
      const data = await res.json();

      console.log("dasttttttttttttttaa", data?.isNFC_Card_Selected?.isSelected);
      if (res.status === 200) {
        if (data?.isNFC_Card_Selected?.isSelected === undefined) {
          setisNFC(true);
        }
        if (data?.isNFC_Card_Selected?.isSelected === false) {
          setisNFC(false);
        }
        if (data?.isNFC_Card_Selected?.isSelected === true) {
          setisNFC(true);
        }

        setIsPremium(true);
        console.log("NFC Yes");
      }
      if (res.status === 400) {
        setIsPremium(false);
        console.log("Not NFC");
      }
      if (res.status === 500) {
        setIsPremium(false);
        console.log("Error");
      }
    }

    async function fetchAPI() {
      const res = await fetch("/api/auth/getpremimumcard", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify({ card_id: Card?.card_id }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setIsPremium(true);
        console.log("Premium Yes");
      }
      if (res.status === 400) {
        // setIsPremium(false);
        console.log("Not Premium");
        fetchAPINFC().then(() => setIsFetching(false));
      }
      if (res.status === 500) {
        console.log("Error");
        fetchAPINFC().then(() => setIsFetching(false));
      }
    }
    // fetchAPINFC().then(() => setIsFetching(false));

    fetchAPI().then(() => setIsFetching(false));

    if ((Card && Card?.name === "") || !Card) {
      router.replace("/");
    }
    const updatedViews = updateViews(Card && Card.views);
    updateviewsDB(updatedViews);
  }, []);

  const scolor = useColorModeValue("black", "white");

  const handleDelete = async () => {
    const cardId = router.query.cardId;
    try {
      await fetch(`/api/cards/${cardId}`, {
        method: "DELETE",
      });
      router.replace("/cards");
    } catch (error) {
      setMessage("Failed to delete the Card.");
    }
  };

  async function handleNFCAssgin() {
    setLoading(true);

    const res = await fetch("/api/cards/assignnfc", {
      method: "POST",
      headers: {
        Accept: contentType,
        "Content-Type": contentType,
      },
      body: JSON.stringify({
        isSelected: true,
        card_id: Card?.card_id,
        _id: Card?._id,
      }),
    });

    const data = await res.json();
    if (res.status === 200) {
      setLoading(false);
      Toast("Success", "Card is now NFC", "success");
      return Router.replace("/cards");
    }
    if (res.status === 400) {
      setLoading(false);
      Toast("Error", "Card is already NFC", "error");
    }
    if (res.status === 500) {
      setLoading(false);
      Toast("Error", "Error", "error");
    }
  }
  return (
    <>
      <Head>
        <title>{Card?.name != "" ? `${Card?.name}'s card` : "None Card"}</title>
      </Head>
      <>
        {Card?.name != "CastError" ? (
          Card && Card ? (
            isFetching ? (
              <>
                <Container maxWidth="90%" h="100vh">
                  <Center h="100px" mt="30px" w="100%">
                    <Flex w="100%" justifyContent="space-around">
                      <Skeleton w="20%" height="40px" />
                      <Spacer />
                      <Spacer />
                      <Spacer />
                      <Spacer />
                      <Skeleton w="10%" height="40px" />
                      <Spacer />
                      <Skeleton w="10%" height="40px" />
                      <Spacer />
                      <Skeleton w="10%" height="40px" />
                    </Flex>
                  </Center>

                  <HStack as={Center} w="100%" h="80%">
                    <Box h="full" w="50%">
                      <Box boxSize="200px" mt="50px">
                        <Skeleton borderRadius="10px" w="100%" height="100%" />
                      </Box>
                      <Skeleton mt="100px" w="300px" h="40px" />
                    </Box>
                    <Box as={Center} h="full" w="50%">
                      <VStack w="100%">
                        <Skeleton w="70%" h="100px" mb="50px" />
                        <Skeleton w="70%" h="100px" />
                      </VStack>
                    </Box>
                  </HStack>
                </Container>
              </>
            ) : isPremium && isPremium ? (
              <DigitalCard data={Card} />
            ) : (
              <DigitalCardFree data={Card} />
            )
          ) : (
            <Box
              w="100%"
              h="100%"
              bg="gray.100"
              borderRadius="md"
              border="1px solid"
              borderColor="gray.200"
              p="4"
              textAlign="center"
            >
              <Box
                w="100%"
                fontSize="xl"
                fontWeight="semibold"
                color="gray.600"
              >
                No Card
              </Box>
            </Box>
          )
        ) : (
          "ERROR"
        )}

        {session && session.user.id == Card.card_id ? (
          <Box
            pos="absolute"
            right={["10px", "25px", "50px"]}
            top={["60px", "50px", "60px"]}
          >
            <Drawer
              size="md"
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton color={scolor} />

                <DrawerHeader color={bg}>{`${Card.name}'s card`}</DrawerHeader>
                <DrawerBody>
                  {isPremium && isPremium ? (
                    <EditCard inputData={Card} />
                  ) : (
                    <EditCardFree inputData={Card} />
                  )}
                </DrawerBody>
                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

            <Menu isLazy={true} computePositionOnMount={true}>
              {isFetching ? (
                <>
                  <Skeleton border="2px solid red" w="30px" h="30px" />
                </>
              ) : (
                <MenuButton
                  as={IconButton}
                  size="sm"
                  variant="ghost"
                  border="2px solid #77C307"
                  icon={<HamburgerIcon />}
                />
              )}

              <MenuList bgColor={"brand.100"} color="white" w="20px">
                <MenuItem onClick={handleDelete} icon={<DeleteIcon />}>
                  Delete
                </MenuItem>
                <MenuItem onClick={onOpen} icon={<EditIcon />}>
                  Edit
                </MenuItem>
                {isNFC}
                {isNFC == false ? (
                  <MenuItem onClick={handleNFCAssgin} icon={<AttachmentIcon />}>
                    Assign to NFC Card
                  </MenuItem>
                ) : (
                  ""
                )}
              </MenuList>
            </Menu>
          </Box>
        ) : (
          ""
        )}
      </>
    </>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();
  const cards = await ModalCard.findById(params.cardId).then(
    (card) => card,
    (error) => error
  );

  // cards && cards ? (cards._id = cards?._id.toString()) : null;

  return {
    props: {
      Card: JSON.parse(JSON.stringify(cards && cards ? cards : null)),
    },
  };
}

export default Cards;
