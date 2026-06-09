import React, { useState } from "react";
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
import { CardElement } from "@stripe/react-stripe-js";
import { usePagaments } from "../../../hooks/usePagaments";
import { useAuth } from "../../../hooks/useAuth";
import { map } from "lodash";
import { FacturaProductesPdf } from "../../Common/PDFTemplates/FacturaProductes";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEnviaments } from "../../../hooks/useEnviaments";
import { removeAllProductsCart } from "../../../api/cart";
import { toast } from "react-toastify";

export const PayCartForm = (props) => {
  const { onClose, onRefesh, productes, venta, tipusPagament, total } = props;
  const { loading, createPagament, createPagamentStripe } = usePagaments();
  const { auth, navRefresh } = useAuth();
  const { createEnviament } = useEnviaments();
  const [pagat, setPagat] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleSubmit = async () => {
    const tipusPag = tipusPagament.filter((tipus) => (tipus.id = 3));
    const dades = {
      user_id: auth.me.id,
      productes: dadesProductes,
      total: total,
      tipusPagament: tipusPag[0],
    };
    const data = await createPagamentStripe(
      (total * 100).toFixed(0),
      CardElement
    );

    if (data.success) {
      setShowLoader(true);
      try {
        const pagament = await createPagament(dades);
        const data = {
          pagament: pagament.id,
          direccio: auth.me.address,
          estatenviament: 1,
        };
        await createEnviament(data);
        setPagat(true);
        removeAllProductsCart();
        setShowLoader(false);
      } catch (error) {
        toast.error(error);
      }
    } else {
      toast.error(
        "Hi ha hagut un error en el pagament, torna a intentar-ho o contacte amb nosaltres"
      );
      setShowLoader(false);
    }
  };

  const adaptarDades = () => {
    let productesAux = [];
    map(venta, (item) => {
      let producte = productes.filter((product) => product.id === item.id);
      let quantitat = item.quantitat;
      let productetalla_id = producte[0].talles_producte.filter(
        (tallaproducte) => tallaproducte.talla.nom === item.talla
      );
      const itemAux = {
        producte: producte[0],
        quantitat: quantitat,
        productetalla_id: productetalla_id[0].id,
      };
      productesAux.push(itemAux);
    });
    return productesAux;
  };

  const dadesProductes = adaptarDades();

  return (
    <>
      <Dimmer active={showLoader}>
        <Loader indeterminate>Pagament en curs...</Loader>
      </Dimmer>
      {pagat ? (
        <>
          <Header as="h3" icon>
            <Icon name="check circle outline" color="green" />
            Compra realitzada correctament
            <br />
            <br />
            <Header.Subheader>
              El paquet s'enviarà a l'adreça que està especificada en el teu
              perfil. A continuació pots descarregar el rebut de la compra.
            </Header.Subheader>
          </Header>
          <Divider hidden />
          <Button
            type="button"
            secondary
            fluid /* onClick={() => navigate(`/cistella`)} */
          >
            <PDFDownloadLink
              document={
                <FacturaProductesPdf
                  detalls={dadesProductes}
                  user={auth?.me}
                  tipusPagament={tipusPagament}
                  preuTotal={total}
                />
              }
              fileName={"detalls.pdf"}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Generando PDF..." : "Descarregar rebut"
              }
            </PDFDownloadLink>
          </Button>
          <Divider hidden style={{margin: "5px"}}/>
          <Button
            type="button"
            negative
            fluid
            onClick={() => {
              onRefesh();
              navRefresh();
              onClose();
            }}
          >
            Tancar
          </Button>
        </>
      ) : (
        <Form className="create-venta-form" onSubmit={handleSubmit}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Header as={"h3"} floated="left">
                  Resum de la compra:
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <List>
                  {productes.map((producte, index) => (
                    <List.Item key={index}>
                      <List.Icon
                        name="circle"
                        size="mini"
                        verticalAlign="middle"
                      />
                      <List.Content>
                        x{venta[index]?.quantitat} {producte?.nom}
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header as={"h3"} floated="right">
                  Total: {total} €
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <List>
                  <List.Item key={0} style={{ fontSize: "12px" }}>
                    <List.Icon name="exclamation" />
                    <List.Content>
                      L'adreça d'enviament de la compra és la que tens
                      especificada en el teu perfil. Si desitges modificar-la
                      fes-ho abans de realitzar la compra. Actualment:{" "}
                      <b>{auth?.me.address}</b>
                    </List.Content>
                  </List.Item>
                </List>
              </Grid.Column>
            </Grid.Row>
            <Divider />
            <Grid.Row>
              <Grid.Column>
                <Header as={"h3"} floated="left">
                  Pagament:
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <CardElement
                  options={{
                    style: { base: { fontSize: "16px" } },
                  }}
                />
                <Divider hidden />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Button
            type="submit"
            icon="lock"
            content={loading ? "Connectant amb stripe...." : "Pagar"}
            primary
            fluid
            style={{ marginBottom: "10px" }}
          />
        </Form>
      )}
    </>
  );
};
