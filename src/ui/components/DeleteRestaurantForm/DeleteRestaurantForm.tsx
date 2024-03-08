import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { Flex, Button } from "@chakra-ui/react";
import { useModal } from "@/context/modal.context";
import { restaurants } from "@/services/restaurants/restaurants.service";
import { logDev } from "@/infrastructure/utils";

const DeleteRestaurantForm: FC<{ id: string }> = ({ id }) => {
  const { closeModal } = useModal();
  const { t } = useTranslation();
  const router = useRouter();

  const handleDeleteRestaurant = () => {
    restaurants
      .deleteRestaurant(id)
      .then(() => {
        closeModal();
        router.push("/");
      })
      .catch((err) => logDev(err));
  };
  return (
    <Flex gap={5}>
      <Button onClick={closeModal}>{t("common.action.cancel")}</Button>
      <Button colorScheme="red" onClick={handleDeleteRestaurant}>
        {t("common.action.delete")}
      </Button>
    </Flex>
  );
};

export default DeleteRestaurantForm;
