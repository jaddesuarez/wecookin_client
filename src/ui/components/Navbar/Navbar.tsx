import { FC, useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import NextLink from "next/link";
import { AuthContext } from "@/context/auth.context";
import {
  Flex,
  Divider,
  Avatar,
  Heading,
  Text,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Box,
  Link,
} from "@chakra-ui/react";
import { FiMenu, FiHome, FiUser, FiLogOut, FiLogIn } from "react-icons/fi";
import { MdOutlineFastfood } from "react-icons/md";
import { INavProps } from "./types";
import { Ecolors } from "@/ui/theme/colors";
import { NavItem } from "./NavItem";

const Navbar: FC<INavProps> = () => {
  const { t } = useTranslation();
  const [isAtTop, setIsAtTop] = useState(true);
  const router = useRouter();
  const [isLoginPage, setIsLoginPage] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    router.pathname === "/login" ? setIsLoginPage(true) : setIsLoginPage(false);
    onClose();
  }, [router.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const LOGO = (
    <Text
      fontSize="3xl"
      as="b"
      textShadow={`2px 2px ${Ecolors.LIGHT_YELLOW}`}
      color={Ecolors.DARK_GREEN}
    >
      We Cookin'
    </Text>
  );

  return (
    <>
      <Box
        pos="fixed"
        zIndex={2}
        bgColor={isAtTop ? "transparent" : "rgba(255, 255, 255, 0.8)"}
        w={"full"}
      >
        <Flex m={5} alignItems={"center"}>
          <IconButton
            aria-label="navbar"
            icon={<FiMenu />}
            backgroundColor={Ecolors.LIGHT_GREEN}
            onClick={onOpen}
            me={5}
          />
          <Link
            as={NextLink}
            href="/"
            _hover={{
              textDecor: "none",
            }}
          >
            {LOGO}
          </Link>
        </Flex>

        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{LOGO}</DrawerHeader>

            <DrawerBody>
              {!user && (
                <NavItem
                  title={
                    isLoginPage
                      ? t("common.action.signup")
                      : t("common.action.login")
                  }
                  icon={FiLogIn}
                  description=""
                  hRef={isLoginPage ? "/signup" : "/login"}
                />
              )}
              <NavItem
                title={t("navbar.home")}
                icon={FiHome}
                description=""
                hRef={"/"}
              />
              <NavItem
                title={t("navbar.restaurants")}
                icon={MdOutlineFastfood}
                description={t("navbar.restaurantsInfo")}
                hRef={"/restaurants"}
              />
              {user && (
                <>
                  <NavItem
                    title={t("navbar.profile")}
                    icon={FiUser}
                    description={t("navbar.profileInfo")}
                    hRef={"/profile"}
                  />
                  <Box
                    onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                      logOut(e as any)
                    }
                  >
                    <NavItem
                      title={t("common.action.logout")}
                      icon={FiLogOut}
                      description={t("navbar.logoutInfo")}
                      hRef={"/"}
                    />
                  </Box>
                </>
              )}
            </DrawerBody>

            {user && (
              <DrawerFooter>
                <Flex
                  p="5%"
                  flexDir="column"
                  w="100%"
                  alignItems="flex-start"
                  mb={4}
                >
                  <Divider />
                  <Flex mt={4} align="center">
                    <Avatar size="sm" src={user.avatar} />
                    <Flex flexDir="column" ml={4}>
                      <Heading as="h3" size="sm">
                        @{user.username}
                      </Heading>
                      <Text size={"sm"} color="gray">
                        {user.email}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </DrawerFooter>
            )}
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
