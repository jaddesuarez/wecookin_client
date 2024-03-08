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
import { useRouter } from "next/router";
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
    <Flex my={3} flexDir={"column"} maxW={350}>
      <Flex w={"full"} justify={"space-between"} align={"center"}>
        <Flex marginBottom={3}>
          <Avatar size="lg" src={owner.avatar} marginEnd={2}></Avatar>
          <Text color={Ecolors.EXTRA_DARK_GREEN} as={"b"} alignSelf="center">
            {owner.username}
          </Text>
        </Flex>
        {isOwner && (
          <IconButton
            aria-label="delete comment"
            colorScheme="red"
            icon={<MdDelete />}
          />
        )}
      </Flex>
      <HStack>{starts}</HStack>
      <Text color={Ecolors.DARK_GREEN} fontSize="sm" py={3} textAlign="justify">
        {comment}
      </Text>
      <hr />
    </Flex>
  );
};

export default ReviewCard;
