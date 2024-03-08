import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useRouter } from "next/router";
import { restaurants } from "@/services/restaurants/restaurants.service";
import { useGoogleMaps } from "@/context/googleMapsLoader.context";

const containerStyle = {
  width: "60vh",
  height: "100%",
  marginBottom: "50px",
  borderRadius: "20px",
  boxShadow: "2px 2px 5px rgba(153, 153, 153, 0.647)",
};

const center = {
  lat: 40.705089,
  lng: -73.933585,
};

const Map = () => {
  const router = useRouter();
  const { isLoaded } = useGoogleMaps();
  const [allRestaurants, setAllRestaurants] = useState<
    {
      _id: string;
      name: string;
      location: { coordinates: { lat: number; lng: number } };
    }[]
  >([]);

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    map.setZoom(10);
    map.setCenter(center);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  useEffect(() => {
    restaurants.getAllRestaurants().then((res) => {
      setAllRestaurants(
        res.map((elm) => {
          return {
            _id: elm._id as string,
            name: elm.name,
            location: {
              coordinates: {
                lat: elm.location?.coordinates.lat,
                lng: elm.location?.coordinates.lng,
              },
            },
          };
        })
      );
    });
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      zoom={10}
      onUnmount={onUnmount}
    >
      {allRestaurants.length &&
        allRestaurants.map(({ _id, name, location: { coordinates } }) => {
          return (
            <Marker
              key={_id}
              title={name}
              position={{ lat: coordinates.lat, lng: coordinates.lng }}
              onClick={() => router.push(`/restaurants/${_id}`)}
            />
          );
        })}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
