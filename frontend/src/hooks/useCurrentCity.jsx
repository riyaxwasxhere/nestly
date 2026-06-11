import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCity } from "../redux/userSlice";

function useCurrentCity() {
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const res = await fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${
              import.meta.env.VITE_GEOAPIFY_APIKEY
            }`
          );

          const data = await res.json();

          const city =
            data.features?.[0]?.properties?.city ||
            data.features?.[0]?.properties?.town ||
            data.features?.[0]?.properties?.village ||
            "";

          dispatch(setCity(city));
        } catch (error) {
          console.log("CITY FETCH ERROR:", error.message);
        }
      },
      (error) => {
        console.log("LOCATION ERROR:", error.message);
      }
    );
  }, [dispatch]);
}

export default useCurrentCity;