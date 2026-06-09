import React, { useState } from "react";
import {
  Form,
  Button,
  Grid,
  Divider,
  Header,
  Icon,
  Dropdown,
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CardElement } from "@stripe/react-stripe-js";
import { usePagaments } from "../../../hooks/usePagaments";
import { useUser } from "../../../hooks/useUser";
import { toast } from "react-toastify";

import _ from "lodash";
import { useAuth } from "../../../hooks/useAuth";

export const SignSociForm = (props) => {
  const { user, onClose } = props;
  const { loading, createPagamentStripe } = usePagaments();
  const { createSoci } = useUser();
  const { navRefresh } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: false,
  });

  const handleSubmit = async (event) => {
    const quota = 25.0;
    const { quantitat } = formik.values;
    const total = quota * quantitat;
    const dades = {
      user_id: user.id,
      total: total,
      anys: quantitat,
      tipusPagament_id: 3,
    };

    const data = await createPagamentStripe(
      (total * 100).toFixed(0),
      CardElement
    );

    if (data.success) {
      try {
        await createSoci(dades);
        navRefresh();
        onClose();
      } catch (error) {
        toast.error(error);
      }
    } else {
      toast.error("Error en el pago:", data.error);
    }
  };

  function calculateDate(anys) {
    const dt = new Date();
    dt.setFullYear(dt.getFullYear() + anys);
    dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
    return dt.toLocaleDateString();
  }

  const getAnys = (number, prefix = "") =>
    _.times(number, (index) => ({
      key: index + 1,
      text: `${index + 1} ${prefix}`,
      value: index + 1,
    }));

  const onChangeAnys = (e, data) => {
    formik.setFieldValue("quantitat", data.value);
  };

  return (
    <>
      <Header as="h3" icon>
        <Icon name="user plus" />
        Vols formar part de la familia?
        <br />
        <br />
        <Header.Subheader>
          A continuació pots seleccionar la durada en anys de la teva membresia
          com a soci. Té un cost de només <b>25 €</b> per temporada i podràs
          gaudir de molts avantatges i descomptes.
        </Header.Subheader>
      </Header>
      <Form className="create-venta-form" onSubmit={handleSubmit}>
        <Grid>
          <Grid.Row columns={2} verticalAlign="middle">
            <Grid.Column>
              <label>
                <b>Anys: </b>
              </label>
              <Dropdown
                label="Anys"
                compact
                selection
                options={getAnys(10, "")}
                defaultValue={1}
                value={formik.values.quantitat}
                onChange={onChangeAnys}
                error={formik.errors.quantitat}
              />
            </Grid.Column>
            <Grid.Column floated="right">
              <Header as={"h3"} floated="right">
                Total: {formik.values.quantitat * Number(25)} €
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <p>
                La teva membresia caducarà el{" "}
                <b>{calculateDate(formik.values.quantitat)}</b>.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <CardElement
          options={{
            style: { base: { fontSize: "16px" } },
          }}
        />
        <Divider hidden style={{ height: "50px" }} />
        <Button
          type="submit"
          icon="lock"
          content={loading ? "Pagament en curs..." : "Pagar"}
          primary
          fluid
        />
      </Form>
    </>
  );
};

const initialValues = () => {
  return {
    quantitat: 1,
  };
};

const newSchema = () => {
  return {
    quantitat: Yup.number().required(true),
  };
};
