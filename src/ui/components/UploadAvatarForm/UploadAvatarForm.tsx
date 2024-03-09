import React, {
  FC,
  useState,
  CSSProperties,
  useRef,
  RefObject,
  useContext,
} from "react";
import { useTranslation } from "react-i18next";
import { Flex, Input, Button, FormControl, Avatar } from "@chakra-ui/react";
import { useFormik } from "formik";
import BounceLoader from "react-spinners/BounceLoader";
import { Ecolors } from "@/ui/theme/colors";
import { AuthContext } from "@/context/auth.context";
import { upload } from "@/services/cloudinary/cloudinary.service";
import { IUpload } from "@/services/cloudinary/types";
import { users } from "@/services/user/user.service";
import { logDev } from "@/infrastructure/utils";
import ErrorText from "../ErrorText/ErrorText";
import { ILoggedUser } from "@/services/auth/types";
import { useModal } from "@/context/modal.context";
import { auth } from "@/services/auth/auth.service";

const UploadAvatarForm: FC<ILoggedUser> = (user) => {
  const { t } = useTranslation();
  const { closeModal } = useModal();
  const inputUserImageRef: RefObject<HTMLInputElement> = useRef(null);
  const { storeToken, authenticateUser, setUser } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const { editUser } = users;
  const [userValues] = useState({
    ...user,
    username: "" || user.username,
    email: "" || user.email,
  });
  const [userImageSrc, setUserImageSrc] = useState<string | null>(
    user?.avatar || null
  );
  const [loadingUserImage, setUserLoadingImage] = useState<boolean>(false);
  const override: CSSProperties = {
    margin: "50px",
  };

  const formik = useFormik({
    initialValues: userValues,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await editUser(values).then((res) => setUser(res));
        await auth.updateToken().then((res) => {
          storeToken(res);
          authenticateUser();
        });
        closeModal();
      } catch (err) {
        logDev(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleUserFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserLoadingImage(true);
    const imageForm = new FormData();
    const files = event.target.files;
    if (files && files.length) {
      imageForm.append("imageUrl", files[0]);
      const uploadData: IUpload = {
        imageUrl: imageForm,
      };
      upload
        .uploadImage(uploadData)
        .then((data) => {
          formik.setFieldValue("avatar", data);
          setUserImageSrc(data);
        })
        .catch((err) => {
          setError("File size too large");
          logDev(err);
        })
        .finally(() => setUserLoadingImage(false));
    }
  };

  return (
    <FormControl>
      <Flex flexDirection={"column"} gap={3} align={"center"}>
        {loadingUserImage ? (
          <BounceLoader
            color={Ecolors.LIGHT_GREEN}
            cssOverride={override}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          userImageSrc && (
            <Avatar boxSize={120} src={userImageSrc} marginBottom={3} />
          )
        )}
        <Input
          type="file"
          id="user-file-upload"
          size="md"
          variant="unstyled"
          onChange={handleUserFileChange}
          accept=".jpg,.png"
          hidden
          ref={inputUserImageRef}
        />
        <Button
          isDisabled={loadingUserImage}
          as="label"
          htmlFor="user-file-upload"
          size="md"
          cursor="pointer"
        >
          {t("common.action.uploadImage")}
        </Button>
        {error && <ErrorText error={error} />}
      </Flex>
      <Flex my={5} justify={"end"}>
        <Button
          as="b"
          size="sm"
          textTransform="uppercase"
          isDisabled={loadingUserImage}
          onClick={() => formik.handleSubmit()}
          color={Ecolors.EXTRA_DARK_GREEN}
          backgroundColor={Ecolors.REGULAR_ORANGE}
        >
          {t("common.action.save")}
        </Button>
      </Flex>
    </FormControl>
  );
};

export default UploadAvatarForm;
