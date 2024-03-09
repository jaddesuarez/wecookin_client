import React, { FC, useEffect, useState, useContext } from "react";
import {
  Flex,
  Box,
  Image,
  Tag,
  Text,
  Avatar,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Ecolors } from "@/ui/theme/colors";
import { ReviewCardProps } from "./types";
import { AuthContext } from "@/context/auth.context";

const ReviewCard: FC<ReviewCardProps> = ({
  _id,
  comment,
  rating = 4,
  owner,
}) => {
  const { user } = useContext(AuthContext);
  const [starts, setStars] = useState<React.ReactNode[]>([]);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  useEffect(() => {
    const startsData = [];
    for (let i = 0; i < rating; i++) {
      startsData.push(
        <FaStar key={`star_${i}`} color={Ecolors.LIGHT_YELLOW} />
      );
    }
    for (let i = 0; i < 5 - rating; i++) {
      startsData.push(
        <FaRegStar key={`regStar_${i}`} color={Ecolors.LIGHT_YELLOW} />
      );
    }
    setStars(startsData);
    setIsOwner(user?._id === owner._id);
  }, [rating, user]);
  return (
    <Flex flexDir={"column"} maxW={["full", "full", "full", 900]}>
      <Flex w={"full"} justify={"space-between"} align={"center"}>
        <Flex align={"center"}>
          <Avatar size="lg" src={owner.avatar} marginEnd={2} />
          <Flex gap={2} flexDir={"column"}>
            <Text color={Ecolors.EXTRA_DARK_GREEN} as={"b"}>
              {owner.username}
            </Text>
            <HStack>{starts}</HStack>
          </Flex>
        </Flex>
        {isOwner && (
          <IconButton
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
          {comment}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ReviewCard;
