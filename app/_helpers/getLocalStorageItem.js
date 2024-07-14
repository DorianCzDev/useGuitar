function getLocalStorageItem(key) {
  if (!key || typeof window === "undefined") {
    return [];
  }
  return JSON.parse(localStorage.getItem(key));
}
export default getLocalStorageItem;
