import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Button } from "@chakra-ui/react";
import { useModal } from "@/context/modal.context";
import { logDev } from "@/infrastructure/utils";
import { reviews } from "@/services/reviews/reviews.service";
import { IRestaurant } from "@/services/restaurants/types";

const DeleteReviewForm: FC<{
  review_id: string;
  restaurant_id: string;
  setRestaurant: (value: IRestaurant | null) => void;
}> = ({ review_id, restaurant_id, setRestaurant }) => {
  const { closeModal } = useModal();
  const { t } = useTranslation();

  const handleDeleteReview = () => {
    reviews
      .deleteReview(review_id, restaurant_id)
      .then((res) => {
        setRestaurant(res);
        closeModal();
      })
      .catch((err) => logDev(err));
  };
  return (
    <Flex gap={5}>
      <Button onClick={closeModal}>{t("common.action.cancel")}</Button>
      <Button colorScheme="red" onClick={handleDeleteReview}>
        {t("common.action.delete")}
      </Button>
    </Flex>
  );
};

export default DeleteReviewForm;
