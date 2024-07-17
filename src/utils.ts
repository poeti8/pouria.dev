export const SERVER_URL = process.env.NODE_ENV === "development" 
  ? "http://localhost:7241" 
  : "https://s.pouria.dev";

export function getCookies() {
  return Object.fromEntries(document.cookie.split('; ').map(v=>v.split(/=(.*)/s).map(decodeURIComponent)))
}