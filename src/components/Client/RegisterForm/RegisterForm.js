import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../../hooks/useUser";

export const RegisterEditForm = (props) => {
  const { registerUser } = useUser();
  const { onClose } = props;
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: true,
    onSubmit: async (formValue) => {
      try {
        const response = await registerUser(formValue);
        if (response) onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <Form className="create-edit-user-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        label="Nom d'usuari"
        name="username"
        placeholder="Username"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <Form.Input
        label="Nom"
        name="first_name"
        placeholder="Nom"
        value={formik.values.first_name}
        onChange={formik.handleChange}
        error={formik.errors.first_name}
      />
      <Form.Input
        label="Cognoms"
        name="last_name"
        placeholder="Cognoms"
        value={formik.values.last_name}
        onChange={formik.handleChange}
        error={formik.errors.last_name}
      />
      <Form.Input
        label="Correu electrònic"
        name="email"
        placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        label="Adreça"
        name="address"
        placeholder="Adreça"
        value={formik.values.address}
        onChange={formik.handleChange}
        error={formik.errors.address}
      />
      <Form.Input
        label="Contrasenya"
        name="password"
        type="password"
        placeholder="Contrasenya"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <Form.Input
        label="Repetir contrasenya"
        name="password_confirm"
        type="password"
        placeholder="Contrasenya"
        value={formik.values.password_confirm}
        onChange={formik.handleChange}
        error={formik.errors.password_confirm}
      />
      <Button type="submit" content={"Registrar-se"} primary fluid />
    </Form>
  );
};

const initialValues = () => {
  return {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirm: "",
    address: "",
    is_active: false,
    is_staff: false,
  };
};
const newSchema = () => {
  return {
    username: Yup.string().required("Introdueix un username"),
    email: Yup.string()
      .email("Introdueix un correu valid")
      .required("Introdueix un correu"),
    first_name: Yup.string().required(true),
    last_name: Yup.string().required(true),
    address: Yup.string().required(
      "Has d'introduir l'adreça on vols rebre els enviaments"
    ),
    password: Yup.string()
      .required("Has de introduir un password")
      .min(8, "El password ha de tenir com a mínim 8 caràcters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "El password ha de contenir minúscules, majúscules, números i símbols"
      ),
    password_confirm: Yup.string()
      .required("Has de confirmar el password")
      .oneOf([Yup.ref("password")], "Les contrasenyes han de coincidir"),
  };
};
