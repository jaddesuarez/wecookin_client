import React, { FC } from "react";
import { Flex, Box, Image, Tag, Text } from "@chakra-ui/react";
import { Ecolors } from "@/ui/theme/colors";
import { IoLocationOutline } from "react-icons/io5";
import { IRestaurantListCardProps } from "./types";
import { useRouter } from "next/router";

const RestaurantListCard: FC<IRestaurantListCardProps> = ({
  _id,
  name,
  neighborhood,
  cuisineType,
  image,
}) => {
  const router = useRouter();
  return (
    <Flex
      w={"full"}
      borderBottom={"1px"}
      borderColor={Ecolors.REGULAR_GREY}
      p={5}
      justify={"start"}
      cursor={"pointer"}
      onClick={() => router.push(`/restaurants/${_id}`)}
    >
      <Image
        src={image}
        objectFit={"cover"}
        boxSize={"130px"}
        borderRadius={"20px"}
        marginEnd={3}
      />
      <Flex flexDir={"column"} align={"start"} justify={"space-around"} py={5}>
        <Box>
          <Tag
            size={"md"}
            variant="solid"
            color={Ecolors.WHITE}
            backgroundColor={Ecolors.REGULAR_ORANGE}
          >
            {cuisineType.cuisine as string}
          </Tag>
        </Box>
        <Text
          as={"b"}
          fontSize={["md", "xl", "xl", "xl"]}
          color={Ecolors.DARK_GREEN}
        >
          {name}
        </Text>
        <Flex color={Ecolors.EXTRA_DARK_GREEN}>
          <IoLocationOutline />
          <Text fontSize={"sm"} as={"b"} ms={1}>
            {neighborhood}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RestaurantListCard;
