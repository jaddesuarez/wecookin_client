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
  Text,
  Flex,
  HStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FaCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "@/context/auth.context";
import { Ecolors } from "@/ui/theme/colors";
import { auth } from "@/services/auth/auth.service";
import ErrorText from "../ErrorText/ErrorText";
import { logDev } from "@/infrastructure/utils";

interface IAuthForm {
  isLogginIn?: boolean;
}

const AuthForm: FC<IAuthForm> = ({ isLogginIn }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  const [showPassrod, setShowPassrod] = useState<boolean>(false);
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const validationSchema = isLogginIn
    ? yup.object({
        email: yup
          .string()
          .email(t("yupValidation.emailInvalid"))
          .required(t("yupValidation.emailRequired")),
        password: yup.string().required(t("yupValidation.passwordRequired")),
      })
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
              router.push("/profile");
            })
            .catch((err) => {
              setErrors(err);
            });
        } else {
          await auth
            .signup(values)
            .then(() => router.push("/login"))
            .catch((err) => {
              setErrors(err);
            });
        }
      } catch (err) {
        logDev(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Box
        p={10}
        display="grid"
        border="1px"
        borderColor={Ecolors.DARK_GREEN}
        borderRadius={20}
        shadow="lg"
        boxShadow="0 0 20px grey"
      >
        <Text
          color={Ecolors.EXTRA_DARK_GREEN}
          fontSize={30}
          as={"b"}
          textAlign={"center"}
          marginBottom={3}
        >
          {isLogginIn ? t("loginPage.heading") : t("signupPage.heading")}
        </Text>
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
          <InputGroup>
            <Input
              type={showPassrod ? "text" : "password"}
              placeholder={t("common.placeholder.password")}
              {...formik.getFieldProps("password")}
              isDisabled={formik.isSubmitting}
            />
            <InputRightElement onClick={() => setShowPassrod(!showPassrod)}>
              {showPassrod ? (
                <FaRegEye color={Ecolors.REGULAR_GREY} />
              ) : (
                <FaRegEyeSlash color={Ecolors.REGULAR_GREY} />
              )}
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>
        <Button
          color={Ecolors.WHITE}
          bgColor={Ecolors.DARK_GREEN}
          isLoading={formik.isSubmitting}
          type="submit"
          isDisabled={formik.isSubmitting || !formik.isValid || !formik.touched}
        >
          {isLogginIn
            ? t("common.action.login")
            : t("common.action.createAccount")}
        </Button>
        {errors &&
          errors.map((elm, idx) => <ErrorText key={idx} error={elm} />)}
        <Flex justify={"center"} gap={2} my={2}>
          <Text color={Ecolors.DARK_GREEN} fontSize={16} textAlign={"center"}>
            {isLogginIn ? t("loginPage.content") : t("signupPage.content")}
          </Text>
          <Text
            cursor={"pointer"}
            textDecor={"underline"}
            onClick={() => {
              isLogginIn ? router.push("/signup") : router.push("/login");
            }}
            color={Ecolors.DARK_GREEN}
            fontSize={16}
            textAlign={"center"}
          >
            {isLogginIn ? t("signupPage.heading") : t("loginPage.heading")}
          </Text>
        </Flex>
      </Box>
      <HStack justifyContent={"center"} marginTop={10} gap={3}>
        <FaCircle size={30} color={Ecolors.LIGHT_YELLOW} />
        <FaCircle size={30} color={Ecolors.REGULAR_ORANGE} />
        <FaCircle size={30} color={Ecolors.LIGHT_GREEN} />
        <FaCircle size={30} color={Ecolors.EXTRA_DARK_GREEN} />
        <FaCircle size={30} color={Ecolors.EXTRA_DARK_GREEN} />
      </HStack>
    </form>
  );
};

export default AuthForm;
