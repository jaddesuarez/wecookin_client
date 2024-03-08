import React, { FC } from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { BsSend } from "react-icons/bs";
import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  Icon,
  FormControl,
  FormErrorMessage,
  Textarea,
  Alert,
  AlertIcon,
  Input,
  Button,
} from "@chakra-ui/react";
import { Ecolors } from "../../theme/colors";

const ContactView: FC = () => {
  const { t } = useTranslation();
  const [success, setSuccess] = useState(false);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(t("yupValidation.emailInvalid"))
      .required(t("yupValidation.emailRequired")),
    message: yup.string().required(t("yupValidation.messageRequired")),
  });

  const initialValues = {
    email: "",
    message: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        setSuccess(true);
      } catch (err) {
        setSuccess(false);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    setSuccess(false);
  }, [formik.values]);

  return (
    <Flex h={"100vh"} m={0} align={"center"}>
      <Flex
        display={["none", "none", "block", "block"]}
        m={0}
        w={"50%"}
        justify={"center"}
        align={"end"}
      >
        <Image
          h={"100vh"}
          src="/Images/contactimage.png"
          alt="Contact Image"
        ></Image>
      </Flex>

      <Flex
        borderLeft={["0px", "0px", "2px", "2px"]}
        borderLeftColor={Ecolors.BLACK}
        w={["100%", "100%", "50%", "50%"]}
        h={"100%"}
        justify={"center"}
        align={"center"}
        backgroundColor={Ecolors.LIGHT_YELLOW}
      >
        <Box maxW={"360px"} mx={10}>
          <Heading textAlign="center" color={Ecolors.EXTRA_DARK_GREEN} mb={7}>
            {t("contactPage.heading")}
          </Heading>
          <Text
            textAlign="center"
            color={Ecolors.EXTRA_DARK_GREEN}
            fontWeight="thin"
            w="380px"
            mb={10}
          >
            {t("contactPage.content")}
          </Text>
          <form onSubmit={formik.handleSubmit} noValidate>
            <Box display={"grid"}>
              <FormControl
                isInvalid={
                  formik.touched.email && formik.errors.email !== undefined
                }
                mb={5}
              >
                <Input
                  variant="filled"
                  type="email"
                  placeholder={t("common.placeholder.email")}
                  borderColor={Ecolors.BLACK}
                  {...formik.getFieldProps("email")}
                  isDisabled={formik.isSubmitting}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  formik.touched.message && formik.errors.message !== undefined
                }
                mb={5}
              >
                <Textarea
                  variant="filled"
                  {...formik.getFieldProps("message")}
                  isDisabled={formik.isSubmitting}
                  h={"150px"}
                  placeholder={t("common.placeholder.message")}
                  borderColor={Ecolors.BLACK}
                />
                <FormErrorMessage>{formik.errors.message}</FormErrorMessage>
              </FormControl>
              <Button
                mb={5}
                type="submit"
                bgColor={Ecolors.DARK_GREEN}
                color={Ecolors.WHITE}
                isDisabled={
                  formik.isSubmitting || !formik.isValid || !formik.touched
                }
                leftIcon={<Icon as={BsSend} />}
              >
                {t("common.action.sendMessage")}
              </Button>
            </Box>
          </form>
          {success && (
            <Alert status="success">
              <AlertIcon />
              {t("contactPage.successMessage")}
            </Alert>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default ContactView;
