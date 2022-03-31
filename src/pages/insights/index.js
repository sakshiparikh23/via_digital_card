import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  HStack,
  useColorMode,
  useColorModeValue,
  VStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  MenuItem,
  MenuList,
  MenuButton,
  Menu,
  Spacer,
  Container,
  Image,
  Button,
  Text,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { signOut } from "next-auth/react";
import NextLink from "next/link";
import { DarkModeSwitch } from "../../components/DarkModeSwitch";

export default function Insights() {
  const [selectedData, setSelectedData] = useState({});

  console.log(selectedData);
  const [insightsData, setInsightsData] = useState({});
  const [sevenDays, setSevenDays] = useState([]);
  const [yesterday, setYesterday] = useState([]);
  const [today, setToday] = useState([]);
  const [oneMonth, setOneMonth] = useState([]);
  const [oneYear, setOneYear] = useState([]);

  const [Color, setColor] = useState("");
  const bgColor = useColorModeValue("black.200", "white");
  const iconBg = useColorModeValue("greenBrand.100", "white");
  const textHover = useColorModeValue("white", "greenBrand.100");
  const textHoverMobile = useColorModeValue("greenBrand.100", "white");
  const bg = useColorModeValue("white", "black.100");
  // const textColor = useColorModeValue("black", "white");

  const router = useRouter();
  const logo = useColorModeValue(
    "https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Logo.png",
    "https://file-upload-via-digital.s3.ap-south-1.amazonaws.com/assets/Logo+Dark.png"
  );
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/cards/getinsights");
      const data = await res.json();
      console.log(data);
      const { insights, oneMonth, oneYear, sevenDay, yesterday, today } = data;

      setInsightsData(insights);
      setSevenDays(sevenDay);
      setYesterday(yesterday);
      setToday(today);
      setOneMonth(oneMonth);
      setOneYear(oneYear);
      setSelectedData(today);
    }
    fetchData();

    return () => {};
  }, []);
  // console.log(insightsData?.instagram);
  console.log(sevenDays);
  console.log(yesterday);
  console.log(today);
  console.log(oneMonth);
  console.log(oneYear);

  const textColor = useColorModeValue("gray.800", "white");

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
    {
      value: today,
      label: "Today",
    },
    {
      value: yesterday,
      label: "Yesterday",
    },
    {
      value: sevenDays,
      label: "Last 7 days",
    },
    {
      value: oneMonth,
      label: "Last 30 days",
    },
    {
      value: oneYear,
      label: "Last year",
    },
    {
      value: insightsData,
      label: "All Time",
    },
  ];

  return (
    <>
      <DarkModeSwitch />
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
              <HStack p="0px 20px 0px 20px" h="40px">
                {/* <Avatar boxSize="35px" /> */}

                <Text
                  onClick={() => router.push("/cards")}
                  cursor="pointer"
                  fontWeight="bold"
                >
                  My Cards
                </Text>
              </HStack>
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
                  <MenuItem
                    fontWeight="bold"
                    onClick={() => router.push("/cards")}
                    as={Center}
                  >
                    My Cards
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
      <Box bg={bg} textColor={textColor} pt="50px" w="100%" h="100vh">
        <Center>
          <Box as={Center} w={["80%", "50%", "50%"]}>
            <Select
              onChange={(e) => {
                setSelectedData(e.value);
              }}
              styles={colorMode === "dark" ? customStyles : customStylesLight}
              options={options}
              defaultValue={options[0]}
              isSearchable={false}
              hideSelectedOptions={false}
              placeholder={"Select a time period"}
              className="react-select"
              classNamePrefix={select}
            />
          </Box>
        </Center>
        <Center pt="20px">
          <Box as={Center} w="100%">
            <TableContainer mt="10px" w={["100%", "100%", "50%"]}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Items</Th>
                    <Th textAlign="center">Number of Clicks</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Instagram</Td>
                    <Td textAlign="center">{selectedData?.insta?.length}</Td>
                  </Tr>
                  <Tr>
                    <Td>Twitter</Td>
                    <Td textAlign="center">{selectedData?.twitter?.length}</Td>
                  </Tr>
                  <Tr>
                    <Td>Facebook</Td>
                    <Td textAlign="center">{selectedData?.facebook?.length}</Td>
                  </Tr>

                  <Tr>
                    <Td>LinkedIn</Td>
                    <Td textAlign="center">{selectedData?.linkedin?.length}</Td>
                  </Tr>

                  <Tr>
                    <Td>Website</Td>
                    <Td textAlign="center">{selectedData?.website?.length}</Td>
                  </Tr>

                  <Tr>
                    <Td>Email</Td>
                    <Td textAlign="center">{selectedData?.email?.length}</Td>
                  </Tr>

                  <Tr>
                    <Td>Google</Td>
                    <Td textAlign="center">{selectedData?.google?.length}</Td>
                  </Tr>

                  <Tr>
                    <Td>Document</Td>
                    <Td textAlign="center">{selectedData?.document?.length}</Td>
                  </Tr>

                  <Tr>
                    <Td>Contact Button</Td>
                    <Td textAlign="center">{selectedData?.vcf?.length}</Td>
                  </Tr>

                  <Tr>
                    <Td>Location</Td>
                    <Td textAlign="center">{selectedData?.location?.length}</Td>
                  </Tr>
                  <Tr>
                    <Td>Payment Attemps</Td>
                    <Td textAlign="center">{selectedData?.payment?.length}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Center>
      </Box>
    </>
  );
}
