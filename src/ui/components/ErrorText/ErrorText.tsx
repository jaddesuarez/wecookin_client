import { FC } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { MdOutlineError } from "react-icons/md";
import { Ecolors } from "../../theme/colors";

const ErrorText: FC<{ error: string }> = ({ error }) => {
  return (
    <Flex
      my={3}
      p={3}
      w={"full"}
      minH={"40px"}
      maxW={310}
      align={"center"}
      bgColor={Ecolors.LIGHT_RED}
      borderRadius={5}
    >
      <Box w={"15%"}>
        <MdOutlineError size={25} color={Ecolors.DARK_RED} />
      </Box>
      <Text w={"85%"} color={Ecolors.DARK_RED}>
        {error}
      </Text>
    </Flex>
  );
};

export default ErrorText;
