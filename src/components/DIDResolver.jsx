import { CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import React, { useState } from "react";

import theme from "../theme";
import { getAllContentMetadataFromWebNode } from "../util/contentService";

const DIDResolver = ({ setContentList }) => {
  const [did, setDid] = useState("");

  async function handleCopy() {
    const clipboard = await navigator.clipboard.readText();
    setDid(clipboard);
  }

  const styles = theme.styles.global;

  async function handleResolve(did) {
    const contentList = await getAllContentMetadataFromWebNode(did);
    if (!contentList) return; 

    setContentList(contentList);
  }

  return (
    <Flex padding="1rem" borderRadius="0.2em" width="100%" direction={"column"}>
      <Heading size="3xl">Content Viewer</Heading>
      <Box h="2em"></Box>
      <InputGroup size="lg">
        <Input
          value={did}
          onChange={(e) => setDid(e.target.value)}
          placeholder="Enter a DID..."
          fontFamily={"IBM Plex Mono"}
          _focus={{ borderColor: styles.brand.cyan }}
          border="1px solid lightgray"
        />
        <InputRightElement>
          <IconButton
            variant="ghost"
            _hover={{ background: "none", color: styles.brand.cyan }}
            color={styles.body.primaryFill}
            aria-label="Paste from clipboard"
            icon={<CopyIcon />}
            onClick={handleCopy}
          />
        </InputRightElement>
      </InputGroup>
      <Box h="1em"></Box>
      <Button variant="secondary" onClick={() => handleResolve(did)}>
        Resolve Content
      </Button>
    </Flex>
  );
};

export default DIDResolver;
