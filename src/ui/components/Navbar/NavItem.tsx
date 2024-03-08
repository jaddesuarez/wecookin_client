import React, { FC } from "react";
import NextLink from "next/link";
import {
  Flex,
  Link,
  Menu,
  MenuButton,
  Icon,
  Text,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { Ecolors } from "@/ui/theme/colors";
import { INavItemProps } from "./types";
import { NavHoverBox } from "./NavHoverBox";

const NavItem: FC<INavItemProps> = ({ title, icon, description, hRef }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex mt={30} flexDir="column" w="100%" alignItems={"flex-start"}>
      <Menu isOpen={isOpen} placement="right">
        <Link
          backgroundColor={Ecolors.LIGHT_GREEN}
          p={3}
          borderRadius={8}
          _hover={{
            textDecor: "none",
            backgroundColor: Ecolors.DARK_GREEN,
            color: Ecolors.WHITE,
          }}
          w={"100%"}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          as={NextLink}
          href={hRef}
        >
          <MenuButton w={"100%"}>
            <Flex>
              <Icon fontSize={"xl"} as={icon} />
              <Text ml={5}>{title}</Text>
            </Flex>
          </MenuButton>
        </Link>
        <MenuList
          display={["none", "none", "block", "block"]}
          py={0}
          border={"10px"}
          w={200}
          h={200}
          ml={5}
          backgroundColor={Ecolors.DARK_GREEN}
        >
          <NavHoverBox
            title={title}
            icon={icon}
            description={description}
          ></NavHoverBox>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export { NavItem };
