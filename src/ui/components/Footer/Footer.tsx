import NextLink from "next/link";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IFooterProps } from "./types";
import { Flex, Link, Text, Icon, HStack } from "@chakra-ui/react";
import { IoCodeSlash } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

import { Ecolors } from "../../theme/colors";

const Footer: FC<IFooterProps> = () => {
  const { t } = useTranslation();
  return (
    <Flex
      pos="fixed"
      zIndex={2}
      justify="space-around"
      align="center"
      bottom={0}
      bg={Ecolors.LIGHT_GREEN}
      w="100%"
      h="60px"
      color={Ecolors.EXTRA_DARK_GREEN}
      px="100px"
    >
      <Flex display={["none", "none", "block", "block"]}>
        <HStack gap={100}>
          <Text>© 2024 We Cookin' Inc.</Text>
          <Flex textDecor="underline" fontStyle="italic" fontWeight="thin">
            <HStack>
              <Link
                isExternal
                as={NextLink}
                href="https://giphy.com/gifs/justviralnet-cat-hilarious-typing-H1dxi6xdh4NGQCZSvz"
              >
                {t("footer.FAQ")}
              </Link>
              <Link
                isExternal
                as={NextLink}
                href="https://giphy.com/gifs/justviralnet-cat-hilarious-typing-H1dxi6xdh4NGQCZSvz"
              >
                {t("footer.terms")}
              </Link>
              <Link
                isExternal
                as={NextLink}
                href="https://giphy.com/gifs/justviralnet-cat-hilarious-typing-H1dxi6xdh4NGQCZSvz"
              >
                {t("footer.privacy")}
              </Link>
              <Link as={NextLink} href="/contact">
                {t("footer.contact")}
              </Link>
            </HStack>
          </Flex>
        </HStack>
      </Flex>
      <Flex gap={5}>
        <Link href="#" isExternal>
          <Icon as={IoCodeSlash} boxSize={8} />
        </Link>
        <Link href="https://www.linkedin.com/in/jaddesuarez/" isExternal>
          <Icon as={FaLinkedin} boxSize={8} />
        </Link>
        <Link href="https://github.com/jaddesuarez" isExternal>
          <Icon as={FaGithub} boxSize={8} />
        </Link>
      </Flex>
    </Flex>
  );
};

export default Footer;
