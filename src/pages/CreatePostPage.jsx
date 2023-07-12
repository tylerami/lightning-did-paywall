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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { CopyIcon } from "@chakra-ui/icons";
import theme from "../theme.jsx";
import { getDid } from "../util/dwnService.js";
import { publishContentToWebNode } from "../util/contentService.js";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");

  const [modalMessage, setModalMessage] = useState();

  const { hasCopied, onCopy } = useClipboard(getDid());

  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handlePublish() {
    if (await publishContentToWebNode(title, subtitle, body)) {
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
        width="100%"
        direction={"column"}
      >
        <Heading size="2xl">Content Creator</Heading>
        <Box h="0.5em"></Box>
      
        <Flex alignItems={"center"}>
        <InputGroup size="md">
          <Input
            value={getDid().split("-").at(0)}
            fontFamily={"IBM Plex Mono"}
            _focus={{ borderColor: styles.brand.cyan}}
            border="1px solid lightgray"
            color={styles.brand.cyan}
            readOnly
          />
          <InputRightElement>
          <Tooltip
            label={hasCopied ? "Copied" : "Copy to clipboard"}
            placement="top"
          >
            <IconButton
              colorScheme="ghost"
              icon={<CopyIcon />}
              onClick={onCopy}
              aria-label={hasCopied ? "Copied" : "Copy to clipboard"}
              border={"0px"}
              shadow={"none"}
            />
          </Tooltip>
          </InputRightElement>
        </InputGroup>
      
          <Box w="0.5em"></Box>
          
        </Flex>

        <Box h="2em"></Box>
        <Input
          value={title}
          p="1rem"
          fontSize={"1.5em"}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          fontFamily={"IBM Plex Mono"}
          _focus={{ borderColor: styles.brand.cyan }}
          border="1px solid lightgray"
        />
        <Box h={"1em"} />
        <Input
          value={subtitle}
          p="1rem"
          size="md"
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Description"
          fontFamily={"IBM Plex Mono"}
          _focus={{ borderColor: styles.brand.cyan }}
          border="1px solid lightgray"
        />
        <Box h={"1em"} />
        <Textarea
          minHeight={"18em"}
          value={body}
          p="1rem"
          size="lg"
          color= {styles.body.secondaryFill}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
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
          variant="primary"
        >
          Publish
        </Button>
      </Flex>
    </Flex>
  );
};

export default CreatePostPage;
