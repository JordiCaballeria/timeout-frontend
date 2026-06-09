import React, { useCallback, useState } from "react";
import { Form, Button, Loader, Image, Grid, Divider } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNoticies } from "../../../../hooks/useNoticies";
import { EditorText } from "../../../Common/EditorText/EditorText";

export const AddEditNoticiesForm = (props) => {
  const { updateNoticia, createNoticia } = useNoticies();
  const { onClose, onRefesh, noticia, esdeveniments } = props;
  const [esdevenimentFilter, setEsdevenimentFilter] = useState(
    noticia ? noticia.esdeveniment : null
  );
  const [imatge, setImatge] = useState(noticia ? noticia.path_imatge : null);
  //const [publishDate, setPublishDate] = useState(noticia ? new Date(noticia.data_publicacio).toISOString().slice(0, 16) : datetimeLocal());

  let optionsEsdeveniments = esdeveniments
    ? esdeveniments.map((esdeveniment) => {
        return {
          id: esdeveniment.id,
          text: esdeveniment.nom,
          value: esdeveniment.id,
        };
      })
    : [];

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
    initialValues: initialValues(noticia),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: true,
    onSubmit: async (formValue) => {
      const {
        titol,
        subtitol,
        contingut,
        autor,
        fotograf,
        activa,
        data_publicacio,
        nomes_jugadors,
        path_imatge,
      } = formValue;

      let dades =
        (noticia !== undefined && path_imatge !== noticia.path_imatge) ||
        noticia === undefined
          ? {
              titol: titol,
              subtitol: subtitol,
              esdeveniment: esdevenimentFilter,
              contingut: contingut,
              autor: autor,
              fotograf: fotograf,
              activa: activa,
              data_publicacio: data_publicacio,
              nomes_jugadors: nomes_jugadors,
              path_imatge: path_imatge,
            }
          : {
              titol: titol,
              subtitol: subtitol,
              esdeveniment: esdevenimentFilter,
              contingut: contingut,
              autor: autor,
              fotograf: fotograf,
              activa: activa,
              data_publicacio: data_publicacio,
              nomes_jugadors: nomes_jugadors,
            };
      if (esdevenimentFilter === null) {
        const { esdeveniment, ...altresDades } = dades;
        dades = altresDades;
      }

      try {
        if (noticia) await updateNoticia(noticia.id, dades);
        else await createNoticia(dades);
        onRefesh();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleSlcChange = (e, data) => {
    setEsdevenimentFilter(data.value);
  };

  return (
    <>
      {esdeveniments ? (
        <Form
          className="create-edit-esdeveniment-form"
          onSubmit={formik.handleSubmit}
        >
          <Grid columns="equal" divided stackable>
            <Grid.Column>
              <Form.Input
                label="Títol"
                name="titol"
                placeholder="Títol"
                value={formik.values.titol}
                onChange={formik.handleChange}
                error={formik.errors.titol}
              />
              <Form.Input
                label="Subtítol"
                name="subtitol"
                placeholder="Subtítol"
                value={formik.values.subtitol}
                onChange={formik.handleChange}
                error={formik.errors.subtitol}
              />
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
              <Form.Input
                label="Fotograf"
                name="fotograf"
                placeholder="Fotograf"
                value={formik.values.fotograf}
                onChange={formik.handleChange}
                error={formik.errors.fotograf}
              />
              <Form.Input
                label="Autor"
                name="autor"
                placeholder="Autor"
                value={formik.values.autor}
                onChange={formik.handleChange}
                error={formik.errors.autor}
              />
              <Form.Dropdown
                selection
                label="Esdeveniment"
                name="esdeveniment"
                placeholder="Esdeveniment"
                options={optionsEsdeveniments}
                onChange={handleSlcChange}
                defaultValue={esdevenimentFilter}
              />
              <Form.Input
                label="Data de publicació"
                name="datahora"
                placeholder="Data/Hora"
                type="datetime-local"
                onChange={(_, data) =>
                  formik.setFieldValue("data_publicacio", data.value)
                }
                value={formik.values.data_publicacio}
                error={formik.errors.data_publicacio}
              />
              <Form.Checkbox
                label="Activa"
                toggle
                checked={formik.values.activa}
                onChange={(_, data) =>
                  formik.setFieldValue("activa", data.checked)
                }
              />
              <Form.Checkbox
                label="Nomes Jugadors"
                toggle
                checked={formik.values.nomes_jugadors}
                onChange={(_, data) =>
                  formik.setFieldValue("nomes_jugadors", data.checked)
                }
              />
            </Grid.Column>
            <Grid.Column width={12}>
              {/* <Form.TextArea
                label="Contingut"
                name="contingut"
                placeholder="Contingut"
                value={formik.values.contingut}
                onChange={formik.handleChange}
                error={formik.errors.contingut}
              /> */}
              <label>
                <strong>Contingut</strong>
              </label>
              <EditorText formik={formik} />
            </Grid.Column>
            <Grid.Row>
              <Button
                type="submit"
                content={noticia ? "Editar" : "Crear"}
                primary
                fluid
                color={formik.errors.path_imatge && "red"}
              />
            </Grid.Row>
          </Grid>
        </Form>
      ) : (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      )}
    </>
  );
};

const initialValues = (noticia) => {
  return {
    titol: noticia?.titol || "",
    subtitol: noticia?.subtitol || "",
    contingut: noticia?.contingut || "",
    autor: noticia?.autor || "",
    fotograf: noticia?.fotograf || "",
    path_imatge: noticia?.path_imatge || "",
    activa: noticia?.activa ? true : false,
    data_publicacio: noticia?.data_publicacio
      ? new Date(noticia.data_publicacio).toISOString().slice(0, 16)
      : datetimeLocal(),
    nomes_jugadors: noticia?.nomes_jugadors ? true : false,
  };
};

const newSchema = () => {
  return {
    titol: Yup.string().required("Introdueix un títol"),
    subtitol: Yup.string().required("Introdueix un subtítol"),
    contingut: Yup.string().required(
      "La noticia no es pot publicar sense contingut"
    ),
    autor: Yup.string().required("Introdueix l'autor de la notícia"),
    fotograf: Yup.string().required("Introdueix el fotògraf de les fotos"),
    path_imatge: Yup.string().required("La notícia ha de tindre una imatge"),
    activa: Yup.bool().required(true),
    data_publicacio: Yup.string().required(
      "La notícia ha de tindre una data de publicació"
    ),
    nomes_jugadors: Yup.bool().required(true),
  };
};

function datetimeLocal() {
  const dt = new Date();
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  return dt.toISOString().slice(0, 16);
}
