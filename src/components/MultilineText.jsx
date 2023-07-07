import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const MultilineText = ({ fontFamily, color, text }) => {
  return (
    <Flex direction="column">
      {text.split("\n").map((item, key) => {
        if (!item) return null;
        return (
          <Text textAlign={"justify"} fontSize={"lg"} mb={"1em"} fontFamily={fontFamily} color={"white"} key={key}>
            {item}
          </Text>
        );
      })}
    </Flex>
  );
};

export default MultilineText;
