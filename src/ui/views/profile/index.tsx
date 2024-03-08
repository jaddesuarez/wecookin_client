import React, { FC, useContext } from "react";
import { useState } from "react";
import {
  Box,
  Flex,
  Icon,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Image,
} from "@chakra-ui/react";
import { FaHeart, FaStar, FaClone } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { Ecolors } from "@/ui/theme/colors";
import { AuthContext } from "@/context/auth.context";
import withAuth from "@/middleware/withAuth";
import RestaurantForm from "@/ui/components/RestaurantForm/RestaurantForm";
import { isAdmin } from "@/infrastructure/utils";
import { useTranslation } from "react-i18next";
import FavRestaurantsTab from "@/ui/components/FavRestaurantsTab/FavRestaurantsTab";
import MyRestaurantsTab from "@/ui/components/MyRestaurantsTab/MyRestaurantsTab";
import SettingsTab from "@/ui/components/SettingsTab/SettingsTab";

const ProfileView: FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <>
      <Tabs
        position="relative"
        variant="unstyled"
        index={selectedTab}
        onChange={handleTabChange}
      >
        <Flex
          w={"100%"}
          h={"200px"}
          backgroundColor={Ecolors.LIGHT_GREY}
          align={"end"}
          ps={10}
        >
          <TabList color={Ecolors.DARK_GREEN} gap={10}>
            <Tab fontWeight={selectedTab === 0 ? "bold" : "thin"}>
              <Icon as={FaHeart} />
              <Text mx={2} display={["none", "none", "block", "block"]}>
                {t("common.content.favRestaurants")}
              </Text>
            </Tab>
            {isAdmin(user) && (
              <Tab fontWeight={selectedTab === 1 ? "bold" : "thin"}>
                <Icon as={FaStar} />
                <Text mx={2} display={["none", "none", "block", "block"]}>
                  {t("common.content.myRestaurants")}
                </Text>
              </Tab>
            )}
            <Tab fontWeight={selectedTab === 2 ? "bold" : "thin"}>
              <Icon as={IoMdSettings} />
              <Text mx={2} display={["none", "none", "block", "block"]}>
                {t("common.content.settings")}
              </Text>
            </Tab>
            {isAdmin(user) && (
              <Tab fontWeight={selectedTab === 3 ? "bold" : "thin"}>
                <Icon as={FaClone} />
                <Text mx={2} display={["none", "none", "block", "block"]}>
                  {t("common.content.newRestaurant")}
                </Text>
              </Tab>
            )}
          </TabList>
        </Flex>
        <Box w={"100%"} h={"2px"} backgroundColor={Ecolors.LIGHT_GREY} />
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg={Ecolors.REGULAR_ORANGE}
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <FavRestaurantsTab />
          </TabPanel>
          {isAdmin(user) && (
            <TabPanel>
              <MyRestaurantsTab />
            </TabPanel>
          )}
          <TabPanel>
            <SettingsTab />
          </TabPanel>
          {isAdmin(user) && (
            <TabPanel>
              <Flex
                flexDir={["column", "column", "row", "row"]}
                align="center"
                justify="space-evenly"
              >
                <Image
                  boxSize={400}
                  objectFit="cover"
                  alt="New Restaurant Image"
                  src="https://res.cloudinary.com/dp0abawuh/image/upload/v1709592941/WeCookin/qgvrwdmbyrz5pq7iinc7.png"
                />
                <RestaurantForm />
              </Flex>
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </>
  );
};

export default withAuth(ProfileView);
