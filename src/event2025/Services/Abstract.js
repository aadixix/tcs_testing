import axios from "axios";
import { API_ENDPOINTS } from "../Constant/ApiUrl";
import toast from "react-hot-toast";

export const abstract = async ({ data, user }) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    const response = await axios.post(
      API_ENDPOINTS.proceed_to_abstract,
      formData,
      {
        headers: {
          Authorization: `Bearer ${user}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // console.log("response from api call", response);
    return response;
  } catch (error) {
    console.error(
      "API error",
      error.response?.data.errors.File || error.message
    );
    toast.error(error.response?.data.errors.File[0]);
    throw error;
  }
};
export const abstractList = async (user) => {
  try {
    const rs = await axios.get(API_ENDPOINTS.GetCustomerAbstractList, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    });
    return rs.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getSingleAbstract = async ({ id, user }) => {
  try {
    const rs = await axios.get(
      `${API_ENDPOINTS.GetCustomerAbstractList}?AbstractId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      }
    );
    return rs.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
