import React from "react";
import { useSelector } from "react-redux";

const AdminPage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

  if (!isAuthenticated) {
    return <div>You need to log in</div>;
  }

  if (account.role === "user" || account.role === "employer") {
    return <div>You're not allowed to access this page</div>;
  }

  return <div>Hello, Admin!</div>;
};

export default AdminPage;
