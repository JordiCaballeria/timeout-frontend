import React, { useState, useCallback } from "react";
import {
  Grid,
  Image,
  Form,
  Button,
  Segment,
  Header,
  Divider,
} from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useProductes } from "../../../../hooks/useProductes";
import { BASE_API } from "../../../../utils/constants";

export const CreateEditProducte = (props) => {
  const { talles, producte, tipusProducte, onClose, onRefesh } = props;
  const [imatgesFilter, setImatgesFilter] = useState([]);
  const [tipusFilter, setTipusFilter] = useState(
    producte ? producte.tipusProducte : null
  );
  const { createProducte, updateProducte } = useProductes();
  const [imatge, setImatge] = useState(
    producte ? producte.imatges_producte : []
  );
  const [canvi, setCanvi] = useState(false);
  const formik = useFormik({
    initialValues: initialValues(producte),
    validationSchema: Yup.object(producte ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const { nom, preu, descripcio, preu_soci, ...tallesForm } = formValue;

      const producte2 = {
        nom,
        preu,
        descripcio,
        preu_soci,
        tipusProducte: tipusFilter,
      };

      try {
        if (producte) {
          await updateProducte(
            producte.id,
            producte2,
            canvi ? producte.imatges_producte : [],
            imatgesFilter,
            tallesForm
          );
        } else {
          await createProducte(producte2, imatgesFilter, tallesForm);
        }
        onRefesh();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback(async (acceptedFiles) => {
    setCanvi(true);
    setImatgesFilter(acceptedFiles);
    let aux = [];
    for (let img in acceptedFiles) {
      aux.push(URL.createObjectURL(acceptedFiles[img]));
    }
    setImatge(aux);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: true,
    onDrop,
  });
  const handleSlcChange = (e, data) => {
    setTipusFilter(data.value);
  };
  let options = tipusProducte
    ? tipusProducte.map((tipus) => {
        return { id: tipus.id, text: tipus.nom, value: tipus.id };
      })
    : [];
  const comprovarTalla = (talla) => {
    for (const element of producte.talles_producte) {
      if (element.talla.id === talla.id) {
        return Number(element.quantitat);
      }
    }
    return 0;
  };
  const retornarImatge = (img) => {
    if (producte && canvi) return img;
    if (producte) return `${BASE_API}${img.path_imatge}`;
    return img;
  };

  function removeImage(index) {
    let imatgeArray = [...imatge];
    let imatgesFilterArray = [...imatgesFilter];

    imatgeArray.splice(index, 1);
    imatgesFilterArray.splice(index, 1);

    setImatge(imatgeArray);
    setImatgesFilter(imatgesFilterArray);
  }
  return (
    <Form className="create-edit-producte-form" onSubmit={formik.handleSubmit}>
      <Grid columns={3} divided stackable>
        <Grid.Row stretched>
          <Grid.Column width={7}>
            <Header as={"h3"}>Imatges</Header>
            <Segment
              style={{
                minHeight: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {imatge.length > 0 ? (
                <Image.Group>
                  {imatge.map((img, index) => {
                    return (
                      <Image
                        centered
                        src={retornarImatge(img)}
                        size="small"
                        bordered
                        label={{
                          as: "a",
                          color: "red",
                          corner: "right",
                          icon: "delete",
                          onClick: () => removeImage(index),
                        }}
                      />
                    );
                  })}
                </Image.Group>
              ) : (
                <p>Selecciona les imatges del producte</p>
              )}
            </Segment>
            <Form.Button
              type="button"
              content={imatge.length > 0 ? "Canviar Imatges" : "Pujar Imatges"}
              fluid
              {...getRootProps()}
            />
            <input {...getInputProps()} />
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as={"h3"}>Producte</Header>
            <Form.Dropdown
              selection
              label="Tipus de producte"
              name="tipus_producte"
              placeholder="Tipus de producte"
              options={options}
              onChange={handleSlcChange}
              defaultValue={tipusFilter}
            />
            <Form.Input
              label="Nom"
              name="nom"
              placeholder="Nom"
              value={formik.values.nom}
              onChange={formik.handleChange}
              error={formik.errors.nom}
            />
            <Form.Input
              label="Descripcio"
              name="descripcio"
              placeholder="Descripcio"
              value={formik.values.descripcio}
              onChange={formik.handleChange}
              error={formik.errors.descripcio}
            />
            <Form.Input
              label="Preu"
              name="preu"
              placeholder="Preu"
              value={formik.values.preu}
              onChange={formik.handleChange}
              error={formik.errors.preu}
              type="number"
            />
            <Form.Input
              label="Preu Soci"
              name="preu_soci"
              placeholder="Preu Soci"
              value={formik.values.preu_soci}
              onChange={formik.handleChange}
              error={formik.errors.preu_soci}
              type="number"
            />
          </Grid.Column>
          <Grid.Column width={2}>
            <Header as={"h3"}>Talles / Quantitats</Header>
            {talles.map((talla, index) => {
              return (
                <Grid key={index} columns={2}>
                  <Grid.Row stretched>
                    <Grid.Column textAlign="middle">
                      <Header as={"h5"}>{talla.nom}</Header>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Input
                        type="number"
                        name={talla.id}
                        placeholder={talla.nom}
                        value={formik.values[talla.id]}
                        onChange={formik.handleChange}
                        defaultValue={producte ? comprovarTalla(talla) : 0}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              );
            })}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider hidden />
      <Button
        type="submit"
        content={producte ? "Editar" : "Crear"}
        primary
        fluid
      />
    </Form>
  );
};

const initialValues = (producte) => {
  return {
    nom: producte?.nom || "",
    descripcio: producte?.descripcio || "",
    preu: producte?.preu || "",
    preu_soci: producte?.preu_soci || "",
  };
};

const newSchema = () => {
  return {
    nom: Yup.string().required(true),
    descripcio: Yup.string().required(true),
    preu: Yup.number(),
    preu_soci: Yup.number(),
  };
};
const updateSchema = () => {
  return {
    nom: Yup.string().required(true),
    descripcio: Yup.string().required(true),
    preu: Yup.number(),
    preu_soci: Yup.number(),
  };
};
