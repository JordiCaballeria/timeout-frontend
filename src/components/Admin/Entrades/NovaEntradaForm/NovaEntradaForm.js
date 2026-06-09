import React, { useState } from "react";
import { Form, Button, Grid, Divider, Header } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEsdeveniments } from "../../../../hooks/useEsdeveniments";
import { CardElement } from "@stripe/react-stripe-js";
import { usePagaments } from "../../../../hooks/usePagaments";
import { toast } from "react-toastify";
import { useEffect } from "react";
export const NovaEntradaForm = (props) => {
  const { esdeveniments, users, tipusPagament, onClose, onRefresh } = props;
  const [filterEsdeveniment, setFilterEsdeveniment] = useState();
  const [filterUser, setFilterUser] = useState();
  const [tipusFilter, setTipusFilter] = useState();
  const [total, setTotal] = useState(0);
  const { createEntrada } = useEsdeveniments();
  const [cardShow, setCardShow] = useState(false);
  const { loading, createPagamentStripe } = usePagaments();

  let optionsEsdeveniments = esdeveniments
    ? esdeveniments
        .filter((esdeveniment) => esdeveniment.tipusEsdeveniment !== 2)
        .map((esdeveniment) => {
          return {
            id: esdeveniment.id,
            text: esdeveniment.nom,
            value: esdeveniment.id,
            disabled:
              (Number(esdeveniment.num_entrades) !== 0 &&
                Number(esdeveniment.num_entrades_disponibles) === 0) ||
              (Number(esdeveniment.num_entrades) === 0 &&
                Number(esdeveniment.preu_entrades) === 0 &&
                esdeveniment.tipusesdeveniment_data.id === 1)
                ? true
                : false,
          };
        })
    : [];

  let optionsUser = users
    ? users.map((user) => {
        return {
          id: user.id,
          text: user.first_name + user.last_name,
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
    setFilterEsdeveniment();
    setFilterUser();
    setTipusFilter();
    setCardShow(false);
    formik.setFieldValue("quantitat", 1);
  }

  const handleSlcChangeEsdeveniment = (e, data) => {
    setFilterEsdeveniment(data.value);
  };

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
  });

  const handleSubmit = async () => {
    const { quantitat } = formik.values;
    const total = getTotal(quantitat);
    const dades = {
      user_id: filterUser,
      esdeveniment_id: filterEsdeveniment,
      quantitat: quantitat,
      total: total,
      tipusPagament_id: tipusFilter,
    };

    setCardShow(false);
    setFilterUser(null);
    setTipusFilter(1);

    if (tipusFilter === 3 && total !== 0) {
      const data = await createPagamentStripe(
        (total * 100).toFixed(0),
        CardElement
      );

      if (data.success) {
        try {
          await createEntrada(dades);
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
        await createEntrada(dades);
        resetFields();
        onRefresh();
        onClose();
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const getTotal = (quantitat) => {
    const esd = esdeveniments.filter(
      (esdeveniment) => esdeveniment.id === filterEsdeveniment
    );
    return Number(esd[0].preu_entrades) * Number(quantitat);
  };

  useEffect(() => {
    let totalTemp = 0;
    const esd = esdeveniments?.find(
      (esdeveniment) => esdeveniment.id === filterEsdeveniment
    );
    const comprador = users?.find((user) => user.id === filterUser);

    totalTemp += comprador?.is_soci
      ? Number(esd?.preu_entrades_soci) * formik.values.quantitat
      : Number(esd?.preu_entrades) * formik.values.quantitat;

    setTotal(totalTemp.toFixed(2));
  }, [
    filterEsdeveniment,
    filterUser,
    formik.values.quantitat,
    esdeveniments,
    users,
  ]);
  return (
    <>
      <Form className="create-venta-form" onSubmit={handleSubmit}>
        <Grid divided stackable>
          <Grid.Row>
            <Grid.Column width={8}>
              <Form.Dropdown
                selection
                clearable
                label="Esdeveniment"
                placeholder="Esdeveniment"
                options={optionsEsdeveniments}
                onChange={handleSlcChangeEsdeveniment}
                defaultValue={filterEsdeveniment}
              />
              <Form.Dropdown
                selection
                clearable
                search
                label="Comprador"
                placeholder="Comprador"
                options={optionsUser}
                onChange={handleSlcChangeUser}
                defaultValue={filterUser}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Form.Input
                label="Quantitat"
                name="quantitat"
                type="number"
                placeholder="Quantitat"
                value={formik.values.quantitat}
                onChange={formik.handleChange}
                error={formik.errors.quantitat}
              />
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
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              {filterUser && filterEsdeveniment ? (
                <Header as={"h3"} floated="right">
                  Total:
                  {!isNaN(total) && <b> {total} €</b>}
                  {isNaN(total) && <b> Calculant...</b>}
                </Header>
              ) : (
                ""
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider hidden style={{ height: "150px" }} />
        <Button
          type="submit"
          content={loading ? "Pagament en curs..." : "Realitzar venda"}
          primary
          fluid
          disabled={
            filterEsdeveniment && filterUser && tipusFilter ? false : true
          }
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
