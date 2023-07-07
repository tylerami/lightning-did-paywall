
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

import React, { useState } from 'react'

const DIDResolver = () => {
    const [did, setDid] = useState("");

    async function handleCopy() {
      const clipboard = await navigator.clipboard.readText();
      setDid(clipboard);
    }
  return (
    <Flex
        padding="2em"
        borderRadius="0.2em"
        border="0.5px solid #444"
        width="100%"
        direction={"column"}
      >
        <Heading size="3xl">Content Viewer</Heading>
        <Box h="2em"></Box>
        <InputGroup size="lg">
          <Input
            value={did}
            onChange={(e) => setDid(e.target.value)}
            placeholder="Enter a DID..."
            fontFamily={"IBM Plex Mono"}
            _focus={{ borderColor: "#23E5F1" }}
            border="1px solid lightgray"
          />
          <InputRightElement>
            <IconButton
              variant="ghost"
              _hover={{ background: "none", color: "#23E5F1" }}
              color="#fff"
              aria-label="Paste from clipboard"
              icon={<CopyIcon />}
              onClick={handleCopy}
            />
          </InputRightElement>
        </InputGroup>
        <Box h="1em"></Box>
        <Button
          _hover={{ background: "#23E5F1", transition: "200ms ease" }}
          size="lg"
        >
          Resolve Content
        </Button>
      </Flex>
  )
}

export default DIDResolver