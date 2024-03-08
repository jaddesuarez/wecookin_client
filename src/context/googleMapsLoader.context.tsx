import React, { FC, createContext, useContext, ReactNode } from "react";
import { useLoadScript } from "@react-google-maps/api";

export interface IMapsProviderProps {
  children: ReactNode;
}

export const GoogleMapsContext = createContext<any | null>(null);

export const GoogleMapsProvider: FC<IMapsProviderProps> = ({ children }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => {
  return useContext(GoogleMapsContext);
};
