export const extractError = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.title ||
  error?.message ||
  "Something went wrong.";

export const normalizeList = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.result)) {
    return payload.result;
  }

  if (Array.isArray(payload?.$values)) {
    return payload.$values;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  return [];
};
