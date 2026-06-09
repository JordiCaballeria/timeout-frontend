import React from "react";
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Image,
  List,
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Contacte.scss";
import { useUser } from "../../hooks/useUser";

export function Contacte() {
  const { enviarContacte } = useUser();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: true,
    onSubmit: async (formValue) => {
      try {
        await enviarContacte(formValue);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <Grid
        container
        stackable
        textAlign="justified"
        className="container-contacte"
      >
        <Grid.Row columns={"equal"}>
          <Grid.Column>
            <Form
              className="create-edit-user-form"
              onSubmit={formik.handleSubmit}
            >
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
                label="Població"
                name="poblacio"
                type="text"
                placeholder="Població"
                value={formik.values.poblacio}
                onChange={formik.handleChange}
                error={formik.errors.poblacio}
              />
              <Form.Input
                label="Telèfon"
                name="telefon"
                type="number"
                placeholder="Telèfon"
                value={formik.values.telefon}
                onChange={formik.handleChange}
                error={formik.errors.telefon}
              />
              <Form.TextArea
                label="Comentaris"
                name="comentaris"
                type="text"
                placeholder="Comentaris"
                value={formik.values.comentaris}
                onChange={formik.handleChange}
                error={formik.errors.comentaris}
              />
              <Button
                type="submit"
                content={"Enviar"}
                primary
                floated="right"
              />
            </Form>
          </Grid.Column>
          <Grid.Column>
            <List>
              <List.Header as={"h1"}>
                Estadi del Sabadell Rugby Club
              </List.Header>
              <List.Item style={{ fontSize: "20px" }}>
                <List.Content>Carrer de Rialb, 11</List.Content>
              </List.Item>
              <List.Item style={{ fontSize: "20px" }}>
                <List.Content>08207 Sabadell</List.Content>
              </List.Item>
              <List.Item style={{ fontSize: "20px" }}>
                <List.Content>Barcelona (Spain)</List.Content>
              </List.Item>
              <List.Item style={{ fontSize: "20px" }}>
                <List.Icon name="phone" />
                <List.Content>
                  <a href="tel:661014837">+34 661 014 837</a>
                </List.Content>
              </List.Item>
              <List.Item style={{ fontSize: "20px" }}>
                <List.Icon name="mail" />
                <List.Content>
                  <a href="mailto:sbdrugbyclub@gmail.com">
                    sbdrugbyclub@gmail.com
                  </a>
                </List.Content>
              </List.Item>

              <Divider />

              <List.Header as={"h3"}>
                <List.Content>ESCOLETA DE RUGBY</List.Content>
              </List.Header>
              <List.Item style={{ fontSize: "16px" }}>
                <List.Icon name="user" />
                <List.Content>Laura</List.Content>
              </List.Item>
              <List.Item style={{ fontSize: "16px" }}>
                <List.Icon name="whatsapp" />
                <List.Content>
                  <a href="https://wa.me/34603601881">+34 603 601 881</a>
                </List.Content>
              </List.Item>
              <List.Item style={{ fontSize: "16px" }}>
                <List.Icon name="mail" />
                <List.Content>
                  <a href="mailto:src.escoleta@gmail.com">
                    src.escoleta@gmail.com
                  </a>
                </List.Content>
              </List.Item>

              <Divider />

              <List.Header as={"h3"}>
                <List.Content>HORARI</List.Content>
              </List.Header>
              <Divider hidden />
              <Grid columns={"equal"} className="horari">
                <Grid.Row>
                  <Grid.Column width={3}>Dilluns:</Grid.Column>
                  <Grid.Column floated="left">17:30–19:00</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={3}>Dimarts:</Grid.Column>
                  <Grid.Column>19:30–21:00</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={3}>Dimecres:</Grid.Column>
                  <Grid.Column>17:30–19:00</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={3}>Dijous:</Grid.Column>
                  <Grid.Column>20:00–21:30</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={3}>Divendres:</Grid.Column>
                  <Grid.Column>19:30–21:00</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={3}>Dissabte:</Grid.Column>
                  <Grid.Column>16:00–21:00</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={3}>Diumenge:</Grid.Column>
                  <Grid.Column>
                    <span style={{ color: "#db2828" }}>Tancat</span>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

const initialValues = () => {
  return {
    first_name: "",
    last_name: "",
    email: "",
    poblacio: "",
    telefon: "",
    comentaris: "",
  };
};
const newSchema = () => {
  return {
    first_name: Yup.string().required(true),
    last_name: Yup.string().required(true),
    email: Yup.string()
      .email("Introdueix un correu valid")
      .required("Introdueix un correu"),
    poblacio: Yup.string().required(true),
    telefon: Yup.number().required(true),
    comentaris: Yup.string().required(true),
  };
};
