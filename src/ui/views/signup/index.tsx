import React, { FC } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Ecolors } from "../../theme/colors";
import { Flex } from "@chakra-ui/react";
import AuthForm from "@/ui/components/AuthForm/AuthForm";

const SignupView: FC = () => {
  const { t } = useTranslation();

  useEffect(() => {}, []);

  return (
    <Flex
      m={0}
      flexDir={"column"}
      h={"100vh"}
      justifyContent={"center"}
      align={"center"}
    >
      <AuthForm isLogginIn={false} />
    </Flex>
  );
};

export default SignupView;
