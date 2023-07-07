import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import lightningLogo from "../assets/lightningLogo.png";
import { createInvoice, verifiyInvoice } from "../util/lightningInvoiceService";
import QRCode from "qrcode.react";

const ContentPaywall = ({ priceInSats }) => {
  if (!priceInSats) priceInSats = 500;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [invoice, setInvoice] = useState(null);

  const [paymentReceived, setpaymentReceived] = useState("")

  async function handleCreateInvoice() { 
    const invoice = await createInvoice(priceInSats);
    if (!invoice) return;
    setInvoice(invoice);
    onOpen();
  }

  return (
    <Flex
      padding="2em"
      borderRadius="0.2em"
      border="0.5px solid #444"
      width="100%"
      direction={"column"}
    >
      <Heading size="lg" textDecoration={"underline"}>
        This is paid content
      </Heading>
      <Box height="2em"></Box>


      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay  width="200em"/>
        <ModalContent width="200em" background={"black"}>
          <ModalHeader>Lightning Invoice</ModalHeader>
          <ModalCloseButton />
          <ModalBody p="5em" display={"flex"} justifyContent={"center"}>
            {invoice?.paymentRequest ? 
           <QRCode size={"300"} value={invoice?.paymentRequest} /> : null}
          </ModalBody>
          <ModalFooter display={"flex"} flexDirection={"column"} justifyContent={"center"}>
            <Button mb="2em" size='lg' colorScheme="twitter" mr={3} onClick={ async() => {
              if (await verifiyInvoice(invoice)) { 
                setpaymentReceived("Payment Received");
              } else {
                setpaymentReceived("Payment Failed");
              }
            }}>
              Verify
            </Button>
               <Heading>{paymentReceived}</Heading>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex direction={"row"}>
        <Heading
          w={"20em"}
          _hover={{ cursor: "pointer", filter: "brightness(140%)" }}
          fontWeight={500}
          color="#23E5F1"
          size="2xl"
        >
          {`Price: ${priceInSats} sats`}
        </Heading>
        <Button
        onClick={handleCreateInvoice}
          leftIcon={
            <Image
              mr="0.2em"
              filter={"brightness(0%);"}
              height={"1em"}
              src={lightningLogo}
            />
          }
          size="lg"
          w="100%"
          _hover={{ textDecoration: "underline", filter: "brightness(120%);" }}
          fontSize="2em"
          background="#FFEC19"
          alignSelf={"center"}
        >
          Unlock Now
        </Button>
      </Flex>
    </Flex>
  );
};

export default ContentPaywall;
