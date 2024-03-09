import React, {
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
import { auth } from "@/services/auth/auth.service";
import { logDev } from "@/infrastructure/utils";
import ErrorText from "../ErrorText/ErrorText";

function UploadAvatarForm() {
  const { t } = useTranslation();
  const inputRef: RefObject<HTMLInputElement> = useRef(null);
  const { user, storeToken, authenticateUser } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const { editUser } = users;
  const [userValues] = useState({
    ...user,
    username: "" || user?.username,
    email: "" || user?.email,
  });
  const [imageSrc, setImageSrc] = useState<string | null>(user?.avatar || null);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const override: CSSProperties = {
    margin: "50px",
  };

  const formik = useFormik({
    initialValues: userValues,
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingImage(true);
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
          formik.setFieldValue("image", data);
          setImageSrc(data);
        })
        .catch((err) => {
          console.log("entro aqui?");
          setError("File size too large");
          logDev(err);
        })
        .finally(() => setLoadingImage(false));
    }
  };

  console.log({ error });
  console.log({ imageSrc });
  console.log(formik.values);

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
  };

  return (
    <FormControl>
      <Flex flexDirection={"column"} gap={3} align={"center"}>
        {loadingImage ? (
          <BounceLoader
            color={Ecolors.LIGHT_GREEN}
            cssOverride={override}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          imageSrc && <Avatar boxSize={120} src={imageSrc} marginBottom={3} />
        )}
        <Input
          type="file"
          id="file-upload"
          size="md"
          variant="unstyled"
          onChange={handleFileChange}
          accept=".jpg,.png"
          hidden
          ref={inputRef}
        />
        <Button
          onClick={(e) => e.preventDefault}
          isDisabled={loadingImage}
          as="label"
          htmlFor="file-upload"
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
          isDisabled={loadingImage}
          type="submit"
          onClick={handleSubmit}
          color={Ecolors.EXTRA_DARK_GREEN}
          backgroundColor={Ecolors.REGULAR_ORANGE}
        >
          {t("common.action.save")}
        </Button>
      </Flex>
    </FormControl>
  );
}

export default UploadAvatarForm;
