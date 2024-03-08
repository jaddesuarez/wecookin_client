import React, {
  FC,
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useLoadScript } from "@react-google-maps/api";

export interface IGoogleMapsProviderProps {
  children: ReactNode;
}

export interface IGoogleMapsInfo {
  title: string;
  content: ReactNode | null;
}

export interface IGoogleMapsContext {
  coordinates: { lat: number; lng: number };
  isLoaded: boolean;
  map: google.maps.Map | null;
  request: google.maps.places.PlaceSearchRequest | null;
  setRequest: (request: google.maps.places.PlaceSearchRequest | null) => void;
  getplaces: (
    request: google.maps.places.PlaceSearchRequest,
    callback: (
      results: google.maps.places.PlaceResult[],
      status: google.maps.places.PlacesServiceStatus
    ) => void
  ) => void;
  callback: (
    results: google.maps.places.PlaceResult[],
    status: google.maps.places.PlacesServiceStatus
  ) => void;
  loadMapData: () => void;
}

export const GoogleMapsContext = createContext<IGoogleMapsContext>({
  coordinates: { lat: 0, lng: 0 },
  isLoaded: false,
  map: null,
  request: null,
  setRequest: () => Promise.resolve(),
  getplaces: () => Promise.resolve(),
  callback: () => Promise.resolve(),
  loadMapData: () => Promise.resolve(),
});

export const GoogleMapsProvider: FC<IGoogleMapsProviderProps> = ({
  children,
}) => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [request, setRequest] =
    useState<google.maps.places.PlaceSearchRequest | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  useEffect(() => {
    if (isLoaded && !loadError) {
      initMap();
    }
  }, [isLoaded, loadError]);

  async function initMap(): Promise<void> {
    // Ensure google is defined
    if (typeof google !== undefined) {
      const { Map } = google.maps;
      setMap(
        new Map(document.getElementById("map") as HTMLElement, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        })
      );
    }
  }

  const infoWindow = map && new window.google.maps.InfoWindow();

  useEffect(() => {
    loadMapData();
  }, [map]);

  useEffect(() => {
    if (request) {
      getplaces(request, callback);
    }
  }, [request]);

  const loadMapData = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setRequest({
          location: { lat: latitude, lng: longitude },
          radius: request?.radius,
          type: "supermarket",
        });
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  };

  const getplaces = (
    request: google.maps.places.PlaceSearchRequest,
    callback: (
      results: google.maps.places.PlaceResult[],
      status: google.maps.places.PlacesServiceStatus
    ) => void
  ) => {
    const service = map && new window.google.maps.places.PlacesService(map);
    map && service.nearbySearch(request, callback);
  };

  const callback = (results, status) => {
    if (status == window.google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  };

  const createMarker = (place) => {
    if (!place.geometry || !place.geometry.location) return;

    const marker =
      map &&
      new window.google.maps.Marker({
        map: map,
        position: place.geometry.location,
        vicinity: place.vicinity,
        website: place.website,
        business_status: place.business_status,
        url: place.url,
        animation: window.google.maps.Animation.DROP,
        icon: {
          url: "https://res.cloudinary.com/dp0abawuh/image/upload/v1671182183/marker_crenvc.png",
        },
      });
    placedMarkers.push(marker);

    map &&
      window.google.maps.event.addListener(marker, "click", () => {
        toggleBounce();

        infoWindow.setContent(
          '<div id="content">' +
            '<div id="siteNotice">' +
            '<img class="mapIcon" src="/images/Frigo logo_Mesa de trabajo.png"/>' +
            "<hr>" +
            `<h6>${place.name.toUpperCase()}</h6>` +
            `<p>${place.vicinity}</p>` +
            `<p> <strong>Business Status:</strong> ${place.business_status.toUperCase()}</p>` +
            "</div>" +
            "</div>" || ""
        );
        infoWindow.open({
          anchor: marker,
          map: map,
        });

        function toggleBounce() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
          }
        }
      });
  };

  return (
    <GoogleMapsContext.Provider
      value={{
        coordinates,
        isLoaded,
        map,
        request,
        setRequest,
        getplaces,
        callback,
        loadMapData,
      }}
    >
      {children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => {
  return useContext(GoogleMapsContext);
};
