import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./pages/welcome/Welcome.jsx";
import { Provider } from "react-redux";
import store, { persistor } from "./utils/store.js";
import { PersistGate } from "redux-persist/integration/react";
import Dashboard from "./pages/Dashboard.jsx";
import Requests from "./pages/Requests.jsx";
import Profile from "./pages/profile/Profile.jsx";
import FeedCards from "./components/FeedCard/FeedCards.jsx";
import Premium from "./pages/Premium.jsx";
import ChatWindow from "./pages/chatpanel/ChatWindow.jsx";
import ChatList from "./pages/chatpanel/ChatList.jsx";
import { ConnectionsProvider } from "./context/ConnectionsContext.jsx";
import { RequestsProvider } from "./context/RequestsContext.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <FeedCards />,
      },
      {
        path: "requests",
        element: <Requests />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "premium",
        element: <Premium />,
      },
      {
        path: "chatwindow",
        element: <ChatWindow />,
      },
      {
        path: "chatlist",
        element: <ChatList />,
      },
    ],
  },
  {
    path: "/chatwindow",
    element: <ChatWindow />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RequestsProvider>
          <ConnectionsProvider>
            <ToastContainer
              position="top-right"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              transition={Bounce}
            />
            <RouterProvider router={router} />
          </ConnectionsProvider>
        </RequestsProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
