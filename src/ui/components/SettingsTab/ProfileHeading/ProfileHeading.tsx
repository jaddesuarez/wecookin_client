import { FC } from "react";
import { Flex, Text, Avatar } from "@chakra-ui/react";
import { Ecolors } from "../../../theme/colors";
import { ILoggedUser } from "@/services/auth/types";

const ProfileHeading: FC<ILoggedUser> = ({ avatar, username, email }) => {
  return (
    <Flex justify={"center"} color={Ecolors.EXTRA_DARK_GREEN} marginBottom={10}>
      <Avatar src={avatar} size="xl" pos="absolute" />
      <Flex
        boxShadow="lg"
        flexDirection={"column"}
        justify={"end"}
        w={"330px"}
        h={"135px"}
        borderRadius={"3xl"}
        backgroundColor={Ecolors.LIGHT_YELLOW}
        mt={10}
        pb={5}
      >
        <Text as="b" textAlign={"center"} fontSize="xl">
          @{username}
        </Text>
        <Text textAlign={"center"} fontWeight={"thin"}>
          {email}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ProfileHeading;
