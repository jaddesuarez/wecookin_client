import React, { FC, useContext } from "react";
import {
  Text,
  Card,
  CardHeader,
  CardFooter,
  IconButton,
} from "@chakra-ui/react";
import { Ecolors } from "@/ui/theme/colors";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { users } from "@/services/user/user.service";
import { logDev } from "@/infrastructure/utils";
import { auth } from "@/services/auth/auth.service";
import { AuthContext } from "@/context/auth.context";
import { useRouter } from "next/router";
import { IRestaurantCardProps } from "./types";

const RestaurantCard: FC<IRestaurantCardProps> = ({ restaurant, isLiked }) => {
  const { user, storeToken, authenticateUser } = useContext(AuthContext);
  const router = useRouter();

  const handleLikeOrDeslikeRestaurant = () => {
    isLiked
      ? users
          .dislikeRestaurant(restaurant._id)
          .then((res) => logDev(res))
          .catch((err) => logDev(err))
      : users
          .likeRestaurant(restaurant._id)
          .then((res) => logDev(res))
          .catch((err) => logDev(err));
    if (user) {
      auth
        .updateToken()
        .then((res) => {
          storeToken(res);
          authenticateUser();
        })
        .catch((err) => logDev(err));
    }
  };
  return (
    <Card
      mx={3}
      h={"300px"}
      bgImage={restaurant.image}
      bgSize="cover"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      cursor={"pointer"}
      onClick={() => router.push(`/restaurants/${restaurant._id}`)}
    >
      {user && (
        <CardHeader display="flex" justifyContent="end">
          <IconButton
            aria-label="like-button"
            icon={isLiked ? <FaHeart /> : <FaRegHeart />}
            fontSize={20}
            isRound={true}
            colorScheme="black"
            color={Ecolors.WHITE}
            variant="ghost"
            onClick={handleLikeOrDeslikeRestaurant}
          />
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
