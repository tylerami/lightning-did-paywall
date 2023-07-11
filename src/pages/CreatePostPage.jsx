import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Switch,
  Textarea,
  Tooltip,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useClipboard,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { getDid, writeContent } from "../util/dwnService.js";
import { CopyIcon } from "@chakra-ui/icons";
import theme from "../theme.jsx";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");

  const [modalMessage, setModalMessage] = useState();

  const { hasCopied, onCopy } = useClipboard(getDid());

  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handlePublish() {
    if (await writeContent(title, subtitle, body)) {
      setModalMessage("Content published!");
      onOpen();
      setTitle("");
      setSubtitle("");
      setBody("");
    } else {
      setModalMessage("Error publishing content.");
      onOpen();
    }
  }

  const styles = theme.styles.global;

  return (
    <Flex
      alignSelf={"center"}
      maxWidth="80em"
      minWidth={"50em"}
      width="70vw"
      direction="column"
      padding={"2em"}
    >
      <Flex
        padding="3em"
        borderRadius="0.2em"
        border="0.5px solid #444"
        width="100%"
        direction={"column"}
      >
        <Heading size="2xl">Content Creator</Heading>
        <Box h="0.5em"></Box>
      
        <Flex alignItems={"center"}>
          
          <Input
            value={getDid().split("-").at(0)}
            color={styles.brand.cyan}
            width="100%"
            size="lg"
            border="1px solid #525252"
            _focus={{ borderColor: styles.brand.cyan }}
            readOnly
          />
          <Box w="0.5em"></Box>
          <Tooltip
            label={hasCopied ? "Copied" : "Copy to clipboard"}
            placement="top"
          >
            <IconButton
              colorScheme="ghost"
              icon={<CopyIcon />}
              onClick={onCopy}
              aria-label={hasCopied ? "Copied" : "Copy to clipboard"}
            />
          </Tooltip>
        </Flex>

        <Box h="2em"></Box>
        <Input
          value={title}
          p="2rem"
          fontSize={"2em"}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title..."
          fontFamily={"IBM Plex Mono"}
          _focus={{ borderColor: styles.brand.cyan }}
          border="1px solid lightgray"
        />
        <Box h={"2em"} />
        <Input
          value={subtitle}
          p={"2rem"}
          size="md"
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Subtitle..."
          fontFamily={"IBM Plex Mono"}
          _focus={{ borderColor: styles.brand.cyan }}
          border="1px solid lightgray"
        />
        <Box h={"3em"} />
        <Textarea
          minHeight={"20em"}
          value={body}
          p={"2rem"}
          size="lg"
          color= {styles.body.secondaryFill}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body..."
          fontFamily={"IBM Plex Mono"}
          _focus={{ borderColor: styles.brand.cyan }}
          border="1px solid lightgray"
        />
        <Box h={"1em"} />
        <Flex alignItems={"center"} justifyContent={"center"}>
          {" "}
          <Heading size="md">Paywall</Heading>
          <Box w={"1em"} />
          <Switch colorScheme="twitter" size="md" />
        </Flex>
        <Box h={"1em"} />

        <Modal size="xl" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay width="200em" />
          <ModalContent width="200em" background={"black"}>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody p="5em" display={"flex"} justifyContent={"center"}>
              <Heading> {modalMessage}</Heading>
            </ModalBody>
            <ModalFooter
              display={"flex"}
              justifyContent={"center"}
            ></ModalFooter>
          </ModalContent>
        </Modal>

        <Button
          onClick={handlePublish}
          variant="secondary"
        >
          Publish
        </Button>
      </Flex>
    </Flex>
  );
};

export default CreatePostPage;
