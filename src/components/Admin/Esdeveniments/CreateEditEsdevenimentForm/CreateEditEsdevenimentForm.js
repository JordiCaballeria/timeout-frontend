import React, { useState } from "react";
import { Form, Button, Loader } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEsdeveniments } from "../../../../hooks/useEsdeveniments";

export const CreateEditEsdevenimentForm = (props) => {
  const { createEsdeveniment, updateEsdeveniment } = useEsdeveniments();
  const { onClose, onRefesh, esdeveniment, tipusEsdeveniments, equips } = props;
  const [tipusFilter, setTipusFilter] = useState(
    esdeveniment ? esdeveniment.tipusEsdeveniment : null
  );
  const [equipFilter, setEquipFilter] = useState(
    esdeveniment ? esdeveniment.equip : null
  );
  const [currentDate, setNewDate] = useState(
    esdeveniment
      ? new Date(esdeveniment.data).toISOString().slice(0, 16)
      : datetimeLocal()
  );
  const [entrades, setEntrades] = useState(
    esdeveniment?.tipusEsdeveniment === 1 ? true : false
  );
  let optionsEsdeveniment = tipusEsdeveniments
    ? tipusEsdeveniments.map((tipus) => {
        return { id: tipus.id, text: tipus.nom, value: tipus.id };
      })
    : [];
  let optionsEquips = equips
    ? equips.map((equip) => {
        return { id: equip.id, text: equip.nom, value: equip.id };
      })
    : [];

  const formik = useFormik({
    initialValues: initialValues(esdeveniment),
    validationSchema: Yup.object(esdeveniment ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const {
        nom,
        descripcio,
        location,
        num_entrades,
        preu_entrades,
        preu_entrades_soci,
      } = formValue;
      const dades = {
        nom: nom,
        descripcio: descripcio,
        location: location,
        data: currentDate,
        equip: equipFilter,
        num_entrades: num_entrades,
        num_entrades_disponibles: num_entrades,
        preu_entrades: preu_entrades,
        preu_entrades_soci: preu_entrades_soci,
        tipusEsdeveniment: tipusFilter,
      };

      try {
        if (esdeveniment) updateEsdeveniment(esdeveniment.id, dades);
        else await createEsdeveniment(dades);
        onRefesh();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleSlcChange = (e, data) => {
    setTipusFilter(data.value);
    if (data.value === 1) setEntrades(true);
    else {
      setEntrades(false);
      formik.setFieldValue("num_entrades", 0);
      formik.setFieldValue("preu_entrades", 0);
      formik.setFieldValue("preu_entrades_soci", 0);
    }
  };

  const handleSlcChange2 = (e, data) => {
    setEquipFilter(data.value);
  };

  function datetimeLocal() {
    const dt = new Date();
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
    return dt.toISOString().slice(0, 16);
  }

  return (
    <>
      {tipusEsdeveniments && equips ? (
        <Form
          className="create-edit-esdeveniment-form"
          onSubmit={formik.handleSubmit}
        >
          <Form.Group>
            <Form.Input
              width={9}
              label="Nom"
              name="nom"
              placeholder="Nom"
              value={formik.values.nom}
              onChange={formik.handleChange}
              error={formik.errors.nom}
            />
            <Form.Input
              width={7}
              label="Data i Hora"
              name="datahora"
              placeholder="Data/Hora"
              type="datetime-local"
              onChange={(e, data) => setNewDate(data.value)}
              value={currentDate}
            />
          </Form.Group>
          <Form.TextArea
            label="Descripció"
            name="descripcio"
            placeholder="Descripció"
            value={formik.values.descripcio}
            onChange={formik.handleChange}
            error={formik.errors.descripcio}
          />
          <Form.Group widths="equal">
            <Form.Dropdown
              selection
              clearable
              label="Tipus Esdeveniment"
              placeholder="Tipus Esdeveniment"
              options={optionsEsdeveniment}
              onChange={handleSlcChange}
              defaultValue={tipusFilter}
            />
            <Form.Dropdown
              selection
              clearable
              label="Equip"
              placeholder="Equip"
              options={optionsEquips}
              onChange={handleSlcChange2}
              defaultValue={equipFilter}
            />
          </Form.Group>
          {entrades && (
            <Form.Group widths="equal">
              <Form.Input
                width={4}
                type="number"
                label="Número d'entrades"
                name="num_entrades"
                placeholder="Número d'entrades"
                value={formik.values.num_entrades}
                onChange={formik.handleChange}
                error={formik.errors.num_entrades}
              />
              <Form.Input
                width={4}
                type="number"
                label="Preu entrada"
                name="preu_entrades"
                placeholder="Preu entrada"
                value={formik.values.preu_entrades}
                onChange={formik.handleChange}
                error={formik.errors.preu_entrades}
              />
              <Form.Input
                width={4}
                type="number"
                label="Preu entrada socis"
                name="preu_entrades_soci"
                placeholder="Preu entrada soci"
                value={formik.values.preu_entrades_soci}
                onChange={formik.handleChange}
                error={formik.errors.preu_entrades_soci}
              />
            </Form.Group>
          )}

          <Form.Input
            label="Localitzacio"
            name="location"
            placeholder="Localitzacio"
            value={formik.values.location}
            onChange={formik.handleChange}
            error={formik.errors.location}
          />
          <Button
            type="submit"
            content={esdeveniment ? "Editar" : "Crear"}
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

const initialValues = (esdeveniment) => {
  return {
    nom: esdeveniment?.nom || "",
    descripcio: esdeveniment?.descripcio || "",
    location: esdeveniment?.location || "",
    num_entrades: esdeveniment?.num_entrades || 0,
    preu_entrades: esdeveniment?.preu_entrades || 0,
    preu_entrades_soci: esdeveniment?.preu_entrades_soci || 0,
  };
};

const newSchema = () => {
  return {
    nom: Yup.string().required(true),
    descripcio: Yup.string().required(true),
    location: Yup.string().required(false),
    num_entrades: Yup.number(false),
    preu_entrades: Yup.number(false),
    preu_entrades_soci: Yup.number(false),
  };
};
const updateSchema = () => {
  return {
    nom: Yup.string().required(true),
    descripcio: Yup.string().required(true),
    location: Yup.string().required(false),
    num_entrades: Yup.number(false),
    preu_entrades: Yup.number(false),
    preu_entrades_soci: Yup.number(false),
  };
};
