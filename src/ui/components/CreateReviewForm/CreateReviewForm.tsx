import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Flex,
  Textarea,
  Avatar,
  Text,
  HStack,
  InputGroup,
  InputRightElement,
  IconButton,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { AuthContext } from "@/context/auth.context";
import { Ecolors } from "@/ui/theme/colors";
import { logDev } from "@/infrastructure/utils";
import { reviews } from "@/services/reviews/reviews.service";
import { IRestaurant } from "@/services/restaurants/types";

const CreateReviewForm: FC<{
  setRestaurant: (value: IRestaurant | null) => void;
  restaurant_id: string;
}> = ({ setRestaurant, restaurant_id }) => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  const validationSchema = yup.object({
    comment: yup.string().required(t("yupValidation.commentReview")),
  });

  const initialValues = {
    rating: 0,
    comment: "",
  };

  const handleHating = (rating: number) => {
    formik.setFieldValue("rating", rating);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        reviews.createReview(restaurant_id, values).then((res) => {
          setRestaurant(res);
        });
      } catch (err) {
        logDev(err);
      } finally {
        resetForm();
        setSubmitting(false);
      }
    },
  });

  return (
    <Flex flexDir={"column"} mt={10} w={"full"} align={"center"} gap={5}>
      <Flex flexDir={"column"} w={["90%", "90%", "70%", "60%"]} gap={3}>
        <Flex align={"center"}>
          <Avatar size="lg" src={user?.avatar} marginEnd={2} />
          <Flex gap={2} flexDir={"column"}>
            <Text color={Ecolors.EXTRA_DARK_GREEN} as={"b"}>
              {user?.username}
            </Text>
            <HStack>
              {formik.values.rating >= 1 ? (
                <FaStar
                  color={Ecolors.LIGHT_YELLOW}
                  onClick={() =>
                    handleHating(formik.values.rating >= 2 ? 1 : 0)
                  }
                />
              ) : (
                <FaRegStar
                  color={Ecolors.LIGHT_YELLOW}
                  onClick={() => handleHating(1)}
                />
              )}
              {formik.values.rating >= 2 ? (
                <FaStar
                  color={Ecolors.LIGHT_YELLOW}
                  onClick={() => handleHating(2)}
                />
              ) : (
                <FaRegStar
                  color={Ecolors.LIGHT_YELLOW}
                  onClick={() => handleHating(2)}
                />
              )}
              {formik.values.rating >= 3 ? (
                <FaStar
                  color={Ecolors.LIGHT_YELLOW}
                  onClick={() => handleHating(3)}
                />
              ) : (
                <FaRegStar
                  color={Ecolors.LIGHT_YELLOW}
                  onClick={() => handleHating(3)}
                />
              )}
              {formik.values.rating >= 4 ? (
                <FaStar
                  color={Ecolors.LIGHT_YELLOW}
                  onClick={() => handleHating(4)}
                />
              ) : (
                <FaRegStar
                  color={Ecolors.LIGHT_YELLOW}
                  onClick={() => handleHating(4)}
                />
              )}
              {formik.values.rating >= 5 ? (
                <FaStar
                  color={Ecolors.LIGHT_YELLOW}
                  onClick={() => handleHating(5)}
                />
              ) : (
                <FaRegStar
                  color={Ecolors.LIGHT_YELLOW}
                  onClick={() => handleHating(5)}
                />
              )}
            </HStack>
          </Flex>
        </Flex>
        <InputGroup>
          <FormControl
            isInvalid={
              formik.touched.comment && formik.errors.comment !== undefined
            }
            mb={5}
          >
            <Textarea
              size="sm"
              resize="none"
              {...formik.getFieldProps("comment")}
              placeholder={t("common.action.comment")}
            />
            <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
          </FormControl>
          <InputRightElement
            onClick={() => formik.handleSubmit()}
            pointerEvents="visible"
          >
            <IconButton
              colorScheme="black"
              color="grey"
              variant="ghost"
              icon={<FiSend />}
              aria-label="comment restaurant"
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Flex>
  );
};

export default CreateReviewForm;
