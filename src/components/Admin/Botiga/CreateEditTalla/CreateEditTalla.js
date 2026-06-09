import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTalles } from "../../../../hooks/useTalles";

export const CreateEditTalla = (props) => {
  const { createTalla, updateTalla } = useTalles();
  const { onClose, onRefesh, talla } = props;

  const formik = useFormik({
    initialValues: initialValues(talla),
    validationSchema: Yup.object(talla ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {

      const { nom } = formValue;
      const dades = {
        nom: nom,
      };
      try {
        if (talla) updateTalla(talla.id, dades);
        else await createTalla(dades);
        onRefesh();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <Form
        className="create-edit-esdeveniment-form"
        onSubmit={formik.handleSubmit}
      >
        <Form.Group>
          <Form.Input
            width={10}
            label="Nom"
            name="nom"
            placeholder="Nom"
            value={formik.values.nom}
            onChange={formik.handleChange}
            error={formik.errors.nom}
          />
        </Form.Group>
        <Button
          type="submit"
          content={talla ? "Editar" : "Crear"}
          primary
          fluid
        />
      </Form>
    </>
  );
};

const initialValues = (talla) => {
  return {
    nom: talla?.nom || "",
  };
};

const newSchema = () => {
  return {
    nom: Yup.string().required(true),
  };
};
const updateSchema = () => {
  return {
    nom: Yup.string().required(true),
  };
};
