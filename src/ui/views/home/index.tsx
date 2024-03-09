import React, { FC, useState, useContext } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Ecolors } from "../../theme/colors";
import NextLink from "next/link";
import { Flex, Text, Box, Image, Button } from "@chakra-ui/react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { restaurants } from "@/services/restaurants/restaurants.service";
import { logDev } from "@/infrastructure/utils";
import { Spinner } from "@chakra-ui/react";
import RestaurantCard from "@/ui/components/RestaurantCard/RestaurantCard";
import { AuthContext } from "@/context/auth.context";

const HomeView: FC = () => {
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();
  const [foodVector, setFoodVector] = useState<number>(1);
  const [featuredRestaurants, setFeaturedRestaurants] = useState<
    React.ReactNode[] | null
  >(null);

  const responsive = {
    0: {
      items: 1,
    },
    750: {
      items: 2,
    },
    950: {
      items: 3,
    },
    1200: {
      items: 5,
      itemsFit: "contain",
    },
  };

  useEffect(() => {
    restaurants
      .getRandomRestaurants()
      .then((res) => {
        const restaurantComponents = res.map((elm) => {
          const isLiked =
            user?.favoriteRestaurants?.includes(elm._id as string) || false;
          return (
            <RestaurantCard
              key={elm._id}
              restaurant={elm as any}
              isLiked={isLiked}
            />
          );
        });
        setFeaturedRestaurants(restaurantComponents);
      })
      .catch((err) => logDev(err));
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      setFoodVector(foodVector >= 10 ? 1 : foodVector + 1);
    }, 2000);
  }, [foodVector]);

  return (
    <Flex m={0} flexDir={"column"}>
      <Flex
        flexDir={["column", "column", "row", "row"]}
        w={"100%"}
        h={["70vh", "70vh", "60vh", "100vh"]}
        bgImage={[
          "none",
          "none",
          "url('/Images/Ellipse 1.png')",
          "url('/Images/Ellipse 1.png')",
        ]}
        bgPosition="top right"
        bgRepeat="no-repeat"
        bgSize={["0%", "0%", "40%", "40%"]}
        justifyContent={"space-around"}
        pt={["0px", "0px", "150px", "150px"]}
      >
        <Box pt={8} maxW={"450px"} px={3}>
          <Flex align={"center"}>
            <Text
              p={3}
              my={3}
              as={"b"}
              backgroundColor={Ecolors.LIGHT_YELLOW}
              fontSize="md"
              color={Ecolors.DARK_GREEN}
              textTransform={"uppercase"}
            >
              {t("homePage.heroSec01")}
            </Text>
          </Flex>
          <Text
            fontFamily="serif"
            fontSize="5xl"
            as={"b"}
            my={3}
            color={Ecolors.DARK_GREEN}
          >
            {t("homePage.heroSec02")}
          </Text>
          <Text fontSize="md" my={3} color={Ecolors.DARK_GREEN}>
            {t("homePage.heroSec03")}
          </Text>
          <Button
            as={NextLink}
            href={"/login"}
            my={3}
            bgColor={Ecolors.DARK_GREEN}
            color={Ecolors.WHITE}
          >
            {t("common.action.startNow")}
          </Button>
        </Box>
        <Image
          display={["none", "none", "block", "block"]}
          boxSize={["xs", "xs", "xs", "sm"]}
          src={`/Images/food${foodVector}.png`}
          alt="Food Vector"
        ></Image>
      </Flex>
      <Flex
        w={"100%"}
        h={"500px"}
        bgImage="url('/Images/background2.png')"
        bgRepeat="repeat"
        alignItems={"center"}
        flexDir={"column"}
        py={5}
        marginBottom={10}
      >
        <Text
          fontSize={["3xl", "3xl", "4xl", "5xl"]}
          color={Ecolors.EXTRA_DARK_GREEN}
          as={"b"}
          textShadow={`3px 2px ${Ecolors.WHITE}`}
        >
          {t("homePage.featuredRestaurants")}
        </Text>
        {featuredRestaurants ? (
          <AliceCarousel
            autoPlay
            infinite
            autoPlayInterval={2000}
            disableDotsControls
            disableButtonsControls
            mouseTracking
            items={featuredRestaurants}
            responsive={responsive}
          />
        ) : (
          <Flex alignItems={"center"} justifyContent={"center"} height={"full"}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              color={Ecolors.DARK_GREEN}
              size="xl"
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default HomeView;
