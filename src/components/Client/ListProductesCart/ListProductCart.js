import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  List,
  Segment,
  Table,
} from "semantic-ui-react";
import { map, forEach } from "lodash";
import { getProductsCart, removeProductCart } from "../../../api/cart";
import { useAuth } from "../../../hooks/useAuth";
import "./ListProductCart.scss";
import { BASE_API } from "../../../utils/constants";
import { LoginForm } from '../../../components/Admin/LoginForm/LoginForm'
import { ModalBasic } from '../../Common/ModalBasic'
import { RecuperarPassword } from '../../Common/RecuperarPassword/RecuperarPassword'

export function ListProductCart(props) {
  const { productes, onReload, onPagar } = props;
  const detailsProducts = getProductsCart();
  const { auth } = useAuth();
  const [total, setTotal] = useState(0);
  const [codiPromocional, setCodiPromocional] = useState("");
  const [totalNormal, setTotalNormal] = useState(0);
  const [showLogin, setshowLogin] = useState(false);
  const navigate = useNavigate();

  
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refresh, setRefresh] = useState(false);
  
  
  const ModalShowLogin = () => setshowLogin((prev) => !prev);
  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);

  useEffect(() => {
    closeModalAuth();
    // eslint-disable-next-line
  }, [auth, refresh]);

  const closeModalAuth = () => {
    if (auth) {
      setshowLogin(false);
    }
  };

  useEffect(() => {
    let totalTemp = 0;
    let totalTempNormal = 0;

    forEach(productes, (product, index) => {
      let preu = auth?.me?.is_soci
        ? Number(product.preu_soci)
        : Number(product.preu);
      totalTemp += preu * detailsProducts[index]?.quantitat;
      totalTempNormal += product.preu * detailsProducts[index]?.quantitat;
    });

    setTotal(totalTemp.toFixed(2));
    setTotalNormal(totalTempNormal.toFixed(2));
  }, [productes, auth, detailsProducts]);

  const removeProducte = (index) => {
    removeProductCart(index);
    onReload();
  };


  /*  function onChangeQuantitat(value) {
         if (quantitat + value !== 0) {
             setQuantitat(quantitat + value)
         }
     } */

  const onRecuperar = () => {
    setTitleModal("Recuperar contrasseya");
    setContentModal(
      <RecuperarPassword onClose={openCloseModal} onRefesh={onRefesh} />
    );
    openCloseModal();
  };

  return (
    <>
      <Grid /* container */ stackable relaxed className="cart">
        <Grid.Row columns={2} /* stretched */>
          <Grid.Column width={11}>
            <Table stackable /* basic */>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Producte</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell>Preu</Table.HeaderCell>
                  {/* <Table.HeaderCell>Quantitat</Table.HeaderCell> */}
                  <Table.HeaderCell>Subtotal</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {map(productes, (producte, index) => (
                  <Table.Row key={index}>
                    <Table.Cell collapsing>
                      <Image
                        rounded
                        /* size='tiny' */
                        width="100%"
                        className="enllaç"
                        onClick={() => navigate(`/botiga/${producte.id}`)}
                        src={
                          producte.imatges_producte.length > 0
                            ? `${BASE_API}${producte.imatges_producte[0].path_imatge}`
                            : "https://react.semantic-ui.com/images/wireframe/image.png"
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Header as="h4">
                        <span
                          onClick={() => navigate(`/botiga/${producte.id}`)}
                          className="enllaç"
                        >
                          {producte.nom}
                        </span>
                        <Header.Subheader>
                          <span>Talla: {detailsProducts[index]?.talla}</span>
                          <span style={{ paddingLeft: "10px" }}>
                            Quantitat: {detailsProducts[index]?.quantitat}
                          </span>
                        </Header.Subheader>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {auth?.me?.is_soci && (
                        <Header as="h4">
                          <del>{producte.preu} €</del>
                          <Header.Subheader>
                            <b>
                              <span style={{ color: "#db2828" }}>
                                {producte.preu_soci} €
                              </span>
                            </b>
                          </Header.Subheader>
                        </Header>
                      )}
                      {!auth?.me?.is_soci && (
                        <>
                          <Header as="h4">{producte.preu} €</Header>
                        </>
                      )}
                    </Table.Cell>
                    {/* <Table.Cell>
                                            <Button.Group >
                                                <Button icon='minus' onClick={() => (onChangeQuantitat(-1))} />
                                                <Button.Or text={detailsProducts[index]?.quantitat} />
                                                <Button icon='plus'  onClick={() => (onChangeQuantitat(1))} />
                                            </Button.Group>
                                        </Table.Cell> */}
                    <Table.Cell>
                      {(
                        detailsProducts[index]?.quantitat *
                        (auth?.me?.is_soci ? producte.preu_soci : producte.preu)
                      ).toFixed(2)}{" "}
                      €
                    </Table.Cell>
                    <Table.Cell>
                      <Icon
                        link
                        name="trash alternate outline"
                        onClick={() => removeProducte(index)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell>
                    <b>{productes.length} productes</b>
                  </Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell>
                    {!isNaN(total) && <b>{total} €</b>}
                    {isNaN(total) && <b>Calculant...</b>}
                  </Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </Grid.Column>
          <Grid.Column width={5}>
            <Segment>
              <List divided relaxed="very">
                <List.Item>
                  <List.Header>Introduir codi de descompte</List.Header>
                  <Input
                    fluid
                    action="Aplicar"
                    placeholder="Codi promocional"
                    size="large"
                    style={{ margin: "15px 0" }}
                  />
                  {codiPromocional && (
                    <b style={{ color: "#21ba45" }}>
                      El jordi et dona un 15% de descompte
                    </b>
                  )}
                </List.Item>
                <List.Item>
                  <b>Subtotal</b>
                  <List.Content floated="right">
                    {!isNaN(totalNormal) && <p>{totalNormal} €</p>}
                    {isNaN(totalNormal) && <p>Calculant...</p>}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <b>IVA</b>
                  <List.Content floated="right">-</List.Content>
                </List.Item>
                <List.Item>
                  <b>Codi promocional</b>
                  <List.Content floated="right">
                    {codiPromocional ? (
                      <b style={{ color: "#db2828" }}>{codiPromocional} €</b>
                    ) : (
                      "-"
                    )}
                  </List.Content>
                </List.Item>
                {auth?.me?.is_soci && (
                  <List.Item>
                    <b>Descompte soci</b>
                    <List.Content floated="right">
                      {!isNaN(total - totalNormal) && (
                        <b style={{ color: "#db2828" }}>
                          {(total - totalNormal).toFixed(2)} €
                        </b>
                      )}
                      {isNaN(total - totalNormal) && <p>Calculant...</p>}
                    </List.Content>
                  </List.Item>
                )}
                <List.Item style={{ fontSize: "20px" }}>
                  <b>Total estimat</b>
                  <List.Content floated="right">
                    {!isNaN(total) && <b>{total} €</b>}
                    {isNaN(total) && <b>Calculant...</b>}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Button
                    primary
                    fluid
                    icon="lock"
                    content="Pagar"
                    onClick={() => { auth?.me ? onPagar(detailsProducts, total) : ModalShowLogin() }}
                  />
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <ModalBasic show={showLogin} onClose={ModalShowLogin} title="Iniciar sessió">
        <LoginForm onRecuperar={onRecuperar} />
      </ModalBasic>
      <ModalBasic
            show={showModal}
            title={titlewModal}
            children={contentModal}
            onClose={openCloseModal}
            size={"tiny"}
          />
    </>
  );
}
