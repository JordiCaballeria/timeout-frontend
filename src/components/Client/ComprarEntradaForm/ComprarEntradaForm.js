import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Grid,
  Divider,
  Header,
  Icon,
  List,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CardElement } from "@stripe/react-stripe-js";
import { useEsdeveniments } from "../../../hooks/useEsdeveniments";
import { usePagaments } from "../../../hooks/usePagaments";
import { toast } from "react-toastify";

export const ComprarEntradaForm = (props) => {
  const { partit, user, onClose } = props;
  const { createEntrada } = useEsdeveniments();
  const [preuTotal, setPreuTotal] = useState(0);
  const [showLoader, setShowLoader] = useState(false)
  const { loading: loadingPagaments, createPagamentStripe } = usePagaments();
  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { quantitat } = formik.values;
    const total = getTotal(quantitat);
    const dades = {
      user_id: user.id,
      esdeveniment_id: partit.id,
      quantitat: quantitat,
      total: total,
      tipusPagament_id: 3,
    };
    
    const data = await createPagamentStripe(
      (total * 100).toFixed(0),
      CardElement
      );
      
      if (data.success) {
        try {
        setShowLoader(true);
        await createEntrada(dades);
        onClose();
        setShowLoader(false);
      } catch (error) {
        toast.error(error);
        setShowLoader(false);
      }
    } else {
      toast.error("Error en el pago:", data.error);
    }
  };

  const getTotal = (quantitat) => {
    return Number(partit.preu_entrades) * Number(quantitat);
  };

  function dateLocal(datetime) {
    const dt = new Date(datetime);
    dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
    return dt.toLocaleDateString();
  }

  function timeLocal(datetime) {
    const dt = new Date(datetime);
    dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
    return dt.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function onChangeQuantitat(value) {
    if (
      formik.values.quantitat + value !==
      0 /* && quantitat + value <= quantitatMax */
    ) {
      formik.setFieldValue("quantitat", formik.values.quantitat + value);
    }
  }

  useEffect(() => {
    setPreuTotal(
      (
        formik.values.quantitat *
        (user?.is_soci ? partit.preu_entrades_soci : partit.preu_entrades)
      ).toFixed(2)
    );
  }, [
    formik.values.quantitat,
    partit.preu_entrades,
    partit.preu_entrades_soci,
    user?.is_soci,
  ]);

  return (
    <>
      <Header as="h3" icon textAlign="center">
        <Dimmer active={showLoader}>
          <Loader indeterminate>Pagament en curs...</Loader>
        </Dimmer>
        <Icon name="ticket" />
        {partit.nom}!
        <br />
        <br />
        <Header.Subheader>{partit.descripcio}</Header.Subheader>
      </Header>
      <Divider />
      <List>
        <List.Item>
          <List.Icon name="calendar" />
          <List.Content>{dateLocal(partit.data)}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="clock" />
          <List.Content>{timeLocal(partit.data)}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="map marker alternate" />
          <List.Content>{partit.location}</List.Content>
        </List.Item>
      </List>
      <Divider hidden />
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <label>
              <b>Número d'entrades</b>
            </label>
            <br />
            <Icon name="info circle"></Icon>
            <label color="grey">
              <span>Preu per entrada: </span>
              {user?.is_soci ? (
                <>
                  <del>{partit.preu_entrades} €</del>
                  <span style={{ color: "#db2828" }}>
                    {" "}
                    {partit.preu_entrades_soci} €
                  </span>
                </>
              ) : (
                <span> {partit.preu_entrades} €</span>
              )}
            </label>
          </Grid.Column>
          <Grid.Column width={2} floated="right">
            <Button.Group floated="right">
              <Button
                type="text"
                icon="minus"
                disabled={formik.values.quantitat === 1}
                onClick={() => onChangeQuantitat(-1)}
              />
              <Button.Or text={formik.values.quantitat} />
              <Button
                type="text"
                icon="plus"
                disabled={
                  formik.values.quantitat === Number(partit.num_entrades)
                }
                onClick={() => onChangeQuantitat(1)}
              />
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column floated="right">
            <Header as={"h3"} floated="right">
              Total: {preuTotal} €
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Divider />
      <Header as={"h3"} floated="left">
        Pagament:
      </Header>
      <Divider hidden />
      <CardElement
        options={{
          style: { base: { fontSize: "16px" } },
        }}
      />
      <Divider hidden />
      <Button
        onClick={handleSubmit}
        content={loadingPagaments ? "Pagament en curs..." : "Pagar"}
        primary
        fluid
      />
    </>
  );
};

const initialValues = (user) => {
  return {
    quantitat: 1,
  };
};

const newSchema = () => {
  return {
    quantitat: Yup.number().required(true),
  };
};
