import axios from "axios";

export const getTotLocations = async ({ lat, lng }) => {
  const {
    data: { businesses: totLocations },
  } = await axios.get(`/api/v1/tots/${lat}/${lng}`);
  return totLocations;
};
