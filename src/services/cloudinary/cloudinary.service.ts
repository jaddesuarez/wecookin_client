import { isAxiosError } from "axios";
import { fetch } from "@/infrastructure/config/axios.config";
import { IUpload } from "./types";

const BASE_URL = "/upload";

export const upload = {
  uploadImage: async ({ imageUrl }: IUpload) => {
    try {
      const res = await fetch.post<string>(`${BASE_URL}`, imageUrl);
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.message;
      throw new Error("An error occurred while uploading image");
    }
  },
};
