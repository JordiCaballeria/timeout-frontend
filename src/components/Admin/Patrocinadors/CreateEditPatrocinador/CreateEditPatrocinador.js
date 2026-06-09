import React, { useCallback, useState } from "react";
import { Form, Button, Image, Grid } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePatrocinadors } from "../../../../hooks/usePatrocinadors";

export const CreateEditPatrocinador = (props) => {
  const { updatePatrocinador, createPatrocinador } = usePatrocinadors();
  const { onClose, onRefesh, patrocinador } = props;
  const [imatge, setImatge] = useState(
    patrocinador ? patrocinador.path_imatge : null
  );

  const onDrop = useCallback(async (acceptedFile) => {
    await formik.setFieldValue("path_imatge", acceptedFile[0]);
    setImatge(URL.createObjectURL(acceptedFile[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const formik = useFormik({
    initialValues: initialValues(patrocinador),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: true,
    onSubmit: async (formValue) => {
      const {
        nom,
        email,
        telefon,
        direccio,
        link,
        actiu,
        numCompte,
        path_imatge,
      } = formValue;

      const dades =
        (patrocinador !== undefined &&
          path_imatge !== patrocinador.path_imatge) ||
        patrocinador === undefined
          ? {
              nom,
              email,
              telefon,
              direccio,
              link,
              actiu,
              numCompte,
              path_imatge,
            }
          : {
              nom,
              email,
              telefon,
              direccio,
              link,
              actiu,
              numCompte,
            };
      try {
        if (patrocinador) await updatePatrocinador(patrocinador.id, dades);
        else await createPatrocinador(dades);
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
        <Grid columns="equal" divided stackable>
          <Grid.Column>
            <Form.Input
              label="Nom"
              name="nom"
              placeholder="Nom"
              value={formik.values.nom}
              onChange={formik.handleChange}
              error={formik.errors.nom}
            />
            <Form.Input
              label="Correu"
              name="email"
              placeholder="Correu electrònic"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
            />
            <Form.Input
              label="Enllaç"
              name="link"
              placeholder="Enllaç a la web"
              value={formik.values.link}
              onChange={formik.handleChange}
              error={formik.errors.link}
            />
            <Form.Input
              label="Telefon"
              name="telefon"
              placeholder="telefon"
              value={formik.values.telefon}
              onChange={formik.handleChange}
              error={formik.errors.telefon}
            />
            <Form.Input
              label="Direccio"
              name="direccio"
              placeholder="Direccio"
              value={formik.values.direccio}
              onChange={formik.handleChange}
              error={formik.errors.direccio}
            />
            <Form.Input
              label="Numero de compte"
              name="numCompte"
              placeholder="Numero de compte"
              value={formik.values.numCompte}
              onChange={formik.handleChange}
              error={formik.errors.numCompte}
            />
            <Form.Checkbox
              label="Actiu"
              toggle
              checked={formik.values.actiu}
              onChange={(_, data) =>
                formik.setFieldValue("actiu", data.checked)
              }
            />
          </Grid.Column>
          <Grid.Column width={12}>
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

            <Form.Button
              type="button"
              content={imatge ? "Canviar Imatge" : "Pujar Imatge"}
              color={formik.errors.path_imatge && "red"}
              fluid
              {...getRootProps()}
            />
            <input {...getInputProps()} />
          </Grid.Column>
          <Grid.Row>
            <Button
              type="submit"
              content={patrocinador ? "Editar" : "Crear"}
              primary
              fluid
              color={formik.errors.path_imatge && "red"}
            />
          </Grid.Row>
        </Grid>
      </Form>
    </>
  );
};

const initialValues = (patrocinador) => {
  return {
    nom: patrocinador?.nom || "",
    email: patrocinador?.email || "",
    link: patrocinador?.link || "",
    telefon: patrocinador?.telefon || "",
    direccio: patrocinador?.direccio || "",
    numCompte: patrocinador?.numCompte || "",
    path_imatge: patrocinador?.path_imatge || "",
    actiu: patrocinador?.actiu ? patrocinador.actiu : true,
  };
};

const newSchema = () => {
  return {
    nom: Yup.string().required("Introdueix un nom"),
    email: Yup.string().email(true).required("Introdueix un correu"),
    link: Yup.string().required(
      "Introdueix l'enllaç de la pàgina web del patrocinador"
    ),
    telefon: Yup.string(),
    direccio: Yup.string(),
    numCompte: Yup.string(),
    actiu: Yup.bool().required(true),
  };
};
