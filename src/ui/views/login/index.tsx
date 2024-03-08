import React, { FC } from "react";
import { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import AuthForm from "@/ui/components/AuthForm/AuthForm";

const LoginView: FC = () => {
  useEffect(() => {}, []);

  return (
    <Flex
      m={0}
      flexDir={"column"}
      h={"100vh"}
      justifyContent={"center"}
      align={"center"}
    >
      <AuthForm isLogginIn={true} />
    </Flex>
  );
};

export default LoginView;
