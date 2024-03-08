import React, { FC } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Ecolors } from "../../theme/colors";
import { Flex, Text, Box } from "@chakra-ui/react";

const AboutView: FC = () => {
  const { t } = useTranslation();

  useEffect(() => {}, []);

  return <Flex>AboutView</Flex>;
};

export default AboutView;
