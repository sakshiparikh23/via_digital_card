import Head from "next/head";
import { getSession, signOut, useSession } from "next-auth/react";
import dbConnect from "../../lib/dbConnect";
import Card from "../../models/Card";
import { CardList } from "../../components/Card/CardList";
import { DarkModeSwitch } from "../../components/DarkModeSwitch";
import { useEffect } from "react";
import { useRouter } from "next/router";
// import useSWR from "swr";
import NextLink from "next/link";
import {
  VStack,
  Flex,
  Text,
  Button,
  Box,
  Center,
  Image,
  HStack,
  useColorModeValue,
  Link,
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  Container,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import MenuTop from "../../components/Menu";

const Usercard = ({ Cards }) => {
  const bgColor = useColorModeValue("black.200", "white");
  const iconBg = useColorModeValue("greenBrand.100", "white");
  const textHover = useColorModeValue("white", "greenBrand.100");
  const textHoverMobile = useColorModeValue("greenBrand.100", "white");
  const bg = useColorModeValue("white", "black.100");
  const textColor = useColorModeValue("black", "white");

  const router = useRouter();
  const logo = useColorModeValue(
    "https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Logo.png",
    "https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Logo+Dark.png"
  );
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Cards</title>
        <meta name="description" content="Card" />
      </Head>
      <>
        <Box bg={bg} textColor={textColor}>
          <Container bg={bg} maxW={["100%", "90%", "80%"]}>
            <Flex
              pt={["30px", "0px", "0px"]}
              as={Center}
              textColor={textColor}
              justifyContent="center"
              alignItems="center"
              h="120px"
              w="full"
              flexDirection="row"
            >
              <Box cursor="pointer">
                <NextLink href="/" passHref>
                  <Image src={logo} alt="" />
                </NextLink>
              </Box>
              <Spacer />
              <Box display={["none", "none", "flex"]}>
                {Cards && Cards.length ? (
                  <NextLink href="/create" passHref>
                    <Button
                      leftIcon={<AddIcon />}
                      ml={4}
                      variant={"outline"}
                      borderColor="greenBrand.100"
                      color={textColor}
                    >
                      Create New Card
                    </Button>
                  </NextLink>
                ) : (
                  " "
                )}

                <HStack p="0px 20px 0px 20px" h="40px">
                  {/* <Avatar boxSize="35px" /> */}

                  <Text onClick={signOut} cursor="pointer" fontWeight="bold">
                    Sign Out
                  </Text>
                </HStack>
              </Box>
              <Box display={["block", "block", "none"]}>
                <Menu isLazy={true} computePositionOnMount={true}>
                  <MenuButton as={IconButton} icon={<HamburgerIcon />} />
                  <MenuList>
                    <MenuItem
                      as={Button}
                      leftIcon={<AddIcon />}
                      variant={"outline"}
                      // h="90%"
                      // as={Center}
                      w="90%"
                      borderColor="greenBrand.100"
                      m="auto"
                    >
                      <NextLink href="/create" passHref>
                        Create New Card
                      </NextLink>
                    </MenuItem>
                    <MenuItem fontWeight="bold" onClick={signOut} as={Center}>
                      Sign Out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Flex>
          </Container>
        </Box>
        <DarkModeSwitch />
        <Box bg={bg} textColor={textColor} minH="100vh" h="full">
          {Cards && Cards.length ? (
            Cards.map((res, i) => <CardList key={i} data={res} />)
          ) : (
            <Box>
              <Center w="100%">
                <VStack
                  w="95% "
                  h="full"
                  mt="50px"
                  maxW={"1205px"}
                  spacing="15px"
                >
                  <Box
                    as={Center}
                    role="group"
                    borderRadius={"30px"}
                    w="100%"
                    boxShadow="8px 8px 35px 0px #0000001A"
                    _hover={{ bgColor: "greenBrand.100" }}
                    bgColor={bg}
                    height={"180px"}
                  >
                    <Flex
                      // as={Center}
                      flexDir={["column", "column", "row"]}
                      w="100%"
                      justifyContent={["center", "center", "space-between"]}
                      alignItems="center"
                      borderRadius={"30px"}
                      pr={["0px", "0px", "43px"]}
                    >
                      <Box
                        as={Center}
                        _groupHover={{ color: "white" }}
                        color={textColor}
                        ml={{ base: "10px", md: "45px" }}
                      >
                        <Text
                          textAlign="center"
                          fontWeight={"500"}
                          fontSize={{
                            base: "20px",
                            md: "1.25rem",
                            lg: "1.5rem",
                          }}
                        >
                          Looks like you have not created any cards yet.
                        </Text>
                      </Box>

                      <NextLink href="/create" passHref>
                        <Button
                          mt={["20px", "10px", "0px"]}
                          leftIcon={<AddIcon />}
                          ml={4}
                          variant={"outline"}
                          borderColor="greenBrand.100"
                          _groupHover={{ bg: bg, color: "greenBrand.100" }}
                          color={textColor}
                        >
                          Create New Card
                        </Button>
                      </NextLink>
                    </Flex>
                  </Box>
                </VStack>
              </Center>
            </Box>
          )}
        </Box>
      </>
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);

  await dbConnect();
  const cards = await Card.find({
    card_id: { $eq: session?.user?.id },
  }).exec();

  const data = JSON.parse(JSON.stringify(cards));

  return {
    props: {
      Cards: data,
    },
  };
}
export default Usercard;
