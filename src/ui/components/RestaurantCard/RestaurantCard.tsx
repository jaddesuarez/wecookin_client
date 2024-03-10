import React, { FC, useContext } from "react";
import {
  Text,
  Card,
  CardHeader,
  CardFooter,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { Ecolors } from "@/ui/theme/colors";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { users } from "@/services/user/user.service";
import { logDev } from "@/infrastructure/utils";
import { AuthContext } from "@/context/auth.context";
import { IRestaurantCardProps } from "./types";
import Link from "next/link";

const RestaurantCard: FC<IRestaurantCardProps> = ({ restaurant }) => {
  const { user, setUser } = useContext(AuthContext);

  const handleLikeBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    users
      .likeRestaurant(restaurant._id)
      .then((res) => {
        setUser(res);
        logDev(res);
      })
      .catch((err) => logDev(err));
  };

  const handleDeslikeBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    users
      .dislikeRestaurant(restaurant._id)
      .then((res) => {
        setUser(res);
        logDev(res);
      })
      .catch((err) => logDev(err));
  };

  return (
    <Card
      as={Link}
      href={`/restaurants/${restaurant._id}`}
      mx={3}
      h={"300px"}
      bgImage={restaurant.image}
      bgSize="cover"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      cursor={"pointer"}
    >
      {user && (
        <CardHeader display="flex" justifyContent="end">
          <Box>
            {user.favoriteRestaurants?.includes(restaurant._id) ? (
              <IconButton
                aria-label="deslike-button"
                icon={<FaHeart />}
                fontSize={20}
                isRound={true}
                colorScheme="black"
                color={Ecolors.WHITE}
                variant="ghost"
                onClick={handleDeslikeBtn}
              />
            ) : (
              <IconButton
                aria-label="like-button"
                icon={<FaRegHeart />}
                fontSize={20}
                isRound={true}
                colorScheme="black"
                color={Ecolors.WHITE}
                variant="ghost"
                onClick={handleLikeBtn}
              />
            )}
          </Box>
        </CardHeader>
      )}
      <CardFooter>
        <Text
          textTransform={"uppercase"}
          as={"b"}
          color={Ecolors.WHITE}
          textShadow={`1px 1px ${Ecolors.BLACK}`}
        >
          {restaurant.name}
        </Text>
      </CardFooter>
    </Card>
  );
};

export default RestaurantCard;
