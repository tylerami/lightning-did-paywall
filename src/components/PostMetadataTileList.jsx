import { Box, Button, Heading, filter } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import PostMetadataTile from "./PostMetadataTile";
import React from "react";
import theme from "../theme";

const PostMetadataTileList = ({
  expanded,
  toggleExpanded,
  contentList,
  type,
}) => {
  const styles = theme.styles.global;

  const max = expanded ? 100 : 3;

  const filteredContent = contentList
    .filter((post, i) => i < max && post.type === type)
    .map((post, i) => {
      return <PostMetadataTile key={i} metadata={post} />;
    });

  if (filteredContent.length === 0) return null;

  return (
    <Box>
      <Heading
        w="50%"
        pb="1em"
        borderBottom="solid 1px"
        borderColor={styles.brand.yellow}
      >
        {type === "text" ? "Blog Posts" : "Podcasts"}
      </Heading>
      <Box h="2em" />
      {filteredContent}
      {expanded && (
        <Button variant="primary" maxW="max-content" onClick={toggleExpanded}>
          View less
        </Button>
      )}
      {!expanded && filteredContent.length > max && (
        <Button variant="primary" maxW="max-content" onClick={toggleExpanded}>
          View more
        </Button>
      )}
    </Box>
  );
};

export default PostMetadataTileList;
