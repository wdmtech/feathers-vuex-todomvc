export const isDev = Boolean(process.env.NODE_ENV !== "production");

export default {
  connection: process.env.VUE_APP_API_URL
    ? process.env.VUE_APP_API_URL
    : "http://localhost:3030",
  domain: !isDev ? "*.my-domain.com" : "localhost"
};
