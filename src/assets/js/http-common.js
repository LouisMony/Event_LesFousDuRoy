import axios from 'axios';

export const http = axios.create({
  baseURL: `https://api.airtable.com/v0/appIikQa2F0vLZo8R/`,
})