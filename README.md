🔑 Features
✔ Multi-Login (Same Browser)

Each tab has its own Redux store

Each tab has its own session

No cross-tab overwrites

✔ Refresh-Safe

Uses redux-persist + sessionStorage

Refresh keeps user logged in

✔ Safe New-Tab Auth Transfer

Auth is transferred only when explicitly requested

No tokens in URLs

No automatic cross-tab sync

✔ Scoped Logout

Logout only affects tabs of the same user

Different users in other tabs stay logged in

📦 Dependencies
npm install @reduxjs/toolkit react-redux
npm install redux-persist
npm install jwt-decode

🗄 Redux Store (Session-Scoped)
store/index.js
import storageSession from "redux-persist/lib/storage/session";


✔ Each tab gets its own persisted state
✔ No shared auth across tabs

🔐 Auth Slice (Redux Toolkit)

State shape:

{
  user: { id, email, role },
  token: "JWT_TOKEN",
  roles: ["admin"],
  loading: false,
  error: null
}


Actions:

login (async thunk)

setAuth

logout

📡 BroadcastChannel (Cross-Tab Control)
What is broadcasted?

Auth sync → targeted

Logout → user-scoped

Why not global?

BroadcastChannel sends to ALL tabs.
So messages are filtered by userId.

🆔 Tab Identity

Each tab generates a unique ID:

TAB_ID = crypto.randomUUID()


Stored in:

sessionStorage


Used to:

Target auth sync

Prevent session hijacking

🧭 Open Page in New Tab (Safe Way)
OpenInNewTab.jsx
<OpenInNewTab to="/dashboard/products">
  Open Products in New Tab
</OpenInNewTab>


What happens:

Current tab requests auth

Auth is sent only to new tab

Redux hydrates

Session persists on refresh

🚪 Logout Behavior
Supported Modes
Mode	Description
Per-tab logout	Logs out only current tab
User-scoped logout	Logs out all tabs of same user ✅
Global logout	❌ Not used (unsafe)
User-Scoped Logout
broadcastLogout(user.id);


Tabs check:

if (currentUserId === event.userId)

🛡 Security Notes

✔ No tokens in URLs
✔ No shared localStorage
✔ No silent cross-tab auth
✔ Explicit user intent required
✔ Works with HttpOnly refresh tokens

❌ Anti-Patterns Avoided
Anti-Pattern	Why
Using localStorage	Breaks multi-login
Auto-sync auth across tabs	Security risk
Global logout broadcast	Logs out other users
JWT in query params	Token leak
✅ Supported Scenarios

✔ User A + User B logged in same browser

✔ Refresh keeps session

✔ Open new tab with same session (optional)

✔ Logout affects only same user tabs

✔ Different users unaffected

🚀 Future Enhancements

Session expiration sync

Backend session revocation

Admin active-session viewer

Device-level session control

Idle timeout logout

🧩 Summary

This setup provides a real-world, enterprise-safe multi-login solution for React applications, balancing:

Security 🔐

UX 🧠

Scalability 🚀
