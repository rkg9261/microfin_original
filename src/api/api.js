const LIVE_API =
  "https://api.blissful-villani.103-191-208-88.plesk.page/api";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "/api" : LIVE_API);

export const LIVE_API_ORIGIN =
  "https://api.blissful-villani.103-191-208-88.plesk.page";

export const SWAGGER_URL =
  "https://api.blissful-villani.103-191-208-88.plesk.page/swagger/index.html";

export default BASE_URL;
