import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Text,
  Image,
  useColorModeValue,
  Link,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center,
  IconButton,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import NextLink from "next/link";
import { HamburgerIcon } from "@chakra-ui/icons";
import { signOut, useSession } from "next-auth/react";

export const Navbar = () => {
  const { data: session } = useSession();
  const bg = useColorModeValue("white", "black.100");
  const router = useRouter();

  const logo = useColorModeValue(
    "https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Logo.png",
    "https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Logo+Dark.png"
  );
  const textColor = useColorModeValue("black", "white");
  const [openNavbar, setOpenNavbar] = useState(false);
  const bgColor = useColorModeValue("white", "black.200");

  return (
    <Box bgColor={bgColor} pt="60px" pos="relative">
      <Flex
        p={{ base: "0  20px", xs: "0px 50px" }}
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Box flexShrink={"0"}>
          <NextLink href="/" passHref>
            <Link>
              <Image src={logo} />
            </Link>
          </NextLink>
        </Box>
        <Box
          zIndex={openNavbar ? "0" : "5"}
          fontSize={"2rem"}
          display={{ base: "block", lg: "none" }}
          onClick={() => setOpenNavbar(true)}
          color={textColor}
        >
          <BiMenu />
        </Box>
        <Flex
          pos={{ base: "absolute", lg: "static" }}
          top="0"
          right="0"
          bgColor={useColorModeValue("white", "black.200")}
          w={{ base: "100%", xs: "300px", lg: "100%" }}
          h={{ base: "100vh", lg: "max-content" }}
          opacity={{ base: openNavbar ? "100%" : "0", lg: "100%" }}
          flexDir={{ base: "column", lg: "row" }}
          alignItems={{ base: "flex-start", lg: "center" }}
          justifyContent={{ base: "center", lg: "flex-end" }}
          fontSize="1.125rem"
          color={textColor}
          // transition="all 0.5s ease"
          minH={{ base: "500px", lg: "0" }}
          pl={{ base: "40px", lg: "0" }}
          fontWeight="500"
          zIndex={3}
        >
          <Flex
            d="flex"
            w="100%"
            mb="40px"
            justifyContent={"flex-end"}
            color={textColor}
            display={{ lg: "none" }}
          >
            <Box
              w="max-content"
              onClick={() => setOpenNavbar(false)}
              mr="40px"
              fontSize={"2rem"}
            >
              <MdClose />
            </Box>
          </Flex>
          <Link
            p="5px"
            m={{ base: "10px 0px", lg: "0px 20px" }}
            _hover={{ textDecoration: "none" }}
            _focus={{ borderBottom: "2px solid #77C208" }}
            _active={{ borderBottom: "2px solid #77C208" }}
            href="#"
          >
            Home
          </Link>
          <Link
            p="5px"
            m={{ base: "10px 0px", lg: "0px 20px" }}
            _hover={{ textDecoration: "none" }}
            _focus={{ borderBottom: "2px solid #77C208" }}
            _active={{ borderBottom: "2px solid #77C208" }}
            href="#howitworks"
          >
            How it works?
          </Link>
          <Link
            p="5px"
            m={{ base: "10px 0px", lg: "0px 20px" }}
            _hover={{ textDecoration: "none" }}
            _focus={{ borderBottom: "2px solid #77C208" }}
            _active={{ borderBottom: "2px solid #77C208" }}
            href="#about"
          >
            About Us
          </Link>
          <Link
            p="5px"
            m={{ base: "10px 0px", lg: "0px 20px" }}
            _hover={{ textDecoration: "none" }}
            _focus={{ borderBottom: "2px solid #77C208" }}
            _active={{ borderBottom: "2px solid #77C208" }}
            href="#contact"
          >
            Contact Us
          </Link>
          <Link
            p="5px"
            m={{ base: "10px 0px", lg: "0px 20px" }}
            _hover={{ textDecoration: "none" }}
            _focus={{ borderBottom: "2px solid #77C208" }}
            _active={{ borderBottom: "2px solid #77C208" }}
            href="/pricing"
          >
            Pricing
          </Link>
        </Flex>
        <Box>
          {session ? (
            <Menu isLazy={true} computePositionOnMount={true}>
              <MenuButton
                as={Avatar}
                boxSize="40px"
                cursor="pointer"
                zIndex={15}
              />
              {/* <Avatar boxSize="40px" as={MenuButton} /> */}

              <MenuList color={textColor} w="20px" zIndex={15}>
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

                <MenuItem
                  cursor="pointer"
                  as={Center}
                  onClick={() => router.push("/cards")}
                >
                  My Cards
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
                <Button zIndex="10">Sign In</Button>
              </NextLink>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
};
