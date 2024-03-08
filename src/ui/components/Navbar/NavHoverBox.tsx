import React, { FC } from "react";
import { Flex, Icon, Heading, Text } from "@chakra-ui/react";
import { INavHoverBox } from "./types";
import { Ecolors } from "@/ui/theme/colors";

const NavHoverBox: FC<INavHoverBox> = ({ title, icon, description }) => {
  return (
    <>
      <Flex
        pos="absolute"
        mt="calc(100px - 7.5px)"
        ml="-10px"
        width={0}
        height={0}
        borderTop="10px solid transparent"
        borderBottom="10px solid transparent"
        borderRight={`10px solid ${Ecolors.DARK_GREEN}`}
      />
      <Flex
        h={200}
        w={"100%"}
        flexDir={"column"}
        alignItems={"center"}
        justify={"center"}
        color={Ecolors.WHITE}
        textAlign={"center"}
      >
        <Icon fontSize="3xl" mb={4} as={icon} />
        <Heading size="md" fontWeight="normal">
          {title}
        </Heading>
        <Text>{description}</Text>
      </Flex>
    </>
  );
};

export { NavHoverBox };
