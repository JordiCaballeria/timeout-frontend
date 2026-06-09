import React, { useState } from "react";
import { Form, Button, Grid, Divider, Header } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CardElement } from "@stripe/react-stripe-js";
import { usePagaments } from "../../../../hooks/usePagaments";
import { useUser } from "../../../../hooks/useUser";
import { toast } from "react-toastify";

export const NouSociForm = (props) => {
  const { users, tipusPagament, onClose, onRefresh } = props;
  const [filterUser, setFilterUser] = useState();
  const [tipusFilter, setTipusFilter] = useState();
  const [cardShow, setCardShow] = useState(false);
  const { loading, createPagamentStripe } = usePagaments();
  const { createSoci } = useUser();

  let optionsUser = users
    ? users.map((user) => {
        return {
          id: user.id,
          text: user.first_name + " " + user.last_name,
          value: user.id,
        };
      })
    : [];
  let optionsTipusPagament = tipusPagament
    ? tipusPagament.map((tipus) => {
        return {
          id: tipus.id,
          text: tipus.nom,
          value: tipus.id,
        };
      })
    : [];

  function resetFields() {
    setFilterUser();
    setTipusFilter();
    setCardShow(false);
    formik.setFieldValue("quantitat", 1);
  }

  const handleSlcChangeUser = (e, data) => {
    setFilterUser(data.value);
  };

  const handleSlcChangeTipus = (e, data) => {
    if (data.value === 3) setCardShow(true);
    else setCardShow(false);
    setTipusFilter(data.value);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: false,
    onSubmit: async () => {
      const quota = 25.0;
      const { quantitat } = formik.values;
      const total = quota * quantitat;
      const dades = {
        user_id: filterUser,
        total: total,
        anys: quantitat,
        tipusPagament_id: tipusFilter,
      };
      if (tipusFilter === 3) {
        const data = await createPagamentStripe(
          (total * 100).toFixed(0),
          CardElement
        );

        if (data.success) {
          try {
            await createSoci(dades);
            resetFields();
            onRefresh();
            onClose();
          } catch (error) {
            toast.error(error);
          }
        } else {
          toast.error(
            "Hi ha hagut un error en el pagament, torna a intentar-ho o contacte amb nosaltres"
          );
        }
      } else {
        try {
          await createSoci(dades);
          resetFields();
          onRefresh();
          onClose();
        } catch (error) {
          toast.error(error);
        }
      }
    },
  });

  return (
    <>
      <Form className="create-venta-form" onSubmit={formik.handleSubmit}>
        <Grid columns={2} divided stackable>
          <Grid.Column width={8}>
            <Form.Dropdown
              selection
              clearable
              search
              label="Nou Soci"
              placeholder="Usuari"
              options={optionsUser}
              onChange={handleSlcChangeUser}
              defaultValue={filterUser}
            />
            <Form.Input
              label="Anys"
              name="quantitat"
              type="number"
              placeholder="Numero d'anys"
              value={formik.values.quantitat}
              onChange={formik.handleChange}
              error={formik.errors.quantitat}
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Form.Dropdown
              selection
              clearable
              label="Tipus de pagament"
              placeholder="Tipus de pagament"
              options={optionsTipusPagament}
              onChange={handleSlcChangeTipus}
              defaultValue={tipusFilter}
            />
            <Divider hidden />
            {cardShow && (
              <CardElement
                options={{
                  style: { base: { fontSize: "16px" } },
                }}
              />
            )}
            {filterUser && tipusFilter && (
              <Header as={"h3"} floated="right" style={{ marginTop: "30px" }}>
                Total:
                {!isNaN(formik.values.quantitat * 25) && (
                  <b> {formik.values.quantitat * 25} €</b>
                )}
                {isNaN(formik.values.quantitat * 25) && <b> Calculant...</b>}
              </Header>
            )}
          </Grid.Column>
        </Grid>
        <Divider hidden style={{ height: "70px" }} />
        <Button
          type="submit"
          content={loading ? "Pagament en curs..." : "Donar d'alta"}
          disabled={filterUser && tipusFilter ? false : true}
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
