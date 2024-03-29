import { FC, useContext, useEffect, useState } from "react";
import { Flex, Box, Spinner } from "@chakra-ui/react";
import EditUserForm from "./EditUserForm/EditUserForm";
import DataDisplay from "./DataDisplay/DataDisplay";
import ProfileHeading from "./ProfileHeading/ProfileHeading";
import { Ecolors } from "../../theme/colors";
import { AuthContext } from "@/context/auth.context";
import { users } from "@/services/user/user.service";
import { IRestaurant } from "@/services/restaurants/types";
import { isAdmin, logDev } from "@/infrastructure/utils";

const SettingsTab: FC = () => {
  const { user } = useContext(AuthContext);
  const [myRestaurants, setMyRestaurants] = useState<IRestaurant[]>([]);

  useEffect(() => {
    users
      .getMyRestaurants()
      .then((res) => setMyRestaurants(res.map((elm) => elm)))
      .catch((err) => logDev(err));
  }, [user]);

  if (!user) {
    return <Spinner />;
  }

  return (
    <Flex
      flexDir={["column", "column", "column", "row"]}
      justify={"center"}
      align={"center"}
      mb={8}
    >
      <Flex
        flexDirection={"column"}
        mx={5}
        justify={"space-around"}
        mb={"50px"}
      >
        <ProfileHeading {...user} />
        <DataDisplay
          favoriteRestaurants={
            user.favoriteRestaurants as unknown as IRestaurant[]
          }
          myRestaurants={myRestaurants}
          isAdmin={isAdmin(user)}
        />
      </Flex>
      <Box
        display={["none", "none", "none", "block"]}
        h={"400px"}
        w={"1px"}
        backgroundColor={Ecolors.LIGHT_GREY}
        mx={12}
      />
      <EditUserForm {...user} />
    </Flex>
  );
};

export default SettingsTab;
