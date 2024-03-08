import React, { FC, useState } from "react";
import { useEffect } from "react";
import { Ecolors } from "../../theme/colors";
import { Flex, Spinner } from "@chakra-ui/react";
import RestaurantListCard from "@/ui/components/RestaurantListCard/RestaurantListCard";
import Map from "@/ui/components/Map/Map";
import { restaurants } from "@/services/restaurants/restaurants.service";
import { IRestaurant } from "@/services/restaurants/types";

const RestaurantsView: FC = () => {
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
    <Flex w={"full"} h={"100vh"} align={"center"} justify={"center"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        color={Ecolors.DARK_GREEN}
        size="xl"
      />
    </Flex>;
  }

  return (
    <>
      <Flex m={0} flexDir={"column"}>
        <Flex mt={20} mb={5} justify={"space-around"}></Flex>
        <Flex h={["auto", "auto", "75vh", "75vh"]} paddingBottom={12}>
          <Flex
            w={["100%", "100%", "50%", "50%"]}
            flexDir={"column"}
            justify={"start"}
            align={"start"}
            overflow={["hidden", "hidden", "scroll", "scroll"]}
            mx={[5, 5, 10, 10]}
          >
            {restaurantList}
          </Flex>
          <Flex
            m={0}
            display={["none", "none", "block", "block"]}
            w={"40%"}
            justify={"center"}
          >
            <Map />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default RestaurantsView;
