import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useProductes } from "../../../../hooks/useProductes";

export const CreateEditTipusProducte = (props) => {
  const { createTipusProducte, updateTipusProducte } = useProductes();
  const { onClose, onRefesh, tipusProducte } = props;

  const formik = useFormik({
    initialValues: initialValues(tipusProducte),
    validationSchema: Yup.object(tipusProducte ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {

      const { nom } = formValue;
      const dades = {
        nom: nom,
      };
      try {
        if (tipusProducte) updateTipusProducte(tipusProducte.id, dades);
        else await createTipusProducte(dades);
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
        className="create-edit-tipusproducte-form"
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
          content={tipusProducte ? "Editar" : "Crear"}
          primary
          fluid
        />
      </Form>
    </>
  );
};

const initialValues = (tipusProducte) => {
  return {
    nom: tipusProducte?.nom || "",
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
