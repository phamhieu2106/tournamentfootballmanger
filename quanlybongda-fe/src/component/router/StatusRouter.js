const UNAUTHEN_URL = "http://localhost:3000/login";
const ACCESS_DENINE_URL = "http://localhost:3000/402";
const SERVER_ERROR_URL = "http://localhost:3000/500";
const NOT_FOUND_URL = "http://localhost:3000/404";

export const redirectStatusResponse = (status) => {
  switch (status) {
    case 403:
      window.location.href = UNAUTHEN_URL;
      break;
    case 402:
      window.location.href = ACCESS_DENINE_URL;
      break;
    case 500:
      window.location.href = SERVER_ERROR_URL;
      break;
    case 404:
      window.location.href = NOT_FOUND_URL;
      break;
    default:
      window.location.href = NOT_FOUND_URL;
      break;
  }
};
