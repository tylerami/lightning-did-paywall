import { Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";

import theme from "../theme.jsx";
import { ArrowRightIcon } from "@chakra-ui/icons";
import AudioPlayer from "./AudioPlayer.jsx";
import { Link, useParams } from "react-router-dom";
import { getContentFromWebNodeIfPaid, getContentMetadataFromWebNode } from "../util/contentService.js";

const PostTile = ({ type, content }) => {

  const styles = theme.styles.global;



  if(type==="text"){
    return (
        <Flex p="1em" mb="2em" border="solid 1px" borderColor={styles.brand.yellow} boxShadow="1px 1px 0px 0px #FFEC19, 2px 2px 0px 0px #FFEC19, 3px 3px 0px 0px #FFEC19, 4px 4px 0px 0px #FFEC19, 5px 5px 0px 0px #FFEC19">
            <Flex w="100%" flexDirection="column">
                <Heading size="lg" color={styles.body.primaryFill}>{content.title}</Heading>
                <Heading size="sm" p="8px 0" color={styles.brand.cyan}>{content.price}</Heading>
                <Text color={styles.body.primaryFill}>{content.subtitle.substring(0,100)+"..."}</Text>
            </Flex>
            <Link to={"/profile/"+content.id}><ArrowRightIcon color={styles.brand.yellow} alignSelf="center"/></Link>
        </Flex>
      );
  }
  else if (type==="audio"){
    return (
        <Flex  p="1em" mb="2em" border="solid 1px" borderColor={styles.brand.yellow} boxShadow="1px 1px 0px 0px #FFEC19, 2px 2px 0px 0px #FFEC19, 3px 3px 0px 0px #FFEC19, 4px 4px 0px 0px #FFEC19, 5px 5px 0px 0px #FFEC19">
        <Flex w="100%" flexDirection="column">
            <Heading size="lg" color={styles.body.primaryFill}>{content.title}</Heading>
            <Heading size="sm" p="8px 0" color={styles.brand.cyan}>{content.price}</Heading>
            <AudioPlayer/>
        </Flex>
        <Link to={"/profile/"+content.id}><ArrowRightIcon color={styles.brand.yellow} alignSelf="center" mr={0}/></Link>
    </Flex>
    );
  }
  return(
    <></>
  );
  
};

export default PostTile;
