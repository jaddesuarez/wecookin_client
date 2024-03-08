import React, { FC, useState, useEffect, useContext } from "react";
import {
  Flex,
  Spinner,
  Text,
  Tag,
  Card,
  CardHeader,
  CardFooter,
  IconButton,
} from "@chakra-ui/react";
import { AuthContext } from "@/context/auth.context";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Ecolors } from "@/ui/theme/colors";
import { IRestaurant } from "@/services/restaurants/types";
import { restaurants } from "@/services/restaurants/restaurants.service";
import { useRouter } from "next/router";
import { logDev } from "@/infrastructure/utils";
import { users } from "@/services/user/user.service";
import { auth } from "@/services/auth/auth.service";
import { FaRegHeart, FaHeart, FaRegEdit } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import ReviewCard from "@/ui/components/ReviewCard/ReviewCard";
import { useModal } from "@/context/modal.context";
import Modal from "@/ui/components/Modal/Modal";
import EditRestaurantForm from "@/ui/components/EditRestaurantForm/EditRestaurantForm";
import DeleteRestaurantForm from "@/ui/components/DeleteRestaurantForm/DeleteRestaurantForm";

const RestaurantView: FC = () => {
  const { user, storeToken, authenticateUser } = useContext(AuthContext);
  const { openModal, modalInfo, setModalInfo } = useModal();
  const { t } = useTranslation();
  const { getRestaurantById } = restaurants;
  const router = useRouter();
  const { id } = router.query;
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, [id, user]);

  const loadData = () => {
    getRestaurantById(id)
      .then((res) => {
        setError(false);
        setRestaurant(res);
      })
      .catch((err) => {
        setError(true);
        logDev(err);
      });
    setIsLiked(
      user?.favoriteRestaurants?.includes(id as string) ? true : false
    );
  };

  const handleLikeOrDeslikeRestaurant = () => {
    isLiked
      ? users
          .dislikeRestaurant(restaurant?._id as string)
          .then((res) => {
            setIsLiked(res.favoriteRestaurants.includes(id));
            loadData();
            logDev(res);
          })
          .catch((err) => logDev(err))
      : users
          .likeRestaurant(restaurant?._id as string)
          .then((res) => {
            setIsLiked(res.favoriteRestaurants.includes(id));
            loadData();
            logDev(res);
          })
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

  const handleOpenModal = (criteria: string) => {
    switch (criteria) {
      case "editRestaurant":
        setModalInfo({
          title: t("common.action.editRestaurant"),
          content: (
            <EditRestaurantForm loadData={loadData} restaurant={restaurant} />
          ),
        });
        break;
      case "deleteRestaurant":
        setModalInfo({
          title: t("common.action.deleteRestaurant"),
          content: <DeleteRestaurantForm id={restaurant?._id as string} />,
        });
        break;
    }
    openModal();
  };

  if (error) {
    return (
      <Flex w={"full"} h={"100vh"} align={"center"} justify={"center"}>
        <Text>{t("common.errors.notFoundRestaurant")}</Text>
      </Flex>
    );
  }
  if (!restaurant) {
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
    <Flex
      flexDir={["column", "row"]}
      w={"100%"}
      h={"100hv"}
      justifyContent={"space-around"}
      align={"center"}
      py={"80px"}
    >
      <Flex my={5} mx={3} flexDir={"column"} pt={8} align="start">
        <Tag
          size={"lg"}
          variant="solid"
          color={Ecolors.WHITE}
          backgroundColor={Ecolors.REGULAR_ORANGE}
        >
          {restaurant.cuisineType.cuisine}
        </Tag>
        <Text
          fontFamily="serif"
          fontSize="5xl"
          as={"b"}
          my={3}
          color={Ecolors.DARK_GREEN}
        >
          {restaurant.name}
        </Text>
        <Flex color={Ecolors.EXTRA_DARK_GREEN} marginBottom={3}>
          <IoLocationOutline size={20} />
          <Text as={"b"} ms={1}>
            {restaurant.address}
          </Text>
        </Flex>
        <Card
          mx={3}
          boxSize={350}
          bgImage={restaurant.image}
          bgSize="cover"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          marginBottom={3}
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
          {user && user._id === restaurant.owner && (
            <CardFooter>
              <IconButton
                icon={<FaRegEdit />}
                rounded={"full"}
                aria-label="edit-restaurant"
                marginEnd={3}
                onClick={() => handleOpenModal("editRestaurant")}
              />
              <IconButton
                icon={<MdDelete />}
                rounded={"full"}
                colorScheme="red"
                aria-label="delete-restaurant"
                onClick={() => handleOpenModal("deleteRestaurant")}
              />
            </CardFooter>
          )}
        </Card>
        <Flex flexDir={"column"} gap={5} color={Ecolors.EXTRA_DARK_GREEN}>
          <Text as={"b"}>{t("weekDays.oppeningHours")}</Text>
          <Text>
            {t("weekDays.monday")}:{" "}
            {restaurant.operatingHours.Monday.isOpen ? (
              restaurant.operatingHours.Monday.hours
            ) : (
              <Tag colorScheme="red">{t("common.content.closed")}</Tag>
            )}
          </Text>
          <Text>
            {t("weekDays.tuesday")}:{" "}
            {restaurant.operatingHours.Tuesday.isOpen ? (
              restaurant.operatingHours.Tuesday.hours
            ) : (
              <Tag colorScheme="red">{t("common.content.closed")}</Tag>
            )}
          </Text>
          <Text>
            {t("weekDays.wednesday")}:{" "}
            {restaurant.operatingHours.Wednesday.isOpen ? (
              restaurant.operatingHours.Wednesday.hours
            ) : (
              <Tag colorScheme="red">{t("common.content.closed")}</Tag>
            )}
          </Text>
          <Text>
            {t("weekDays.thursday")}:{" "}
            {restaurant.operatingHours.Thursday.isOpen ? (
              restaurant.operatingHours.Thursday.hours
            ) : (
              <Tag colorScheme="red">{t("common.content.closed")}</Tag>
            )}
          </Text>
          <Text>
            {t("weekDays.friday")}:{" "}
            {restaurant.operatingHours.Friday.isOpen ? (
              restaurant.operatingHours.Friday.hours
            ) : (
              <Tag colorScheme="red">{t("common.content.closed")}</Tag>
            )}
          </Text>
          <Text>
            {t("weekDays.saturday")}:{" "}
            {restaurant.operatingHours.Saturday.isOpen ? (
              restaurant.operatingHours.Saturday.hours
            ) : (
              <Tag colorScheme="red">{t("common.content.closed")}</Tag>
            )}
          </Text>
          <Text>
            {t("weekDays.sunday")}:{" "}
            {restaurant.operatingHours.Sunday.isOpen ? (
              restaurant.operatingHours.Sunday.hours
            ) : (
              <Tag colorScheme="red">{t("common.content.closed")}</Tag>
            )}
          </Text>
        </Flex>
      </Flex>
      <Flex
        maxH={["full", "full", "80vh", "80vh"]}
        flexDir={"column"}
        overflow={["hidden", "hidden", "scroll", "scroll"]}
        gap={5}
        my={5}
        maxW={["250px", "250px", "250px", "full"]}
      >
        <Text as={"b"} fontSize={20} color={Ecolors.EXTRA_DARK_GREEN}>
          {t("restaurantPage.reviewsTitle")}
        </Text>
        {restaurant.reviews?.length === 0 && (
          <Text
            as={"b"}
            color={Ecolors.EXTRA_DARK_GREEN}
            bgColor={Ecolors.LIGHT_YELLOW}
            borderRadius={5}
            p={3}
            border={"1px"}
          >
            {t("common.errors.noReviews")}
          </Text>
        )}
        {restaurant.reviews?.map((elm, idx) => (
          <ReviewCard key={idx} {...elm}></ReviewCard>
        ))}
      </Flex>
      <Modal modalInfo={modalInfo} />
    </Flex>
  );
};

export default RestaurantView;
