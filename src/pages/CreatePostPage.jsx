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
  ButtonGroup,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { CopyIcon } from "@chakra-ui/icons";
import theme from "../theme.jsx";
import { getDid } from "../util/dwnService.js";
import { publishContentToWebNode } from "../util/contentService.js";
import { getProfileFromWebNode } from "../util/profileService.js";

// TODO: maybe we should refactor this into smaller components ?

// TODO: maybe we should add some input validation for the paywall amount and lightning address ?

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");

  const [modalMessage, setModalMessage] = useState();

  const { hasCopied, onCopy } = useClipboard(getDid());

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [paywallActive, setPaywallActive] = useState(false);
  const [lightningAddress, setLightningAddress] = useState("");
  const [satsAmount, setSatsAmount] = useState("");

  const [contentType, setContentType] = useState("text");

  function toggleContentType() {
    if (contentType === "text") {
      setContentType("audio");
    } else {
      setContentType("text");
    }
  }

  function typeIsText() {
    return contentType === "text";
  }

  function typeIsAudio() {
    return contentType === "audio";
  }

  const [selectedMediaFile, setSelectedMediaFile] = useState(null);

  const hiddenFileInput = React.useRef(null);

  function handleSelectFile() {
    hiddenFileInput.current.click();
  }

  async function togglePaywall() {
    const updatedPaywallActive = !paywallActive;
    setPaywallActive(updatedPaywallActive);
    if (!updatedPaywallActive) {
      setLightningAddress("");
      setSatsAmount("");
    } else {
      const profile = await getProfileFromWebNode();
      setLightningAddress(profile?.lightningAddress);
      setSatsAmount("");
    }
  }

  function getPaywall() {
    if (!paywallActive) return null;
    if (parseInt(satsAmount) <= 0) return null;

    return {
      satsAmount: parseInt(satsAmount),
      lightningAddress,
    };
  }

  async function handlePublish() {
    if (!title || title.length === 0) return;
    if (
      await publishContentToWebNode({
        title,
        description: subtitle,
        body: typeIsText() ? body : null,
        paywall: getPaywall(),
        audio: typeIsAudio() ? selectedMediaFile : null,
      })
    ) {
      setModalMessage("Content published!");
      onOpen();
      setTitle("");
      setSubtitle("");
      setBody("");
      setSelectedMediaFile(null);

      if (paywallActive) {
        togglePaywall();
      }
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
      padding={"2rem"}
    >
      <Flex borderRadius="0.2em" width="100%" direction={"column"}>
        <Flex w="100%">
          <Heading size="2xl">Content Creator</Heading>
          <Flex
            alignSelf="flex-end"
            mr={0}
            alignItems={"center"}
            justifyContent={"center"}
          ></Flex>
        </Flex>
        <Box h="0.5em"></Box>
        <Flex alignItems={"center"}>
          <InputGroup size="md">
            <Input
              value={getDid().split("-").at(0)}
              fontFamily={"IBM Plex Mono"}
              _focus={{ borderColor: styles.brand.cyan }}
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

        </Flex>
        <Box h="2em" mb="2em" borderBottom="solid 1px" borderColor={styles.brand.yellow}></Box>

        <Flex alignItems={"center"}>
          {" "}
          <Heading opacity={typeIsText() ? 1 : 0.6} size="lg">
            Blog Post
          </Heading>
          <Box w={"1em"} />
          <Switch
            isChecked={typeIsAudio()}
            onChange={() => toggleContentType()}
            colorScheme="cyan"
            size="lg"
          />
          <Box w={"1em"} />
          <Heading opacity={typeIsAudio() ? 1 : 0.6} size="lg">
            Podcast
          </Heading>
          
        </Flex>
        <Box h="1em"></Box>
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
        <Textarea
          minHeight={"4em"}
          value={subtitle}
          p="1rem"
          size="lg"
          color={styles.body.secondaryFill}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Description"
          fontFamily={"IBM Plex Mono"}
          _focus={{ borderColor: styles.brand.cyan }}
          border="1px solid lightgray"
        />
        <Box h={"1em"} />

        {typeIsText() && (
          <Textarea
            minHeight={"15em"}
            value={body}
            p="1rem"
            size="lg"
            color={styles.body.secondaryFill}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Body"
            fontFamily={"IBM Plex Mono"}
            _focus={{ borderColor: styles.brand.cyan }}
            border="1px solid lightgray"
          />
        )}
        <Box h={"1em"} />
        {typeIsAudio() && (
          <Box>
            <Input
              value={`Selected media:  ${
                selectedMediaFile?.name ?? "No file selected"
              }`}
              cursor={"pointer"}
              isReadOnly
              p="1rem"
              size="md"
              onClick={handleSelectFile}
              fontFamily={"IBM Plex Mono"}
              _focus={{ borderColor: styles.brand.cyan }}
              border="1px solid lightgray"
            />
            <Input
              ref={hiddenFileInput}
              display={"none"}
              type="file"
              accept="audio/*"
              onChange={(e) => {
                setSelectedMediaFile(e.target.files[0]);
              }}
            />
          </Box>
        )}
        <Box h={"1em"} />
        <Flex alignItems={"center"} >
          {" "}
          <Heading size="md">Paywall</Heading>
          <Box w={"1em"} />
          <Switch
            isChecked={paywallActive}
            onChange={() => togglePaywall()}
            colorScheme="cyan"
            size="md"
          />
          {paywallActive && (
            <Flex ml={"2em"} direction={"column"}>
              <Input
                value={satsAmount}
                p="1rem"
                m="0.2rem"
                size="md"
                w={"20rem"}
                onChange={(e) => setSatsAmount(e.target.value)}
                placeholder="Price in sats"
                fontFamily={"IBM Plex Mono"}
                _focus={{ borderColor: styles.brand.cyan }}
                border="1px solid lightgray"
              />
              <Input
                value={lightningAddress}
                p="1rem"
                m="0.2rem"
                size="md"
                w={"20rem"}
                onChange={(e) => setLightningAddress(e.target.value)}
                placeholder="Lightning address"
                fontFamily={"IBM Plex Mono"}
                _focus={{ borderColor: styles.brand.cyan }}
                border="1px solid lightgray"
              />
            </Flex>
          )}
        </Flex>
        <Box h={"2em"} />

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

        <Button onClick={handlePublish} variant="primary">
          Publish
        </Button>
      </Flex>
    </Flex>
  );
};

export default CreatePostPage;
