import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Form, Button, Grid, Image } from "semantic-ui-react";
import "./EditProfileUser.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../../hooks/useUser";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";

export const EditProfileUser = (props) => {
  const { updateUser, imatgeUser } = useUser();
  const { onClose, onRefesh, user } = props;
  const { navRefresh } = useAuth();
  const [imatge, setImatge] = useState(user ? user.path_photo : null);

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(user ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const {
        username,
        email,
        first_name,
        last_name,
        password,
        address,
        path_photo,
      } = formValue;
      const dades = {
        username,
        email,
        first_name,
        last_name,
        password,
        address,
      };

      try {
        await updateUser(user.id, dades);
        if (user.path_photo !== path_photo)
          await imatgeUser(path_photo, user.id);
        navRefresh();
        onRefesh();
        onClose();
      } catch (error) {
        toast.error(error);
      }
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    await formik.setFieldValue("path_photo", acceptedFile[0]);
    setImatge(URL.createObjectURL(acceptedFile[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });
  return (
    <Form className="edit-profile-user" onSubmit={formik.handleSubmit}>
      <Grid>
        <Grid.Row
          verticalAlign="middle"
          columns={2}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Image
            src={
              imatge
                ? imatge
                : "https://react.semantic-ui.com/images/wireframe/white-image.png"
            }
          />
          <Form.Button
            style={{ marginLeft: "15px" }}
            type="button"
            icon="camera"
            color={formik.errors.path_imatge && "red"}
            {...getRootProps()}
          />
          <input {...getInputProps()} />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form.Input
              label="Nom d'usuari"
              name="username"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.errors.username}
              disabled={true}
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
              disabled={true}
            />
            {/* <Form.Input
              label="Contrasenya"
              name="password"
              type="password"
              placeholder="Contrasenya"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
            /> */}
            <Form.Input
              label="Adreça"
              name="address"
              placeholder="Adreça"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.errors.address}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Button type="submit" content={"Guardar"} primary fluid />
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
    password: Yup.string().required(true),
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
    password: Yup.string(),
    address: Yup.string(),
    path_photo: Yup.string(),
  };
};
