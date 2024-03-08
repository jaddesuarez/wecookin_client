import React, { FC, useContext, useState } from "react";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  FormErrorMessage,
  Button,
  Input,
  Box,
} from "@chakra-ui/react";
import { AuthContext } from "@/context/auth.context";
import { Ecolors } from "@/ui/theme/colors";
import { auth } from "@/services/auth/auth.service";

interface IAuthForm {
  isLogginIn?: boolean;
}

const AuthForm: FC<IAuthForm> = ({ isLogginIn }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const validationSchema = isLogginIn
    ? yup.object({})
    : yup.object({
        email: yup
          .string()
          .email(t("yupValidation.emailInvalid"))
          .required(t("yupValidation.emailRequired")),
        password: yup
          .string()
          .required(t("yupValidation.passwordRequired"))
          .min(8, t("yupValidation.passwordMin"))
          .matches(/[a-z]/, t("yupValidation.passwordLowercase"))
          .matches(/[A-Z]/, t("yupValidation.passwordUppercase"))
          .matches(/[0-9]/, t("yupValidation.passwordDigit")),
      });

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        if (isLogginIn) {
          await auth
            .login(values)
            .then((data) => {
              const tokenFromServer = data.authToken;
              storeToken(tokenFromServer);
              authenticateUser();
            })
            .catch((err) => {
              setErrors(err);
            })
            .finally(() => {
              router.push("/profile");
            });
        } else {
          await auth
            .signup(values)
            .then()
            .catch((err) => {
              setErrors(err);
            })
            .finally(() => router.push("/login"));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Box display="grid">
        <FormControl
          isInvalid={formik.touched.email && formik.errors.email !== undefined}
          mb={5}
        >
          <Input
            type="email"
            placeholder={t("common.placeholder.email")}
            {...formik.getFieldProps("email")}
            isDisabled={formik.isSubmitting}
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={
            formik.touched.password && formik.errors.password !== undefined
          }
          mb={5}
        >
          <Input
            type="password"
            placeholder={t("common.placeholder.password")}
            {...formik.getFieldProps("password")}
            isDisabled={formik.isSubmitting}
          />
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>
        <Button
          color={Ecolors.WHITE}
          bgColor={Ecolors.DARK_GREEN}
          isLoading={formik.isSubmitting}
          mb={5}
          type="submit"
          isDisabled={formik.isSubmitting || !formik.isValid || !formik.touched}
        >
          {isLogginIn
            ? t("common.action.login")
            : t("common.action.createAccount")}
        </Button>
      </Box>
    </form>
  );
};

export default AuthForm;
