import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Tooltip,
  useClipboard,
} from "@chakra-ui/react";
import person from "../assets/person.png";

import theme from "../theme";
import { getDid } from "../util/dwnService";
import { CopyIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Profile = ({}) => {
  const styles = theme.styles.global;
  const content = [];
  const displayName = null;
  const userDid = getDid();
  const userDisplayName = displayName || userDid.substring(0, 20) + "...";

  const { hasCopied, onCopy } = useClipboard(getDid());

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
                <Image src={person} w={32}/>
                <Box h="2em"/>
                <Flex>
                    <Heading size="2xl" >{userDisplayName}</Heading> 
                    <EditIcon alignSelf="flex-end" w={8} h={8}/>
                </Flex>
                <Box h="1em"/>
                <InputGroup size="md">
                    <Input
                        value={userDid}
                        fontFamily={"IBM Plex Mono"}
                        _focus={{ borderColor: styles.brand.cyan}}
                        color={styles.brand.cyan}
                        readOnly
                        p="0 2.5em 0 0"
                        border="none"
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
                <Box h="1em"/>
                <Text borderBottom="solid 2px" pb={"2em"} borderBottomColor={styles.brand.yellow} >Bio goes here</Text>
                <Box h="2em"/>

                { content.length===0 ?
                    <Flex mt="4em" alignItems="center" textAlign="center" direction="column">
                        <Heading size="xl" >{"No content to show."}</Heading>
                        <Box h="2em"/>
                        <Link to="/createPost">
                            <Button  variant="primary" maxW="max-content">Create your first post</Button>
                        </Link>
                    </Flex>
                :
                    <></>
                }

            </Flex>
        </Flex>
    );
};

export default Profile;
