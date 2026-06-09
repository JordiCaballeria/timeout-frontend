import React, { useState } from "react";
import { Form, Button, Grid, Loader } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEnviaments } from "../../../../hooks/useEnviaments";
import { useEffect } from "react";

export const EditEnviament = (props) => {
  const { updateEnviament, getEstatEnviaments, estatEnviaments, loading } =
    useEnviaments();
  const { onClose, onRefesh, enviament } = props;
  const [estatFilter, setEstatFilter] = useState(enviament.estatenviament);

  useEffect(() => {
    getEstatEnviaments();
  }, []);

  const formik = useFormik({
    initialValues: initialValues(enviament),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: true,
    onSubmit: async (formValue) => {

      const { direccio } = formValue;

      const dades = {
        direccio,
        estatenviament: estatFilter,
      };

      try {
        updateEnviament(enviament.id, dades);
        onRefesh();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });
  if (loading)
    return (
      <Loader active inline="centered">
        Carregant...
      </Loader>
    );
  const handleSlcChange = (e, data) => {
    setEstatFilter(data.value);
  };
  let optionsEstat = estatEnviaments
    ? estatEnviaments.map((estat) => {
        return {
          id: estat.id,
          text: estat.nom,
          value: estat.id,
        };
      })
    : [];
  return (
    <>
      <Form
        className="create-edit-enviament-form"
        onSubmit={formik.handleSubmit}
      >
        <Grid rows="equal" divided stackable>
          <Form.Input
            label="Direccio"
            name="direccio"
            placeholder="Direccio"
            value={formik.values.direccio}
            onChange={formik.handleChange}
            error={formik.errors.direccio}
          />
          <Form.Dropdown
            clearable
            selection
            label="Estat enviament"
            name="enviament"
            placeholder="Estat enviament"
            options={optionsEstat}
            onChange={handleSlcChange}
            defaultValue={estatFilter}
          />

          <Button
            type="submit"
            content={"Editar"}
            primary
            fluid
            color={formik.errors.path_imatge && "red"}
          />
        </Grid>
      </Form>
    </>
  );
};

const initialValues = (enviament) => {
  return {
    direccio: enviament.direccio || "",
  };
};

const newSchema = () => {
  return {
    direccio: Yup.string(),
  };
};
