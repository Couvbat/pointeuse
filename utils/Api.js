import axios from "axios";

/**
 * Axios instance for making API requests.
 * @type {import("axios").AxiosInstance}
 */
const api = axios.create({
  baseURL: "https://jhemery.xyz/api",
  params: { api_token: "5kRKw5UaRVuxCl8qjNSrT2PeQ5RRka3nFhILKtjCuCXUt5M5775oqjVao00guMMqnrsOvIbHDQAhBAAHk2xgEN9c7XSn2wgpcz5u" },
});

//Timestamps
export function getTimestamps() {
  return api.get("/timestamp").then((res) => res.data.data);
}

export function getTimestamp(id) {
  return api.get("/timestamp/" + id).then((res) => res.data.data);
}

export function getLastTimestamp() {
  return api.get("/timestamp/last").then((res) => res.data.data[0]);
}

export function getTimestampsByDate(date) {
  return api.get(`/timestamps/date/${date}`)
    .then(res => {
      return res.data; // Return the data directly 
    });
}

export function getTimestampsByMonth(date) {
  return api.get(`/timestamps/month/${date}`).then((res) => res.data);
}

export function createTimestamp(data) {
  return api.post("/timestamp", data).then((res) => res.data.data);
}

export function updateTimestamp(id, data) {
  return api.patch("/timestamp/" + id, data).then((res) => res.data.data);
}

export function deleteTimestamp(id) {
  return api.delete("/timestamp/" + id).then((res) => res.data.data);
}
