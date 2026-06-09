import React from "react";
import { Form, Button, Icon, Header } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../../hooks/useUser";

export const RecuperarPassword = (props) => {
  const { onClose } = props;
  const { recuperarPassword } = useUser();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      recuperarPassword(formValue);
      onClose();
    },
  });
  return (
    <>
      <Header as='h3' icon>
        <Icon name='lock' />
        Tens problemes per entrar?
        <br/>
        <br/>
        <Header.Subheader>
        Introdueix el correu electrònic associat al teu compte i t'enviarem un enllaç per canviar la contrasenya.
        </Header.Subheader>
      </Header>
      <Form className="recuperar-password-form" onSubmit={formik.handleSubmit}>
          <Form.Input
            /* label="Correu electrònic" */
            type="email"
            name="email"
            placeholder="Correu electrònic"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
        <Button type="submit" content={"Enviar enllaç d'accés"} primary fluid />
      </Form>
    </>
  );
};

const initialValues = (data) => {
  return {
    email: "",
  };
};

const newSchema = () => {
  return {
    email: Yup.string()
      .email("Introdueix un email vàlid")
      .required("Has d'introduir l'email amb el que et vas registrar"),
  };
};
