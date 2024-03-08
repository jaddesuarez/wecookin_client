import React, {
  FC,
  useState,
  useEffect,
  useRef,
  RefObject,
  CSSProperties,
} from "react";
import { useTranslation } from "react-i18next";
import {
  Flex,
  FormControl,
  Input,
  Select,
  FormErrorMessage,
  Button,
  Image,
  FormLabel,
  Switch,
  Text,
} from "@chakra-ui/react";
import { cuisines } from "@/services/cuisines/cuisines.service";
import { useFormik } from "formik";
import * as yup from "yup";
import { logDev } from "@/infrastructure/utils";
import { Ecolors } from "@/ui/theme/colors";
import { restaurants } from "@/services/restaurants/restaurants.service";
import { IUpload } from "@/services/cloudinary/types";
import { upload } from "@/services/cloudinary/cloudinary.service";
import BounceLoader from "react-spinners/BounceLoader";
import { useModal } from "@/context/modal.context";

import { EditRestaurantFormProps } from "./types";

const EditRestaurantForm: FC<EditRestaurantFormProps> = ({
  loadData,
  restaurant,
}) => {
  const { t } = useTranslation();
  const { closeModal } = useModal();
  const inputRef: RefObject<HTMLInputElement> = useRef(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [restaurantData] = useState({
    ...restaurant,
    cuisineType: restaurant?.cuisineType._id,
  });
  const [cousinesOptions, setCousinesOptions] = useState<
    React.ReactNode[] | null
  >(null);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const override: CSSProperties = {
    margin: "50px",
  };

  const daySchema = yup.object().shape({
    isOpen: yup.boolean(),
    hours: yup
      .string()
      .test(
        "is-open-hours-required",
        t("yupValidation.operatingHours"),
        function (value) {
          if (this.parent.isOpen) {
            return value != null && value.trim() !== "";
          }
          return true;
        }
      ),
  });

  const validationSchema = yup.object({
    name: yup.string().required(t("yupValidation.name")),
    cuisineType: yup.string().required(t("yupValidation.cuisineType")),
    operatingHours: yup.object({
      Monday: daySchema,
      Tuesday: daySchema,
      Wednesday: daySchema,
      Thursday: daySchema,
      Friday: daySchema,
      Saturday: daySchema,
      Sunday: daySchema,
    }),
  });

  const formik = useFormik({
    initialValues: restaurantData,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        restaurants
          .editRestaurant(restaurant?._id, values)
          .then((res) => {
            closeModal();
            loadData();
          })
          .catch((err) => logDev(err));
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
        .catch((err) => logDev(err))
        .finally(() => setLoadingImage(false));
    }
  };

  useEffect(() => {
    setImageSrc(restaurant.image);
    cuisines
      .getAllCuisines()
      .then((res) => {
        console.log({ res });
        setCousinesOptions(
          res.map((elm, idx) => (
            <option key={idx} value={elm._id}>
              {elm.cuisine}
            </option>
          ))
        );
      })
      .catch((err) => logDev(err));
  }, []);
  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Flex
        maxH={"60vh"}
        overflow={["hidden", "hidden", "scroll", "scroll"]}
        flexDir={"column"}
        gap={5}
        minW={400}
        mb={8}
        px={3}
      >
        <FormControl
          isInvalid={formik.touched.name && formik.errors.name !== undefined}
        >
          <Input
            id="name"
            type="text"
            placeholder="Restaurant Name"
            {...formik.getFieldProps("name")}
          />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={
            formik.touched.cuisineType &&
            formik.errors.cuisineType !== undefined
          }
        >
          <FormLabel htmlFor="cuisine">
            {t("common.placeholder.cuisine")}
          </FormLabel>
          <Select
            id="cuisine"
            {...formik.getFieldProps("cuisineType")}
            placeholder="Select option"
          >
            {cousinesOptions}
          </Select>
          <FormErrorMessage>{formik.errors.cuisineType}</FormErrorMessage>
        </FormControl>
        <FormControl>
          {loadingImage ? (
            <BounceLoader
              color={Ecolors.LIGHT_GREEN}
              cssOverride={override}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            imageSrc && <Image boxSize={120} src={imageSrc} marginBottom={3} />
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
            onClick={() => inputRef.current?.click()}
            isDisabled={loadingImage}
            as="label"
            htmlFor="file-upload"
            size="md"
            cursor="pointer"
          >
            {t("common.action.uploadImage")}
          </Button>
        </FormControl>
        <Text>{t("weekDays.oppeningHours")}</Text>
        <Flex>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="Monday" mb="0">
              {t("weekDays.monday")}
            </FormLabel>
            <Switch
              {...formik.getFieldProps("operatingHours.Monday.isOpen")}
              isChecked={formik.values.operatingHours?.Monday.isOpen}
              colorScheme="teal"
              id="Monday"
            />
          </FormControl>
          {formik.values.operatingHours?.Monday.isOpen && (
            <FormControl
              isInvalid={
                formik.touched.operatingHours?.Monday?.hours &&
                formik.errors.operatingHours?.Monday?.hours !== undefined
              }
            >
              <Input
                id="name"
                type="text"
                size="sm"
                placeholder="Sample: 13pm - 22pm"
                {...formik.getFieldProps("operatingHours.Monday.hours")}
              />
              <FormErrorMessage>
                {formik.errors.operatingHours?.Monday?.hours}
              </FormErrorMessage>
            </FormControl>
          )}
        </Flex>
        <Flex>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="Tuesday" mb="0">
              {t("weekDays.tuesday")}
            </FormLabel>
            <Switch
              {...formik.getFieldProps("operatingHours.Tuesday.isOpen")}
              isChecked={formik.values.operatingHours?.Tuesday.isOpen}
              colorScheme="teal"
              id="Tuesday"
            />
          </FormControl>
          {formik.values.operatingHours?.Tuesday.isOpen && (
            <FormControl
              isInvalid={
                formik.touched.operatingHours?.Tuesday?.hours &&
                formik.errors.operatingHours?.Tuesday?.hours !== undefined
              }
            >
              <Input
                id="name"
                type="text"
                size="sm"
                placeholder="Sample: 13pm - 22pm"
                {...formik.getFieldProps("operatingHours.Tuesday.hours")}
              />
              <FormErrorMessage>
                {formik.errors.operatingHours?.Tuesday?.hours}
              </FormErrorMessage>
            </FormControl>
          )}
        </Flex>
        <Flex>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="Wednesday" mb="0">
              {t("weekDays.wednesday")}
            </FormLabel>
            <Switch
              {...formik.getFieldProps("operatingHours.Wednesday.isOpen")}
              isChecked={formik.values.operatingHours?.Wednesday.isOpen}
              colorScheme="teal"
              id="Wednesday"
            />
          </FormControl>
          {formik.values.operatingHours?.Wednesday.isOpen && (
            <FormControl
              isInvalid={
                formik.touched.operatingHours?.Wednesday?.hours &&
                formik.errors.operatingHours?.Wednesday?.hours !== undefined
              }
            >
              <Input
                id="name"
                type="text"
                size="sm"
                placeholder="Sample: 13pm - 22pm"
                {...formik.getFieldProps("operatingHours.Wednesday.hours")}
              />
              <FormErrorMessage>
                {formik.errors.operatingHours?.Wednesday?.hours}
              </FormErrorMessage>
            </FormControl>
          )}
        </Flex>
        <Flex>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="Thursday" mb="0">
              {t("weekDays.thursday")}
            </FormLabel>
            <Switch
              {...formik.getFieldProps("operatingHours.Thursday.isOpen")}
              isChecked={formik.values.operatingHours?.Thursday.isOpen}
              colorScheme="teal"
              id="Thursday"
            />
          </FormControl>
          {formik.values.operatingHours?.Thursday.isOpen && (
            <FormControl
              isInvalid={
                formik.touched.operatingHours?.Thursday?.hours &&
                formik.errors.operatingHours?.Thursday?.hours !== undefined
              }
            >
              <Input
                id="name"
                type="text"
                size="sm"
                placeholder="Sample: 13pm - 22pm"
                {...formik.getFieldProps("operatingHours.Thursday.hours")}
              />
              <FormErrorMessage>
                {formik.errors.operatingHours?.Thursday?.hours}
              </FormErrorMessage>
            </FormControl>
          )}
        </Flex>
        <Flex>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="Friday" mb="0">
              {t("weekDays.friday")}
            </FormLabel>
            <Switch
              {...formik.getFieldProps("operatingHours.Friday.isOpen")}
              isChecked={formik.values.operatingHours?.Friday.isOpen}
              colorScheme="teal"
              id="Friday"
            />
          </FormControl>
          {formik.values.operatingHours?.Friday.isOpen && (
            <FormControl
              isInvalid={
                formik.touched.operatingHours?.Friday?.hours &&
                formik.errors.operatingHours?.Friday?.hours !== undefined
              }
            >
              <Input
                id="name"
                type="text"
                size="sm"
                placeholder="Sample: 13pm - 22pm"
                {...formik.getFieldProps("operatingHours.Friday.hours")}
              />
              <FormErrorMessage>
                {formik.errors.operatingHours?.Friday?.hours}
              </FormErrorMessage>
            </FormControl>
          )}
        </Flex>
        <Flex>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="Saturday" mb="0">
              {t("weekDays.saturday")}
            </FormLabel>
            <Switch
              {...formik.getFieldProps("operatingHours.Saturday.isOpen")}
              isChecked={formik.values.operatingHours?.Saturday.isOpen}
              colorScheme="teal"
              id="Saturday"
            />
          </FormControl>
          {formik.values.operatingHours?.Saturday.isOpen && (
            <FormControl
              isInvalid={
                formik.touched.operatingHours?.Saturday?.hours &&
                formik.errors.operatingHours?.Saturday?.hours !== undefined
              }
            >
              <Input
                id="name"
                type="text"
                size="sm"
                placeholder="Sample: 13pm - 22pm"
                {...formik.getFieldProps("operatingHours.Saturday.hours")}
              />
              <FormErrorMessage>
                {formik.errors.operatingHours?.Saturday?.hours}
              </FormErrorMessage>
            </FormControl>
          )}
        </Flex>
        <Flex>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="Sunday" mb="0">
              {t("weekDays.sunday")}
            </FormLabel>
            <Switch
              {...formik.getFieldProps("operatingHours.Sunday.isOpen")}
              isChecked={formik.values.operatingHours?.Sunday.isOpen}
              colorScheme="teal"
              id="Sunday"
            />
          </FormControl>
          {formik.values.operatingHours?.Sunday.isOpen && (
            <FormControl
              isInvalid={
                formik.touched.operatingHours?.Sunday?.hours &&
                formik.errors.operatingHours?.Sunday?.hours !== undefined
              }
            >
              <Input
                id="name"
                type="text"
                size="sm"
                placeholder="Sample: 13pm - 22pm"
                {...formik.getFieldProps("operatingHours.Sunday.hours")}
              />
              <FormErrorMessage>
                {formik.errors.operatingHours?.Sunday?.hours}
              </FormErrorMessage>
            </FormControl>
          )}
        </Flex>
        <Button
          paddingY={5}
          color={Ecolors.DARK_GREEN}
          backgroundColor={Ecolors.LIGHT_YELLOW}
          isLoading={formik.isSubmitting}
          mb={5}
          type="submit"
          isDisabled={formik.isSubmitting || !formik.isValid || !formik.touched}
        >
          {t("common.action.submit")}
        </Button>
      </Flex>
    </form>
  );
};

export default EditRestaurantForm;
