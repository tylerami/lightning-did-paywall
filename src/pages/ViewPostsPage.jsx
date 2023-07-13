import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import DIDResolver from "../components/DIDResolver";
import PostContentTile from "../components/PostContentTile";
import ContentPaywall from "../components/ContentPaywall";

const ViewPostsPage = () => {
  const [metadataList, setMetadataList] = useState([]);

  return (
    <Flex
      alignSelf={"center"}
      maxWidth="80em"
      minWidth={"50em"}
      width="70vw"
      direction="column"
      padding={"2em"}
    >
      <DIDResolver setMetadataList={setMetadataList} />
      <Box h="3em" borderBottom="solid 1px #444"></Box>

      {metadataList.map((content, index) => (
        <PostContentTile key={index} metadata={content} />
      ))}
    </Flex>
  );
};

export default ViewPostsPage;
