import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";

const Profile = lazy(() => import("../pages/Profile"));
const Chat = lazy(() => import("../pages/Chat"));
const UserChatDetail = lazy(() => import("../pages/UserChatDetail"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div> }>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="chat" element={<PrivateRouter />}>
          <Route index element={<Chat />} />
        </Route>
        <Route path="profile" element={<PrivateRouter />}>
          <Route index element={<Profile />} />
          <Route path=":chatDetailId" element={<UserChatDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
