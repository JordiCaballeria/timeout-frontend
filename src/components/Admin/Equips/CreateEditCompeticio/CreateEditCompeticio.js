import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEsdeveniments } from "../../../../hooks/useEsdeveniments";
import { useEquips } from "../../../../hooks/useEquips";

export const CreateEditCompeticio = (props) => {
  const {
    createCategoria,
    updateCategoria,
    createDivisio,
    updateDivisio,
    createEsport,
    updateEsport,
  } = useEquips();
  const { onClose, onRefesh, data, tipusCompeticio } = props;

  const formik = useFormik({
    initialValues: initialValues(data),
    validationSchema: Yup.object(data ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {

      const { nom } = formValue;
      const dades = {
        nom: nom,
      };
      onSubmit(dades, tipusCompeticio);
    },
  });

  const onSubmit = async (dades, tipusCompeticio) => {
    switch (tipusCompeticio) {
      case "divisio":
        try {
          if (data) updateDivisio(data.id, dades);
          else await createDivisio(dades);
          onRefesh();
          onClose();
        } catch (error) {
          console.error(error);
        }
        break;
      case "categoria":
        try {
          if (data) updateCategoria(data.id, dades);
          else await createCategoria(dades);
          onRefesh();
          onClose();
        } catch (error) {
          console.error(error);
        }
        break;
      case "esport":
        try {
          if (data) updateEsport(data.id, dades);
          else await createEsport(dades);
          onRefesh();
          onClose();
        } catch (error) {
          console.error(error);
        }
        break;

      default:
        break;
    }
  };

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
          content={data ? "Editar" : "Crear"}
          primary
          fluid
        />
      </Form>
    </>
  );
};

const initialValues = (data) => {
  return {
    nom: data?.nom || "",
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
