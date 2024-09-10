import React from "react";
import { useSelector } from "react-redux";

const PostJob = () => {
  const account = useSelector((state) => state.user.account);

  if (account.role === "user" || account.role === "admin") {
    return <div>You're not allowed to access this page</div>;
  }

  return <div>Hello, Employer!</div>;
};

export default PostJob;
