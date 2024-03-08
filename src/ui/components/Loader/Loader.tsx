import React from "react";
import DotLoader from "react-spinners/DotLoader";
import { Ecolors } from "@/ui/theme/colors";
import { Flex } from "@chakra-ui/react";

function Loader() {
  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      justify="center"
      align="center"
      bg={"rgba(255, 255, 255, 0.8)"}
      zIndex="9999"
    >
      <DotLoader color={Ecolors.DARK_GREEN} size={"80px"} />
    </Flex>
  );
}

export default Loader;
