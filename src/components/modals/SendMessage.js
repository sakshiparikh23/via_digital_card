import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  useColorModeValue,
  Input,
  Textarea,
  Center,
  useToast,
} from "@chakra-ui/react";
export const SendMessage = ({ isOpen, onClose, card_id }) => {
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
  const [data, setData] = useState({});

  const [Loading, setLoading] = useState(false);
  const bgColor = useColorModeValue("white", "black.200");
  const buttonColor = useColorModeValue("black", "white");
  const border = useColorModeValue("black", "white");
  const textColor = useColorModeValue("white", "#747474");

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setData({
      ...data,
      [name]: value,
    });
  };
  console.log(data);
  async function handleSubmit(e) {
    setLoading(true);

    e.preventDefault();
    console.log(data);
    const res = await fetch("/api/cards/sendmessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, card_id }),
    });
    const json = await res.json();
    console.log(json);
    if (res.status === 201) {
      Toast("Success", "Your message has been sent", "success");
      setLoading(false);
      onClose();
    }
    if (res.status === 500) {
      Toast("Error", "Your message has not been sent", "error");
      setLoading(false);
    }
  }

  //get url id from url next js

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        m="auto"
        minW={["0px", "0px", "705px"]}
        borderRadius={"35px"}
        p="56px 0px"
        bgColor={bgColor}
      >
        {/* <ModalHeader>Modal Title</ModalHeader> */}
        <ModalCloseButton
          color={buttonColor}
          borderRadius="50%"
          right="35px"
          top="35px"
          border={`2px solid ${border}`}
        />
        <ModalBody w="100%" as={Center} color={textColor} flexDir="column">
          <form onSubmit={handleSubmit}>
            <VStack w="100%" spacing="20px">
              <Input
                onChange={(e) => handleChange(e)}
                w="272px"
                name="name"
                placeholder="Name"
                h="55px"
                type="text"
                required={true}
              />
              <Input
                onChange={(e) => handleChange(e)}
                w="272px"
                h="55px"
                type="email"
                name="email"
                placeholder="Email"
                required={true}
              />
              <Textarea
                onChange={(e) => handleChange(e)}
                borderColor={"#88E000"}
                placeholder="Type your message here"
                border="1px solid"
                w="272px"
                name="message"
                required={true}
              />
            </VStack>
            <Center>
              <Button
                isLoading={Loading}
                type="submit"
                mt="44px"
                borderRadius={"15px"}
                w="200px"
                h="32px"
              >
                Send a message
              </Button>
            </Center>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
