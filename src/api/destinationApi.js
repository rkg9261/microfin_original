import axiosInstance from "./axiosInstance";
import API from "./endpoints";



// GET ALL DESTINATIONS


export const getDestinations = async () => {

  const response = await axiosInstance.get(API.DESTINATION_MASTER);

  return response.data;
};



// GET DESTINATION BY ID


export const getDestinationById = async (id) => {

  const response = await axiosInstance.get(
    API.DESTINATION_MASTER_BY_ID(id)
  );

  return response.data;
};



// CREATE DESTINATION


export const createDestination = async (data) => {

  const response = await axiosInstance.post(
    API.DESTINATION_MASTER,
    data
  );

  return response.data;
};



// UPDATE DESTINATION


export const updateDestination = async (
  id,
  data
) => {

  const response = await axiosInstance.put(
    API.DESTINATION_MASTER_BY_ID(id),
    data
  );

  return response.data;
};



// DELETE DESTINATION


export const deleteDestination = async (id) => {

  const response = await axiosInstance.delete(
    API.DESTINATION_MASTER_BY_ID(id)
  );

  return response.data;
};