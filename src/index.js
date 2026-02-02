import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import {store, persistor } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import { setAuth } from "./store/slices/userSlice";
import { authChannel, broadcastAuthToTab } from "./utils/authBroadcast";
import { logout } from "./store/slices/userSlice";
import { getTabId } from "./utils/tabId";

const TAB_ID = getTabId();

authChannel.onmessage = (event) => {
  const { type, targetTabId, requesterTabId, payload } = event.data;

  // 🔹 Only respond if YOU are the target
  if (type === "AUTH_SYNC") {
    if (targetTabId === TAB_ID) {
      store.dispatch(setAuth(payload));
    }
    return;
  }

  // 🔹 Respond ONLY if requester asked
  if (type === "AUTH_REQUEST") {
    // Do NOT auto respond if this tab is not authenticated
    const auth = store.getState().auth;
    if (!auth.token) return;

    broadcastAuthToTab(requesterTabId, auth);
  }

  if (event.data.type === "LOGOUT") {
    const currentUserId = store.getState().auth.user?.id;

    // 🔥 ONLY logout if same user
    if (currentUserId && currentUserId === event.data.userId) {
      store.dispatch(logout());
      sessionStorage.clear();

      if (window.location.pathname.startsWith("/dashboard")) {
        window.location.href = "/login";
      }
    }
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
