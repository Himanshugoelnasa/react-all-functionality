import { getTabId } from "./tabId";

export const authChannel = new BroadcastChannel("AUTH_CHANNEL");

export const broadcastAuthToTab = (targetTabId, authState) => {
  authChannel.postMessage({
    type: "AUTH_SYNC",
    targetTabId,
    payload: authState,
  });
};

export const requestAuth = () => {
  authChannel.postMessage({
    type: "AUTH_REQUEST",
    requesterTabId: getTabId(),
  });
};

export const broadcastLogout = (userId) => {
  authChannel.postMessage({
    type: "LOGOUT",
    userId,
  });
};
