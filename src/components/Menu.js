import {
  Menu,
  Button,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

import React from "react";

export default function MenuTop() {
  const { data: session } = useSession();
  const bgColor = useColorModeValue("black.200", "white");
  const bg = useColorModeValue("white", "black.100");
  const iconBg = useColorModeValue("greenBrand.100", "white");
  const textHover = useColorModeValue("white", "greenBrand.100");
  const textHoverMobile = useColorModeValue("greenBrand.100", "white");
  const textColor = useColorModeValue("black", "white");
  return (
    <>
      <Menu isLazy={true} computePositionOnMount={true}>
        <MenuButton as={IconButton} icon={<HamburgerIcon />} />
        <MenuList color={bg} w="20px">
          <MenuItem>
            <NextLink href="/create" passHref>
              <Button
                ml={4}
                variant={"outline"}
                borderColor="greenBrand.100"
                color="black"
              >
                Create New Card +
              </Button>
            </NextLink>
          </MenuItem>
          {session && (
            <MenuItem onClick={signOut} as={Center} color="black">
              Sign Out
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </>
  );
}
