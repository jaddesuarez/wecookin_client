import React, { FC, useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Box, Text, Avatar, IconButton, HStack } from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Ecolors } from "@/ui/theme/colors";
import { ReviewCardProps } from "./types";
import { AuthContext } from "@/context/auth.context";
import { useRouter } from "next/router";
import { useModal } from "@/context/modal.context";
import Modal from "@/ui/components/Modal/Modal";
import DeleteReviewForm from "../DeleteReviewForm/DeleteReviewForm";

const ReviewCard: FC<ReviewCardProps> = ({ review, setRestaurant }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { id: restaurant_id } = router.query;
  const { t } = useTranslation();
  const { openModal, modalInfo, setModalInfo } = useModal();
  const [starts, setStars] = useState<React.ReactNode[]>([]);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  const handleOpenModal = (criteria: string) => {
    switch (criteria) {
      case "deleteReview":
        setModalInfo({
          title: t("common.action.deleteReview"),
          content: (
            <DeleteReviewForm
              setRestaurant={setRestaurant}
              restaurant_id={restaurant_id as string}
              review_id={review._id}
            />
          ),
        });
        break;
    }
    openModal();
  };

  useEffect(() => {
    const starsData = [];
    for (let i = 0; i < review.rating; i++) {
      starsData.push(<FaStar key={`star_${i}`} color={Ecolors.LIGHT_YELLOW} />);
    }
    for (let i = 0; i < 5 - review.rating; i++) {
      starsData.push(
        <FaRegStar key={`regStar_${i}`} color={Ecolors.LIGHT_YELLOW} />
      );
    }
    setStars(starsData);
    setIsOwner(user?._id === review.owner?._id);
  }, [review, user]);

  return (
    <Flex
      flexDir={"column"}
      minW={[350, 400, 600, 900]}
      maxW={["full", "full", "full", 900]}
    >
      <Flex w={"full"} justify={"space-between"} align={"center"}>
        <Flex align={"center"}>
          <Avatar size="lg" src={review.owner?.avatar} marginEnd={2} />
          <Flex gap={2} flexDir={"column"}>
            <Text color={Ecolors.EXTRA_DARK_GREEN} as={"b"}>
              {review.owner?.username}
            </Text>
            <HStack>{starts}</HStack>
          </Flex>
        </Flex>
        {isOwner && (
          <IconButton
            onClick={() => handleOpenModal("deleteReview")}
            aria-label="delete comment"
            colorScheme="red"
            rounded={"full"}
            icon={<MdDelete />}
          />
        )}
      </Flex>
      <Flex>
        <Box border={"1px"} color={Ecolors.LIGHT_GREY} ms={8}></Box>
        <Text
          color={Ecolors.DARK_GREEN}
          fontSize="sm"
          ps={5}
          pt={3}
          pb={8}
          textAlign="justify"
        >
          {review.comment}
        </Text>
      </Flex>
      <Modal modalInfo={modalInfo} />
    </Flex>
  );
};

export default ReviewCard;
