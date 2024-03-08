import React, { FC, useState, useEffect, useContext } from "react";
import { Ecolors } from "@/ui/theme/colors";
import { Flex, Spinner } from "@chakra-ui/react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { users } from "@/services/user/user.service";
import { logDev } from "@/infrastructure/utils";
import { AuthContext } from "@/context/auth.context";
import RestaurantCard from "../RestaurantCard/RestaurantCard";

const FavRestaurantsTab: FC = () => {
  const { user } = useContext(AuthContext);
  const [favRestaurants, setFavRestaurants] = useState<
    React.ReactNode[] | null
  >(null);

  useEffect(() => {
    users
      .getFavoriteRestaurants()
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
        setFavRestaurants(restaurantComponents);
      })
      .catch((err) => logDev(err));
  }, [user]);

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

  return (
    <Flex w={"100%"} h={"100%"} align={"center"} justify={"center"}>
      {favRestaurants ? (
        <AliceCarousel
          disableButtonsControls
          mouseTracking
          items={favRestaurants}
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
  );
};

export default FavRestaurantsTab;
