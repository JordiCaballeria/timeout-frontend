import React, { useState, useEffect } from "react";
import { Form, Button, Grid, Divider, Table, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePagaments } from "../../../../hooks/usePagaments";
import { useAuth } from "../../../../hooks/useAuth";
import { CardElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

export const RealitzarVenta = (props) => {
  const { onClose, onRefesh, productes, tipusPagament } = props;
  const [producteFilter, setProducteFilter] = useState();
  const [cardShow, setCardShow] = useState(false);
  const [tipusFilter, setTipusFilter] = useState(1);
  const [tallaFilter, setTallaFilter] = useState();
  const [optionsTalles, setOptionsTalles] = useState([]);
  const [venta, setVenta] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { loading, createPagament, createPagamentStripe } = usePagaments();
  const { auth } = useAuth();

  const interruptor = () => {
    setRefresh((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const total = getTotal();
      const tipusPag = tipusPagament.filter(
        (tipus) => (tipus.id = tipusFilter)
      );
      const dades = {
        user_id: auth.me.id,
        productes: venta,
        total: total,
        tipusPagament: tipusPag[0],
      };
      if (tipusFilter === 3) handleSubmit((total * 100).toFixed(0), dades);
      else {
        try {
          await createPagament(dades);
          resetFields();
          onRefesh();
          onClose();
        } catch (error) {
          toast.error(error);
        }
      }
    },
  });

  const handleSubmit = async (total, dades) => {
    const data = await createPagamentStripe(total, CardElement);

    if (data.success) {
      try {
        await createPagament(dades);
        resetFields();
        onRefesh();
        onClose();
      } catch (error) {
        toast.error(error);
      }
    } else {
      toast.error(
        "Hi ha hagut un error en el pagament, torna a intentar-ho o contacte amb nosaltres"
      );
    }
  };

  function resetFields() {
    setProducteFilter();
    setCardShow(false);
    setTipusFilter(1);
    setTallaFilter();
    setOptionsTalles([]);
    setVenta([]);
  }

  const getTotal = () => {
    let suma = 0;
    if (venta.length === 0) return suma;
    venta.map((item, index) => {
      suma = Number(suma + Number(item.producte.preu) * Number(item.quantitat));
    });

    return suma;
  };

  let optionsProductes = productes
    ? productes.map((producte) => {
        return {
          id: producte.id,
          text: producte.nom,
          value: producte.id,
          disabled: producte.talles_producte.length === 0 ? true : false,
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

  const generarTalles = (talles) => {
    let optionsTallesAux =
      talles.length > 0
        ? talles.map((talla) => {
            return {
              id: talla.talla.id,
              text: talla.talla.nom,
              value: talla.id,
            };
          })
        : [];
    setOptionsTalles(optionsTallesAux);
  };

  useEffect(() => {}, [venta, refresh, optionsTalles]);

  const onClick = () => {
    let aux = venta;
    const aux2 = productes.filter((producte) => producte.id === producteFilter);
    const producte = aux2[0];
    aux.push({
      producte: producte,
      quantitat: formik.values.quantitat,
      productetalla_id: tallaFilter,
    });
    setVenta(aux);
    interruptor();
  };

  const handleSlcChangeProductes = (e, data) => {
    setProducteFilter(data.value);
    const product = productes.filter((product) => product.id === data.value);
    generarTalles(product[0].talles_producte);
  };
  const handleSlcChangeTalles = (e, data) => {
    setTallaFilter(data.value);
  };

  const handleSlcChangeTipusPagament = (e, data) => {
    if (data.value === 3) setCardShow(true);
    else setCardShow(false);
    setTipusFilter(data.value);
  };
  const getNomTalla = (talles, id) => {
    const tallaAux = talles.filter((talla) => (talla.id = id));

    return tallaAux[0].talla.nom;
  };
  const removeProducte = (detall) => {
    const index = venta.findIndex(
      (objeto) => objeto.productetalla_id === detall.productetalla_id
    );
    if (index !== -1) {
      venta.splice(index, 1);
    }
    interruptor();
  };
  return (
    <>
      <Form className="create-venta-form" onSubmit={formik.handleSubmit}>
        <Grid columns={2} divided stackable>
          <Grid.Row stretched>
            <Grid.Column width={8}>
              <Form.Dropdown
                selection
                clearable
                label="Producte"
                placeholder="Producte"
                options={optionsProductes}
                onChange={handleSlcChangeProductes}
                defaultValue={producteFilter}
              />
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
                label="Talles"
                placeholder="Talles"
                options={optionsTalles}
                onChange={handleSlcChangeTalles}
                defaultValue={tallaFilter}
              />
              <Form.Dropdown
                selection
                clearable
                label="Tipus de pagament"
                placeholder="Tipus de pagament"
                options={optionsTipusPagament}
                onChange={handleSlcChangeTipusPagament}
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
              <Divider hidden />
              <Button type="button" onClick={onClick} content={"Afegir"} />
            </Grid.Column>
            <Grid.Column width={8}>
              <Table
                className="table-pagaments-admin"
                color="orange"
                compact
                striped
                sortable
              >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Producte</Table.HeaderCell>
                    <Table.HeaderCell>Quantitat</Table.HeaderCell>
                    <Table.HeaderCell>Talla</Table.HeaderCell>
                    <Table.HeaderCell>Subtotal</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {venta.map((detall, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{detall.producte.nom}</Table.Cell>
                      <Table.Cell>{detall.quantitat}</Table.Cell>
                      <Table.Cell>
                        {getNomTalla(
                          detall.producte.talles_producte,
                          detall.productetalla_id
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        {detall.producte.preu * detall.quantitat}
                      </Table.Cell>
                      <Table.Cell>
                        <Table.Cell>
                          <Icon
                            link
                            name="trash alternate outline"
                            onClick={() => removeProducte(detall)}
                          />
                        </Table.Cell>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>
                      <b>{String(getTotal() + " €")}</b>
                    </Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider hidden />
        <Button
          type="submit"
          disabled={venta.length > 0 ? false : true}
          content={loading ? "Connectant amb stripe...." : "Realitzar venda"}
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
