import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Form,
  Button,
  Checkbox,
  Grid,
  Image,
  Divider,
} from "semantic-ui-react";
import "./CreateEditUserForm.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../../../hooks/useUser";
import { useAuth } from "../../../../hooks/useAuth";

export const CreateEditUserForm = (props) => {
  const { auth } = useAuth();
  const { createUser, updateUser, updateRolUser, imatgeUser } = useUser();
  const { onClose, onRefesh, user, rols } = props;
  const [rolFilter, setrolFilter] = useState(user ? user.rols : []);
  const [jugador, setJugador] = useState(
    user?.rols_data.filter((rol) => rol.nom === "Jugador/a").length > 0
      ? true
      : false
  );
  const [entrenador, setEntrenador] = useState(
    user?.rols_data.filter((rol) => rol.nom === "Entrenador/a").length > 0
      ? true
      : false
  );
  const [imatge, setImatge] = useState(user ? user.path_photo : null);
  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(user ? updateSchema() : newSchema()),
    validateOnChange: true,
    onSubmit: async (formValue) => {
      const {
        username,
        account,
        address,
        dorsal,
        email,
        first_name,
        fitxa,
        is_active,
        is_soci,
        is_staff,
        is_superuser,
        last_name,
        password,
        path_photo,
      } = formValue;
      const dades = {
        username,
        account,
        address,
        dorsal,
        email,
        first_name,
        fitxa,
        is_active,
        is_soci,
        is_staff,
        is_superuser,
        last_name,
        password,
        rols: rolFilter,
      };
      try {
        if (user) {
          await updateUser(user.id, dades);
          await updateRolUser({ user_id: user.id, rols: rolFilter });
          await imatgeUser(path_photo, user.id);
        } else {
          const newuser = await createUser(dades);
          await updateRolUser({ user_id: newuser.id, rols: rolFilter });
          newuser && (await imatgeUser(path_photo, newuser.id));
        }
        onRefesh();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  let options = rols
    ? rols.map((rol) => {
        return { id: rol.id, text: rol.nom, value: rol.id };
      })
    : [];
  const handleSlcChange = (e, data) => {
    setrolFilter(data.value);
    if (data.value.includes(7)) setJugador(true);
    else setJugador(false);
    if (data.value.includes(6)) setEntrenador(true);
    else setEntrenador(false);
  };

  const onDrop = useCallback(
    async (acceptedFile) => {
      await formik.setFieldValue("path_photo", acceptedFile[0]);
      setImatge(URL.createObjectURL(acceptedFile[0]));
    },
    [formik]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });
  return (
    <Form className="create-edit-user-form" onSubmit={formik.handleSubmit}>
      <Grid>
        <Grid.Column textAlign="center">
          <Checkbox
            label={"Actiu"}
            toggle
            checked={formik.values.is_active}
            onChange={(_, data) =>
              formik.setFieldValue("is_active", data.checked)
            }
          />
          <Checkbox
            label={"Treballador"}
            toggle
            checked={formik.values.is_staff}
            onChange={(_, data) => {
              formik.setFieldValue("is_staff", data.checked);
              setrolFilter([]);
            }}
          />
          {auth.me.is_superuser && (
            <Checkbox
              label={"Soci"}
              toggle
              checked={formik.values.is_soci}
              onChange={(_, data) =>
                formik.setFieldValue("is_soci", data.checked)
              }
            />
          )}
          {auth.me.is_superuser && (
            <Checkbox
              label={"Superusuari"}
              toggle
              checked={formik.values.is_superuser}
              onChange={(_, data) =>
                formik.setFieldValue("is_superuser", data.checked)
              }
            />
          )}
        </Grid.Column>
      </Grid>
      <Grid columns="equal" divided>
        <Grid.Column>
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
        </Grid.Column>
        <Grid.Column>
          {imatge ? (
            <Image centered src={imatge} size="medium" bordered />
          ) : (
            <Image
              centered
              src="https://react.semantic-ui.com/images/wireframe/white-image.png"
              size="medium"
              bordered
            />
          )}
          <Divider hidden />
          <Form.Button
            type="button"
            content={imatge ? "Canviar Imatge" : "Pujar Imatge"}
            color={formik.errors.path_imatge && "red"}
            fluid
            {...getRootProps()}
          />
          <input {...getInputProps()} />
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column>
          <Form.Input
            label="Adreça"
            name="address"
            placeholder="Adreça"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.errors.address}
          />
        </Grid.Column>
      </Grid>

      <Grid>
        <Grid.Column>
          {(user?.is_staff || formik.values.is_staff) && (
            <Form.Dropdown
              label="Rols d'usuari"
              name="rols"
              placeholder="Rols"
              multiple
              selection
              options={options}
              onChange={handleSlcChange}
              defaultValue={rolFilter}
            />
          )}
          {jugador && (
            <Form.Input
              label="Dorsal"
              name="dorsal"
              type="number"
              placeholder="Dorsal"
              value={formik.values.dorsal}
              onChange={formik.handleChange}
              error={formik.errors.dorsal}
            />
          )}
          {(jugador || entrenador) && (
            <Form.Input
              label="Numero de fitxa federativa"
              name="fitxa"
              placeholder="Numero de fitxa"
              value={formik.values.fitxa}
              onChange={formik.handleChange}
              error={formik.errors.fitxa}
            />
          )}
          {(user?.is_staff ||
            user?.is_soci ||
            formik.values.is_soci ||
            formik.values.is_staff) && (
            <Form.Input
              label="Número de compte corrent"
              name="account"
              placeholder="Numero de compte"
              value={formik.values.account}
              onChange={formik.handleChange}
              error={formik.errors.account}
            />
          )}
        </Grid.Column>
      </Grid>
      <Button type="submit" content={user ? "Editar" : "Crear"} primary fluid />
    </Form>
  );
};

const initialValues = (user) => {
  return {
    username: user?.username || "",
    email: user?.email || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    password: "",
    password_confirm: "",
    is_active: user?.is_active ? true : false,
    is_staff: user?.is_staff ? true : false,
    is_soci: user?.is_soci ? true : false,
    is_superuser: user?.is_superuser ? true : false,
    dorsal: user?.dorsal || 0,
    fitxa: user?.fitxa || "",
    account: user?.account || "",
    address: user?.address || "",
    path_photo: user?.path_photo || "",
  };
};

const newSchema = () => {
  return {
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    first_name: Yup.string().required(true),
    last_name: Yup.string().required(true),
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
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true),
    is_soci: Yup.bool().required(true),
    is_superuser: Yup.bool().required(true),
    dorsal: Yup.number(),
    fitxa: Yup.string(),
    account: Yup.string(),
    address: Yup.string(),
    path_photo: Yup.string(),
  };
};
const updateSchema = () => {
  return {
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    first_name: Yup.string(),
    last_name: Yup.string(),
    password: Yup.string()
      .min(8, "El password ha de tenir com a mínim 8 caràcters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "El password ha de contenir minúscules, majúscules, números i símbols"
      ),
    password_confirm: Yup.string().oneOf(
      [Yup.ref("password")],
      "Les contrasenyes han de coincidir"
    ),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true),
    is_soci: Yup.bool().required(true),
    is_superuser: Yup.bool().required(true),
    dorsal: Yup.number(),
    fitxa: Yup.string(),
    account: Yup.string(),
    address: Yup.string(),
    path_photo: Yup.string(),
  };
};
