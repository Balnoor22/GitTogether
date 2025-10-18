//if  running on localhost use first url and if not (production) then use "/api"
export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:7777" : "/api";
