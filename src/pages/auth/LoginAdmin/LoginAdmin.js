import React from "react";
import { Image } from "semantic-ui-react";
import { LoginForm } from "../../../components/Admin/LoginForm/LoginForm";
import "./LoginAdmin.scss";

export const LoginAdmin = () => {
  return (
    <div className="login-admin">
      <div className="login-admin__content">
        <Image
          size="small"
          src="https://i.postimg.cc/BvGvnW6J/SRCtr.png"
          centered
        />
        <br></br>
        <LoginForm />
      </div>
    </div>
  );
};
