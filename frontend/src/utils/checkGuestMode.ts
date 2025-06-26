export const isGuest = () => {
  return localStorage.getItem("isGuest") === "true";
}