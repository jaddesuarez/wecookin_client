import { FC } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import { IDataDisplayProps } from "./types";
import { Ecolors } from "../../../theme/colors";
import { useTranslation } from "react-i18next";

const DataDisplay: FC<IDataDisplayProps> = ({
  favoriteRestaurants = [],
  myRestaurants = [],
  isAdmin,
}) => {
  const { t } = useTranslation();
  return (
    <Flex justifyContent={"center"} color={Ecolors.DARK_GREEN}>
      <Box textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">
          {favoriteRestaurants.length}
        </Text>
        <Text fontSize="md">{t("common.content.favRestaurants")}</Text>
      </Box>
      {isAdmin && (
        <>
          <Box
            h={"55px"}
            w={"1px"}
            backgroundColor={Ecolors.LIGHT_GREY}
            mx={10}
          />
          <Box textAlign="center">
            <Text fontSize="2xl" fontWeight="bold">
              {myRestaurants.length}
            </Text>
            <Text fontSize="md">{t("common.content.myRestaurants")}</Text>
          </Box>
        </>
      )}
    </Flex>
  );
};

export default DataDisplay;
