import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEsdeveniments } from "../../../../hooks/useEsdeveniments";

export const CreateEditTipusEsdeveniment = (props) => {
  const { createTipusEsdeveniment, updateTipusEsdeveniment } =
    useEsdeveniments();
  const { onClose, onRefesh, tipusEsdeveniment } = props;

  const formik = useFormik({
    initialValues: initialValues(tipusEsdeveniment),
    validationSchema: Yup.object(
      tipusEsdeveniment ? updateSchema() : newSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValue) => {

      const { nom, descripcio } = formValue;
      const dades = {
        nom: nom,
        descripcio: descripcio,
      };

      try {
        if (tipusEsdeveniment)
          updateTipusEsdeveniment(tipusEsdeveniment.id, dades);
        else await createTipusEsdeveniment(dades);
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
        <Form.Group>
          <Form.TextArea
            label="Descripció"
            name="descripcio"
            placeholder="Descripció"
            value={formik.values.descripcio}
            onChange={formik.handleChange}
            error={formik.errors.descripcio}
          />
        </Form.Group>
        <Button
          type="submit"
          content={tipusEsdeveniment ? "Editar" : "Crear"}
          primary
          fluid
        />
      </Form>
    </>
  );
};

const initialValues = (tipusEsdeveniment) => {
  return {
    nom: tipusEsdeveniment?.nom || "",
    descripcio: tipusEsdeveniment?.descripcio || "",
  };
};

const newSchema = () => {
  return {
    nom: Yup.string().required(true),
    descripcio: Yup.string().required(true),
  };
};
const updateSchema = () => {
  return {
    nom: Yup.string().required(true),
    descripcio: Yup.string().required(true),
  };
};
