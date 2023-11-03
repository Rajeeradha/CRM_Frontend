export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("userData")) {
    return JSON.parse(localStorage.getItem("userData"));
  }
};
