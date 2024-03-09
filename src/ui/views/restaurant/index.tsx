import React, { FC, useState, useEffect, useContext } from "react";
import {
  Flex,
  Spinner,
  Text,
  Tag,
  Card,
  CardFooter,
  IconButton,
  Box,
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
import { FaRegHeart, FaHeart, FaRegEdit, FaRegClock } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import ReviewCard from "@/ui/components/ReviewCard/ReviewCard";
import { useModal } from "@/context/modal.context";
import Modal from "@/ui/components/Modal/Modal";
import EditRestaurantForm from "@/ui/components/EditRestaurantForm/EditRestaurantForm";
import DeleteRestaurantForm from "@/ui/components/DeleteRestaurantForm/DeleteRestaurantForm";
import CreateReviewForm from "@/ui/components/CreateReviewForm/CreateReviewForm";

const RestaurantView: FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const { openModal, modalInfo, setModalInfo } = useModal();
  const { t } = useTranslation();
  const { getRestaurantById } = restaurants;
  const router = useRouter();
  const { id } = router.query;
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, [id, user]);

  const loadData = () => {
    setError(false);
    getRestaurantById(id)
      .then((res) => {
        setRestaurant(res);
      })
      .catch((err) => {
        setError(true);
        logDev(err);
      });
  };

  const handleLikeBtn = () => {
    users
      .likeRestaurant(restaurant?._id as string)
      .then((res) => {
        setUser(res);
        logDev(res);
      })
      .catch((err) => logDev(err));
  };

  const handleDeslikeBtn = () => {
    users
      .dislikeRestaurant(restaurant?._id as string)
      .then((res) => {
        setUser(res);
        logDev(res);
      })
      .catch((err) => logDev(err));
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
    <Flex flexDir={"column"} paddingBottom={20} justify={"center"}>
      <Card
        w={"full"}
        h={"50vh"}
        bgImage={restaurant.image}
        bgSize="cover"
        bgRepeat={"no-repeat"}
        borderRadius={0}
        flexDirection="column"
        justify={"end"}
      >
        <CardFooter
          w={"full"}
          h={"70px"}
          bgColor={"rgba(255, 255, 255, 0.6)"}
          justify={"space-between"}
        >
          <Box>
            {user && (
              <Box>
                {user && user._id === restaurant.owner && (
                  <Flex gap={3}>
                    <IconButton
                      size={["xs", "md", "md", "md"]}
                      icon={<FaRegEdit />}
                      rounded={"full"}
                      aria-label="edit-restaurant"
                      onClick={() => handleOpenModal("editRestaurant")}
                    />
                    <IconButton
                      size={["xs", "md", "md", "md"]}
                      icon={<MdDelete />}
                      rounded={"full"}
                      colorScheme="red"
                      aria-label="delete-restaurant"
                      onClick={() => handleOpenModal("deleteRestaurant")}
                    />
                  </Flex>
                )}
              </Box>
            )}
          </Box>
          <Box>
            <Text
              fontFamily="serif"
              fontSize={["2xl", "3xl", "3xl", "4xl"]}
              as={"b"}
              color={Ecolors.EXTRA_DARK_GREEN}
              textShadow={`2px 1px ${Ecolors.LIGHT_GREEN}`}
            >
              {restaurant.name}
            </Text>
          </Box>
          <Box>
            {user && (
              <Box>
                {user.favoriteRestaurants?.includes(id as string) ? (
                  <IconButton
                    aria-label="deslike-button"
                    icon={<FaHeart />}
                    fontSize={[20, 30, 30, 30]}
                    isRound={true}
                    colorScheme="black"
                    color="red"
                    variant="ghost"
                    onClick={handleDeslikeBtn}
                  />
                ) : (
                  <IconButton
                    aria-label="like-button"
                    icon={<FaRegHeart />}
                    fontSize={[20, 30, 30, 30]}
                    isRound={true}
                    colorScheme="black"
                    color="red"
                    variant="ghost"
                    onClick={handleLikeBtn}
                  />
                )}
              </Box>
            )}
          </Box>
        </CardFooter>
      </Card>
      <Flex
        gap={[5, 10, 10, 10]}
        marginTop={5}
        justify={"center"}
        flexDir={["column", "row", "row", "row"]}
        mx={3}
      >
        <Flex flexDir={"column"} align={["start", "end", "end", "end"]} gap={3}>
          <Tag
            size={"lg"}
            variant="solid"
            color={Ecolors.WHITE}
            backgroundColor={Ecolors.REGULAR_ORANGE}
          >
            {restaurant.cuisineType.cuisine}
          </Tag>
          <Flex color={Ecolors.EXTRA_DARK_GREEN} marginBottom={3}>
            <IoLocationOutline size={20} />
            <Text as={"b"} ms={1}>
              {restaurant.address}
            </Text>
          </Flex>
        </Flex>
        <Flex minW={[0, 0, 400, 600]} flexDir={"column"} gap={3}>
          <FaRegClock size={25} color={Ecolors.DARK_GREEN} />
          <Text as={"b"} color={Ecolors.EXTRA_DARK_GREEN} fontSize={"xl"}>
            {t("weekDays.oppeningHours")}
          </Text>
          <Flex
            borderBottom={"1px"}
            borderColor={Ecolors.REGULAR_GREY}
            gap={2}
            color={Ecolors.DARK_GREEN}
            pb={2}
          >
            <Text as={"b"} minW={24}>
              {t("weekDays.monday")}
            </Text>
            <Text>
              {restaurant.operatingHours.Monday.isOpen ? (
                restaurant.operatingHours.Monday.hours
              ) : (
                <Tag colorScheme="red">{t("common.content.closed")}</Tag>
              )}
            </Text>
          </Flex>
          <Flex
            borderBottom={"1px"}
            borderColor={Ecolors.REGULAR_GREY}
            gap={2}
            color={Ecolors.DARK_GREEN}
            pb={2}
          >
            <Text as={"b"} minW={24}>
              {t("weekDays.tuesday")}
            </Text>
            <Text>
              {restaurant.operatingHours.Tuesday.isOpen ? (
                restaurant.operatingHours.Tuesday.hours
              ) : (
                <Tag colorScheme="red">{t("common.content.closed")}</Tag>
              )}
            </Text>
          </Flex>
          <Flex
            borderBottom={"1px"}
            borderColor={Ecolors.REGULAR_GREY}
            gap={2}
            color={Ecolors.DARK_GREEN}
            pb={2}
          >
            <Text as={"b"} minW={24}>
              {t("weekDays.wednesday")}
            </Text>
            <Text>
              {restaurant.operatingHours.Wednesday.isOpen ? (
                restaurant.operatingHours.Wednesday.hours
              ) : (
                <Tag colorScheme="red">{t("common.content.closed")}</Tag>
              )}
            </Text>
          </Flex>
          <Flex
            borderBottom={"1px"}
            borderColor={Ecolors.REGULAR_GREY}
            gap={2}
            color={Ecolors.DARK_GREEN}
            pb={2}
          >
            <Text as={"b"} minW={24}>
              {t("weekDays.thursday")}
            </Text>
            <Text>
              {restaurant.operatingHours.Thursday.isOpen ? (
                restaurant.operatingHours.Thursday.hours
              ) : (
                <Tag colorScheme="red">{t("common.content.closed")}</Tag>
              )}
            </Text>
          </Flex>
          <Flex
            borderBottom={"1px"}
            borderColor={Ecolors.REGULAR_GREY}
            gap={2}
            color={Ecolors.DARK_GREEN}
            pb={2}
          >
            <Text as={"b"} minW={24}>
              {t("weekDays.friday")}
            </Text>
            <Text>
              {restaurant.operatingHours.Friday.isOpen ? (
                restaurant.operatingHours.Friday.hours
              ) : (
                <Tag colorScheme="red">{t("common.content.closed")}</Tag>
              )}
            </Text>
          </Flex>
          <Flex
            borderBottom={"1px"}
            borderColor={Ecolors.REGULAR_GREY}
            gap={2}
            color={Ecolors.DARK_GREEN}
            pb={2}
          >
            <Text as={"b"} minW={24}>
              {t("weekDays.saturday")}
            </Text>
            <Text>
              {restaurant.operatingHours.Saturday.isOpen ? (
                restaurant.operatingHours.Saturday.hours
              ) : (
                <Tag colorScheme="red">{t("common.content.closed")}</Tag>
              )}
            </Text>
          </Flex>
          <Flex
            borderBottom={"1px"}
            borderColor={Ecolors.REGULAR_GREY}
            gap={2}
            color={Ecolors.DARK_GREEN}
            pb={2}
          >
            <Text as={"b"} minW={24}>
              {t("weekDays.sunday")}
            </Text>
            <Text>
              {restaurant.operatingHours.Sunday.isOpen ? (
                restaurant.operatingHours.Sunday.hours
              ) : (
                <Tag colorScheme="red">{t("common.content.closed")}</Tag>
              )}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {true && (
        <CreateReviewForm
          setRestaurant={setRestaurant}
          restaurant_id={restaurant._id}
        />
      )}
      <Flex marginTop={10} flexDir={"column"} mx={10} align={"center"}>
        <Box>
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
            <ReviewCard
              key={idx}
              review={elm}
              setRestaurant={setRestaurant}
            ></ReviewCard>
          ))}
        </Box>
      </Flex>
      <Modal modalInfo={modalInfo} />
    </Flex>
  );
};

export default RestaurantView;
