//import "./map.css";
import { useEffect, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { useGoogleMaps } from "@/context/googleMaps.context";
import { Box } from "@chakra-ui/react";

const Map = () => {
  const { isLoaded, coordinates } = useGoogleMaps();

  const onLoad = (map: google.maps.Map) => {
    map.setCenter(coordinates);
  };

  const mapStyle = {
    width: "60vh",
    height: "100%",
    marginBottom: "50px",
    borderRadius: "20px",
    boxShadow: "2px 2px 5px rgba(153, 153, 153, 0.647)",
  };

  return (
    <>
      <style>{`.map {
        height: 100%;
        width: 100%;
        }`}</style>
      <Box style={mapStyle}>
        {isLoaded && (
          <GoogleMap
            zoom={15}
            onLoad={onLoad}
            center={coordinates}
            mapContainerClassName="map"
          />
        )}
      </Box>
    </>
  );
};

export default Map;
