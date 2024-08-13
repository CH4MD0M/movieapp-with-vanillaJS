import axios from "axios";
const API_KEY = process.env.API_KEY;

export const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
  },
  params: { api_key: API_KEY, language: "ko-KR" },
});
