import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Flex,
  Button,
  Textarea,
  Avatar,
  Text,
  HStack,
  InputGroup,
  InputLeftElement,
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

const CreateReviewForm: FC<{ restaurant_id: string }> = ({ restaurant_id }) => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  const validationSchema = yup.object({
    comment: yup.string().required(t("yupValidation.commentReview")),
  });

  const initialValues = {
    rating: 0,
    comment: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
      } catch (err) {
        logDev(err);
      } finally {
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
              <FaStar color={Ecolors.LIGHT_YELLOW} />
              <FaStar color={Ecolors.LIGHT_YELLOW} />
              <FaStar color={Ecolors.LIGHT_YELLOW} />
              <FaStar color={Ecolors.LIGHT_YELLOW} />
              <FaStar color={Ecolors.LIGHT_YELLOW} />
            </HStack>
          </Flex>
        </Flex>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FaStar color={Ecolors.LIGHT_YELLOW} />
          </InputLeftElement>
          <FormControl
            isInvalid={
              formik.touched.comment && formik.errors.comment !== undefined
            }
            mb={5}
          >
            <Textarea
              size="lg"
              resize="none"
              {...formik.getFieldProps("email")}
              placeholder={t("common.action.comment")}
            />
            <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
          </FormControl>
          <InputRightElement pointerEvents="none">
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
