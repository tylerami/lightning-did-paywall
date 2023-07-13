/* eslint-disable react-hooks/exhaustive-deps */
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
import React, { useEffect, useState } from "react";
import lightningLogo from "../assets/lightningLogo.png";
import {
  createInvoice,
  verifyInvoiceAndRegisterIfPaid,
} from "../util/lightningInvoiceService";
import QRCode from "qrcode.react";
import theme from "../theme";

const ContentPaywall = ({ metadata, refreshContent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [invoice, setInvoice] = useState(null);

  // timer to poll if invoice is paid
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    async function pollInvoice() {
      if (!invoice) return;
      console.log("polling invoice: ", invoice);
      console.log('metadata', metadata);
      const isPaid = await verifyInvoiceAndRegisterIfPaid({
        invoice,
        metadataId: metadata.id,
        authorDid: metadata.did,
      });
      console.log("isPaid: ", isPaid);
      if (isPaid) {
        onClose();
        setInvoice(null);
        refreshContent();
      }
    }

    const intervalId = setInterval(() => {
      pollInvoice();
      setTimer((timer) => timer + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [invoice]);

  async function handleCreateInvoice() {
    if (!metadata?.paywall) return;
      console.log('metadata?.paywall', metadata?.paywall);
      console.log(metadata, 'metadata');
    const invoice = await createInvoice(metadata?.paywall);
    if (!invoice) return;

    setInvoice(invoice);
    onOpen();
  }
  const styles = theme.styles.global;

  return (
    // <Flex padding="2em" borderRadius="0.2em" width="100%" direction={"column"}>
    //   <Heading size="xl" textDecoration={"underline"}>
    //     This is paid content
    //   </Heading>
    //   <Box height="2em"></Box>

    //   <Modal size="xl" isOpen={isOpen} onClose={onClose}>
    //     <ModalOverlay width="150em" />
    //     <ModalContent
    //       width="150em"
    //       background={"black"}
    //       border="solid 1.5px #fff"
    //       borderRadius="0"
    //       boxShadow="1px 1px 0px 0px #FFFFFF, 2px 2px 0px 0px #FFFFFF, 3px 3px 0px 0px #FFFFFF, 4px 4px 0px 0px #FFFFFF, 5px 5px 0px 0px #FFFFFF"
    //     >
    //       <ModalHeader>Lightning Invoice</ModalHeader>
    //       <ModalCloseButton />
    //       <ModalBody p="5em" display={"flex"} justifyContent={"center"}>
    //         {invoice?.paymentRequest ? (
    //           <QRCode size={"300"} value={invoice?.paymentRequest} />
    //         ) : null}
    //       </ModalBody>
    //     </ModalContent>
    //   </Modal>

    //   <Flex direction={"row"}>
    //     <Heading
    //       w={"20em"}
    //       _hover={{ cursor: "pointer", filter: "brightness(140%)" }}
    //       fontWeight={500}
    //       color={styles.brand.cyan}
    //       size="lg"
    //     >
    //       {`Price: ${metadata?.paywall?.satsAmount ?? "?"} sats`}
    //     </Heading>
    //     <Button
    //       variant="primary"
    //       onClick={handleCreateInvoice}
    //       leftIcon={
    //         <Image
    //           mr="0.2em"
    //           filter={"brightness(0%);"}
    //           height={"1em"}
    //           src={lightningLogo}
    //         />
    //       }
    //       size="lg"
    //       w="100%"
    //       alignSelf={"center"}
    //     >
    //       Unlock Now
    //     </Button>
    //   </Flex>
    // </Flex>
    <Flex textAlign={"center"} justifyContent={"center"} flexDirection={"column"}>
      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay width="150em" />
        <ModalContent
          width="150em"
          background={"black"}
          border="solid 1.5px #fff"
          borderRadius="0"
          boxShadow="1px 1px 0px 0px #FFFFFF, 2px 2px 0px 0px #FFFFFF, 3px 3px 0px 0px #FFFFFF, 4px 4px 0px 0px #FFFFFF, 5px 5px 0px 0px #FFFFFF"
        >
          <ModalHeader>Lightning Invoice</ModalHeader>
          <ModalCloseButton />
          <ModalBody p="5em" display={"flex"} justifyContent={"center"}>
            {invoice?.paymentRequest ? (
              <QRCode size={"300"} value={invoice?.paymentRequest} />
            ) : null}
          </ModalBody>
        </ModalContent>
      </Modal>
    <Heading
          _hover={{ cursor: "pointer", filter: "brightness(140%)" }}
          fontWeight={600}
          color={styles.brand.yellow}
          size="lg"
        >
          {"Pay to unlock this content"}
        </Heading>
        <Heading
          _hover={{ cursor: "pointer", filter: "brightness(140%)" }}
          color={styles.brand.cyan}
          size="md"
          m="1em 0"
        >
          {`Price: ? sats`}
        </Heading>
        <Button
          variant="primary"

          size="lg"
          w="max-content"
          alignSelf={"center"}
        >
         Unlock Now
        </Button>
      </Flex>
  );
};

export default ContentPaywall;
