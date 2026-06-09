import React, { useState } from "react";
import { Button, Divider, Form, Segment } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginApi } from "../../../api/user";
import "./LoginForm.scss";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { RegisterEditForm } from "../../../components/Client/RegisterForm/RegisterForm";
import { ModalBasic } from "../../../components/Common/ModalBasic";

export const LoginForm = (props) => {
  const { login } = useAuth();
  const { onRecuperar } = props;
  const [showRegister, setshowRegister] = useState(false);
  const ModalShowRegister = () => setshowRegister((prev) => !prev);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      try {
        const response = await loginApi(formValue);
        const { access } = response;
        login(access);
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <>
      <Form className="login-form-admin" onSubmit={formik.handleSubmit}>
        <Form.Input
          label={"Usuari o correu electrònic"}
          name="username"
          placeholder="Usuari o correu electrònic"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.username}
        />
        <Form.Input
          label={"Contrassenya"}
          name="password"
          type="password"
          placeholder="Contrassenya"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        <Button type="submit" content="Iniciar sessió" primary fluid />
        <Divider horizontal>O</Divider>
        {/* <Button content="Recuperar password" onClick={onRecuperar} fluid /> */}
        <Link
          onClick={onRecuperar}
          style={{ display: "flex", justifyContent: "center" }}
        >
          Has oblidat la contrassenya?
        </Link>
        <Segment textAlign="center">
          <p>
            No tens compte? <Link onClick={ModalShowRegister}>Registra't</Link>
          </p>
        </Segment>
      </Form>
      <ModalBasic
        show={showRegister}
        onClose={ModalShowRegister}
        title="Crea el teu compte"
      >
        <RegisterEditForm onClose={ModalShowRegister} />
      </ModalBasic>
    </>
  );
};

const initialValues = () => {
  return {
    username: "",
    password: "",
  };
};

const validationSchema = () => {
  return {
    username: Yup.string().required("Introduce un correo"),
    password: Yup.string().required("Introduce una contraseña"),
  };
};
