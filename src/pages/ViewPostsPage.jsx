import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import DIDResolver from "../components/DIDResolver";
import BlogPost from "../components/BlogPost";
import ContentPaywall from "../components/ContentPaywall";

const ViewPostsPage = () => {
  const [contentList, setContentList] = useState([]);

  return (
    <Flex
      alignSelf={"center"}
      maxWidth="80em"
      minWidth={"50em"}
      width="70vw"
      direction="column"
      padding={"2em"}
    >
      <DIDResolver setContentList={setContentList} />
      <Box h="3em" borderBottom="solid 1px #444"></Box>

      {contentList.map((content, index) => (
        <BlogPost key={index} content={content} />
      ))}
    </Flex>
  );
};

export default ViewPostsPage;
