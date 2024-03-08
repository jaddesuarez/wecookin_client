import React, { FC, useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Ecolors } from "../../theme/colors";
import {
  Flex,
  Spinner,
  Button,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import RestaurantListCard from "@/ui/components/RestaurantListCard/RestaurantListCard";
import Map from "@/ui/components/Map/Map";
import { restaurants } from "@/services/restaurants/restaurants.service";

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
        <Flex mt={20} mb={5} justify={"space-around"}>
          {/* <InputGroup size="lg" maxW={"500px"}>
            <InputLeftElement pointerEvents="none">
              <FaSearch color="gray.300" />
            </InputLeftElement>
            <Input pr="4.5rem" type="text" placeholder="Enter password" />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                me={2}
                color={Ecolors.WHITE}
                backgroundColor={Ecolors.REGULAR_ORANGE}
              >
                Search
              </Button>
            </InputRightElement>
          </InputGroup> */}
        </Flex>
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
            <Map></Map>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default RestaurantsView;
