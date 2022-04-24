import axios from "axios";

const serverURL: string = "/api"

export const $host = axios.create({
  baseURL: serverURL
})