import React, { useState } from "react";
import { Form, Button, Loader } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEquips } from "../../../../hooks/useEquips";
import { BASE_API } from "../../../../utils/constants";

export const CreateEditEquip = (props) => {
  const {
    createEquip,
    updateEquip,
    updateJugadoresEquip,
    updateEntrenadoresEquip,
  } = useEquips();
  const {
    onClose,
    onRefesh,
    users,
    divisions,
    esports,
    categories,
    equip,
    entrenadores,
  } = props;
  const [divisioFilter, setDivisioFilter] = useState(
    equip && equip.divisio ? equip.divisio : null
  );
  const [categoriaFilter, setCategoriaFilter] = useState(
    equip && equip.categoria ? equip.categoria : null
  );
  const [esportFilter, setEsportFilter] = useState(
    equip && equip.esport ? equip.esport : null
  );

  const capturarIdsJugadores = () => {
    let ids = [];

    equip.users_data.map((user) => {
      if (user.rol_data.nom === "Jugador/a") ids.push(user.user);
    });
    return ids;
  };

  const capturarIdsEntrenadores = () => {
    let ids = [];

    equip.users_data.map((user) => {
      if (user.rol_data.nom === "Entrenador/a") ids.push(user.user);
    });
    return ids;
  };

  const [jugEquipFilter, setJugEquipFilter] = useState(
    equip ? capturarIdsJugadores() : []
  );

  const [entEquipFilter, setEntEquipFilter] = useState(
    equip ? capturarIdsEntrenadores() : []
  );

  let optionsUsers = users
    ? users.map((user) => {
      return {
        id: user.id,
        text: user.first_name + " " + user.last_name,
        value: user.id,
        image: {
          avatar: true,
          src: user.path_photo
            ? user.path_photo
            : `${BASE_API}/uploads/User/avatar.png`,
          spaced: "right",
        },
      };
    })
    : [];
  let optionsEntrenadores = entrenadores
    ? entrenadores.map((user) => {
      return {
        id: user.id,
        text: user.first_name + " " + user.last_name,
        value: user.id,
        image: {
          avatar: true,
          src: user.path_photo
            ? user.path_photo
            : `${BASE_API}/uploads/User/avatar.png`,
          spaced: `right`,
        },
      };
    })
    : [];
  let optionsDivisions = divisions
    ? divisions.map((divisio) => {
      return { id: divisio.id, text: divisio.nom, value: divisio.id };
    })
    : [];
  let optionsEsports = esports
    ? esports.map((esport) => {
      return { id: esport.id, text: esport.nom, value: esport.id };
    })
    : [];
  let optionsCategories = divisions
    ? categories.map((categoria) => {
      return { id: categoria.id, text: categoria.nom, value: categoria.id };
    })
    : [];

  const formik = useFormik({
    initialValues: initialValues(equip),
    validationSchema: Yup.object(equip ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const { nom } = formValue;
      const dades = {
        nom: nom,
        esport: esportFilter,
        categoria: categoriaFilter,
        divisio: divisioFilter,
      };

      try {
        if (equip) {
          updateEquip(equip.id, dades);
          updateJugadoresEquip({
            equip_id: equip.id,
            users_ids: jugEquipFilter,
          });
          updateEntrenadoresEquip({
            equip_id: equip.id,
            users_ids: entEquipFilter,
          });
        } else {
          const equipAux = await createEquip(dades);
          updateJugadoresEquip({
            equip_id: equipAux.id,
            users_ids: jugEquipFilter,
          });
          updateEntrenadoresEquip({
            equip_id: equipAux.id,
            users_ids: entEquipFilter,
          });
        }
        onRefesh();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const renderLabel = (label) => ({
    color: "blue",
    content: label.text,
    image: label.image,
  });

  const handleSlcChangeDivisio = (e, data) => {
    setDivisioFilter(data.value);
  };

  const handleSlcChangeCategoria = (e, data) => {
    setCategoriaFilter(data.value);
  };

  const handleSlcChangeEsport = (e, data) => {
    setEsportFilter(data.value);
  };
  const handleSlcChangeJugadores = (e, data) => {
    setJugEquipFilter(data.value);
  };
  const handleSlcChangeEntrenadores = (e, data) => {
    setEntEquipFilter(data.value);
  };

  return (
    <>
      <Form className="create-edit-Equip-form" onSubmit={formik.handleSubmit}>
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
        <Form.Group widths="equal">
          <Form.Dropdown
            selection
            clearable
            label="Esport"
            placeholder="Tipus Equip"
            options={optionsEsports}
            onChange={handleSlcChangeEsport}
            defaultValue={esportFilter}
          />
          <Form.Dropdown
            selection
            clearable
            label="Categoria"
            placeholder="Categories"
            options={optionsCategories}
            onChange={handleSlcChangeCategoria}
            defaultValue={categoriaFilter}
          />
          <Form.Dropdown
            selection
            clearable
            label="Divisio"
            placeholder="Divisions"
            options={optionsDivisions}
            onChange={handleSlcChangeDivisio}
            defaultValue={divisioFilter}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Dropdown
            selection
            clearable
            multiple
            search
            label="Jugadores"
            placeholder="Jugadores"
            options={optionsUsers}
            onChange={handleSlcChangeJugadores}
            defaultValue={jugEquipFilter}
            renderLabel={renderLabel}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Dropdown
            selection
            clearable
            multiple
            search
            label="Entrenadores"
            placeholder="Entrenadores"
            options={optionsEntrenadores}
            onChange={handleSlcChangeEntrenadores}
            defaultValue={entEquipFilter}
            renderLabel={renderLabel}
          />
        </Form.Group>
        <Button
          type="submit"
          content={equip ? "Editar" : "Crear"}
          primary
          fluid
        />
      </Form>
    </>
  );
};

const initialValues = (Equip) => {
  return {
    nom: Equip?.nom || "",
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
