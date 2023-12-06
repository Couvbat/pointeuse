import axios from "axios";

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

export function createTimestamp(data) {
  return api.post("/timestamp", data).then((res) => res.data.data);
}

export function updateTimestamp(id, data) {
  return api.patch("/timestamp/" + id, data).then((res) => res.data.data);
}

export function deleteTimestamp(id) {
  return api.delete("/timestamp/" + id).then((res) => res.data.data);
}

//Profile
export function getProfile() {
  return api.get("/profile").then((res) => res.data.data);
}

export function updateProfile(data) {
  return api.patch("/profile", data).then((res) => res.data.data);
}

//Login
export function login(data) {
  return api.post("/login", data).then((res) => res.data.data);
}

//Register
export function register(data) {
  return api.post("/register", data).then((res) => res.data.data);
}

//Logout
export function logout() {
  return api.get("/logout").then((res) => res.data.data);
}

//User
export function getUser(id) {
  return api.get("/user/" + id).then((res) => res.data.data);
}
