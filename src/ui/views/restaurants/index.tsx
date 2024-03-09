import React, { FC, useState } from "react";
import { useEffect } from "react";
import { Ecolors } from "../../theme/colors";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import RestaurantListCard from "@/ui/components/RestaurantListCard/RestaurantListCard";
import Map from "@/ui/components/Map/Map";
import { restaurants } from "@/services/restaurants/restaurants.service";
import { useTranslation } from "react-i18next";

const RestaurantsView: FC = () => {
  const { t } = useTranslation();
  const [restaurantList, setRestaurantList] = useState<
    React.ReactNode[] | null
  >(null);
  useEffect(() => {
    restaurants.getAllRestaurants().then((res) => {
      setRestaurantList(
        res.map((elm) => <RestaurantListCard key={elm._id} {...elm} />)
      );
    });
  }, []);

  if (!restaurantList) {
    return (
      <Flex w={"full"} h={"100vh"} align={"center"} justify={"center"}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          color={Ecolors.DARK_GREEN}
          size="xl"
        />
      </Flex>
    );
  }

  return (
    <>
      <Flex
        my={5}
        alignItems={"center"}
        justify={"center"}
        flexDir={"column"}
        h={"100vh"}
      >
        <Text
          fontSize="3xl"
          textShadow={`2px 2px ${Ecolors.LIGHT_GREEN}`}
          color={Ecolors.DARK_GREEN}
          as={"b"}
          display={["none", "none", "block", "block"]}
        >
          {t("restaurantsPage.heading")}
        </Text>
        <Flex w={"full"} justify={"space-between"} h={"75vh"} paddingBottom={5}>
          <Flex
            m={5}
            display={["none", "none", "block", "block"]}
            w={"40%"}
            justify={"center"}
            align={"center"}
          >
            <Map />
          </Flex>
          <Flex
            w={["100%", "100%", "50%", "50%"]}
            flexDir={"column"}
            justify={"start"}
            align={"start"}
            overflow={"scroll"}
            mx={[5, 5, 10, 10]}
          >
            {restaurantList}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default RestaurantsView;
