import React, { useState } from "react";
import { Form, Button, Loader, Dropdown } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRol } from "../../../../hooks/useRol";
import { useAuth } from "../../../../hooks/useAuth";

export const CreateEditRol = (props) => {
  const { createRol, updateRol } = useRol();
  const { onClose, onRefesh, rol, permisos } = props;
  const [rolFilter, setrolFilter] = useState(rol ? rol.permisos : []);
  const { navRefresh } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(rol),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: true,
    onSubmit: async (formValue) => {
      let permisosArray = rolFilter;
      const { nom } = formValue;
      const data = {
        nom: nom,
        permisos: permisosArray,
      };
      try {
        if (rol) await updateRol(rol.id, data);
        else await createRol(data);
        onRefesh();
        navRefresh();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });
  let options = permisos
    ? permisos.map((permis) => {
        return { id: permis.id, text: permis.nom, value: permis.id };
      })
    : [];

  const handleSlcChange = (e, data) => {
    setrolFilter(data.value);
  };

  return (
    <>
      {permisos ? (
        <Form className="create-edit-rol-form" onSubmit={formik.handleSubmit}>
          <Form.Input
            label={"Nom"}
            name="nom"
            placeholder="nom"
            value={formik.values.nom}
            onChange={formik.handleChange}
            error={formik.errors.nom}
          />
          <Dropdown
            label={"Permisos"}
            placeholder="Permisos"
            multiple
            selection
            options={options}
            onChange={handleSlcChange}
            defaultValue={rolFilter}
          />
          <Button
            type="submit"
            content={rol ? "Editar" : "Crear"}
            primary
            fluid
          />
        </Form>
      ) : (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      )}
    </>
  );
};

const initialValues = (rol) => {
  return {
    nom: rol?.nom || "",
  };
};

const newSchema = () => {
  return {
    nom: Yup.string().required("Introdueix un nom"),
  };
};
