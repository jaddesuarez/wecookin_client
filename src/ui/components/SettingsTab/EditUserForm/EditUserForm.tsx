import { FC, useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import {
  Input,
  Button,
  Flex,
  Text,
  FormControl,
  FormErrorMessage,
  Box,
  FormLabel,
} from "@chakra-ui/react";
// import UploadNewAvatarForm from "../../UploadNewAvatarForm/UploadNewAvatarForm";
import { Ecolors } from "../../../theme/colors";
import { useModal } from "@/context/modal.context";
import Modal from "@/ui/components/Modal/Modal";
import { users } from "@/services/user/user.service";
import { ILoggedUser } from "@/services/auth/types";
import { logDev } from "@/infrastructure/utils";
import { auth } from "@/services/auth/auth.service";
import { AuthContext } from "@/context/auth.context";

const EditUserForm: FC<ILoggedUser> = (user) => {
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const { openModal, modalInfo, setModalInfo } = useModal();
  const { t } = useTranslation();
  const { editUser } = users;
  const [userValues] = useState({
    ...user,
    username: "" || user.username,
    email: "" || user.email,
  });

  const validationSchema = yup.object({
    username: yup
      .string()
      .required(t("yupValidation.usernameRequired"))
      .max(30, t("yupValidation.30CharsMax")),
    email: yup
      .string()
      .email(t("yupValidation.emailInvalid"))
      .required(t("yupValidation.emailRequired")),
  });

  const formik = useFormik({
    initialValues: userValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await editUser(values);
        await auth.updateToken().then((res) => {
          storeToken(res);
          authenticateUser();
        });
      } catch (err) {
        logDev(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleOpenModal = (criteria: string) => {
    switch (criteria) {
      case "uploadAvatar":
        setModalInfo({
          title: t("common.action.uploadAvatar"),
          //   content: <UploadNewAvatarForm />,
        });
        break;
    }
    openModal();
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Flex justify={"space-between"} mb={5} mx={5} minW={350}>
          <Text as="b" textTransform="uppercase">
            {t("common.content.basicInfo")}
          </Text>
          <Button
            type="submit"
            as="button"
            size="sm"
            cursor={"pointer"}
            textTransform="uppercase"
            color={Ecolors.DARK_GREEN}
            backgroundColor={Ecolors.LIGHT_YELLOW}
            isDisabled={
              formik.isSubmitting || !formik.isValid || !formik.touched
            }
          >
            {t("common.action.save")}
          </Button>
        </Flex>
        <Box mb={5} w={"100%"} h={"1px"} backgroundColor={Ecolors.LIGHT_GREY} />
        <Flex flexDirection="column" justify="center">
          <FormControl
            isInvalid={
              formik.touched.username && formik.errors.username !== undefined
            }
            mb={5}
          >
            <FormLabel htmlFor="username">
              {t("common.placeholder.username")}
            </FormLabel>
            <Input
              id="username"
              type="text"
              placeholder={t("common.placeholder.username")}
              {...formik.getFieldProps("username")}
              isDisabled={formik.isSubmitting}
              value={formik.values.username}
            />
            <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={
              formik.touched.email && formik.errors.email !== undefined
            }
            mb={5}
          >
            <FormLabel htmlFor="email">
              {t("common.placeholder.email")}
            </FormLabel>
            <Input
              id="email"
              type="email"
              placeholder={t("common.placeholder.email")}
              {...formik.getFieldProps("email")}
              isDisabled={formik.isSubmitting}
              value={formik.values.email}
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>
          <Button
            mb={5}
            color={Ecolors.DARK_GREEN}
            backgroundColor={Ecolors.LIGHT_YELLOW}
            isDisabled={formik.isSubmitting}
            onClick={() => handleOpenModal("uploadAvatar")}
          >
            {t("common.action.uploadAvatar")}
          </Button>
        </Flex>
      </form>
      <Modal modalInfo={modalInfo} />
    </>
  );
};

export default EditUserForm;
