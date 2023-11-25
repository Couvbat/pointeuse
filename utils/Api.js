import axios from "axios";

//TODO : Add api_token to header
//TODO : get api_token from local storage

const api = axios.create({
  baseURL: "https://jhemery.xyz/api",
  params: { api_token: "KYmst3uRIR21aTyfm5XxRZxcoxRS28dHK5EDEWKlGRCSRsajYJWi7iJ919HEbn5BkthSnmGyIrAMRsZA63ViJv2MXfevgxDLbUxs" },
});

//Biberons
export function getBiberons() {
  return api.get("/biberon").then((res) => res.data.data);
}

export function getBiberon(id) {
  return api.get("/biberon/" + id).then((res) => res.data.data);
}

export function getLastBiberon() {
  return api.get("/biberon/last").then((res) => res.data.data[0]);
}

export function createBiberon(data) {
  return api.post("/biberon", data).then((res) => res.data.data);
}

export function updateBiberon(id, data) {
  return api.patch("/biberon/" + id, data).then((res) => res.data.data);
}

export function deleteBiberon(id) {
  return api.delete("/biberon/" + id).then((res) => res.data.data);
}

//Couches
export function getCouches() {
  return api.get("/couche").then((res) => res.data.data);
}

export function getCouche(id) {
  return api.get("/couche/" + id).then((res) => res.data.data);
}

export function createCouche(data) {
  return api.post("/couche", data).then((res) => res.data.data);
}

export function updateCouche(id, data) {
  return api.patch("/couche/" + id, data).then((res) => res.data.data);
}

export function deleteCouche(id) {
  return api.delete("/couche/" + id).then((res) => res.data.data);
}

//Pots
export function getPots() {
  return api.get("/pot").then((res) => res.data.data);
}

export function getPot(id) {
  return api.get("/pot/" + id).then((res) => res.data.data);
}

export function createPot(data) {
  return api.post("/pot", data).then((res) => res.data.data);
}

export function updatePot(id, data) {
  return api.patch("/pot/" + id, data).then((res) => res.data.data);
}

export function deletePot(id) {
  return api.delete("/pot/" + id).then((res) => res.data.data);
}

//Bains
export function getBains() {
  return api.get("/bain").then((res) => res.data.data);
}

export function getBain(id) {
  return api.get("/bain/" + id).then((res) => res.data.data);
}

export function createBain(data) {
  return api.post("/bain", data).then((res) => res.data.data);
}

export function updateBain(id, data) {
  return api.patch("/bain/" + id, data).then((res) => res.data.data);
}

export function deleteBain(id) {
  return api.delete("/bain/" + id).then((res) => res.data.data);
}

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
