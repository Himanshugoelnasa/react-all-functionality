export const getTabId = () => {
  let id = sessionStorage.getItem("TAB_ID");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("TAB_ID", id);
  }
  return id;
};
