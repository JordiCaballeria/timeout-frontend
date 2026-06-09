import React, { useEffect, useState } from "react";
import { useEsdeveniments } from "../../hooks/useEsdeveniments";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";
import { map } from "lodash";
import "./Partits.scss";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { ComprarEntradaForm } from "../../components/Client/ComprarEntradaForm/ComprarEntradaForm";
import { useUser } from "../../hooks/useUser";
import { LoginForm } from '../../components/Admin/LoginForm/LoginForm'
import { RecuperarPassword } from '../../components/Common/RecuperarPassword/RecuperarPassword'

import moment from 'moment';
import 'moment/locale/ca';
moment.locale('ca');

export const Partits = () => {
  const { getPartits, partits } = useEsdeveniments();
  const { auth } = useUser();

  const equips = partits
    ? [...new Set(partits.map((partit) => partit.equip_data.nom))]
    : [];
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setshowLogin] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const ModalShowLogin = () => setshowLogin((prev) => !prev);
  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);

  useEffect(() => {
    getPartits();
  }, []);

  useEffect(() => {
    closeModalAuth();
    // eslint-disable-next-line
  }, [auth, refresh]);

  const closeModalAuth = () => {
    if (auth) {
      setshowLogin(false);
    }
  };

  function dateLocal(datetime) {
    const dt = new Date(datetime);
    dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
    return dt;
  }

  function timeLocal(datetime) {
    const dt = new Date(datetime);
    dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
    return dt.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  const comprarEntrada = (data) => {
    setTitleModal("Comprar entrades", data.id);
    setContentModal(
      <ComprarEntradaForm
        partit={data}
        user={auth?.me}
        onClose={openCloseModal}
      />
    );
    openCloseModal();
  };

  const onRecuperar = () => {
    setTitleModal("Recuperar contrasseya");
    setContentModal(
      <RecuperarPassword onClose={openCloseModal} onRefesh={onRefesh} />
    );
    openCloseModal();
  };

  return equips ? (
    <>
      <Grid stackable relaxed style={{ marginLeft: 0, marginRight: 0 }}>
        <Grid.Column>
          {map(equips, (equip) => (
            <Segment>
              <Header
                as="h1"
                block
                style={{ backgroundColor: "black", color: "white" }}
              >
                {equip}
              </Header>
              <Divider hidden />
              <Grid
                /* container */ columns={4}
                divided="vertically"
                verticalAlign="middle"
                stackable /* padded */ /* relaxed */
              >
                {map(
                  partits
                    .sort(
                      (a, b) =>
                        new Date(a.data).setHours(0, 0, 0, 0) -
                        new Date(b.data).setHours(0, 0, 0, 0)
                    )
                    .filter((partit) => partit.equip_data.nom === equip
                      && moment(dateLocal(partit.data)).diff(moment(dateLocal(new Date())).add(1, 'hours')) > 0),
                  (partit) => (
                    <Grid.Row centered>
                      <Grid.Column width={3}>
                        <Header as="h3">
                          <Icon name="calendar" />
                          <Header.Content>
                            {dateLocal(partit.data).toLocaleDateString()}
                            <Header.Subheader>
                              {timeLocal(partit.data)}
                            </Header.Subheader>
                          </Header.Content>
                        </Header>
                      </Grid.Column>

                      <Grid.Column width={5}>
                        <div style={{ fontSize: "16px" }}>
                          <a
                            href={`https://www.google.es/maps/search/${partit.location}`}
                            target="_blank"
                          >
                            <Icon
                              link
                              color="red"
                              size="big"
                              name="map marker alternate"
                            />
                          </a>
                          {partit.location}
                        </div>
                      </Grid.Column>

                      <Grid.Column width={5}>
                        <Header as="h3">
                          {/* <Label size="tiny">Local</Label> */} {partit.nom}{" "}
                          {/* <Label size="tiny">Visitant</Label> */}
                        </Header>{" "}
                        {/* {equip.equipLocal } <span style={{color: 'blue'}} >vs</span> {equip.equipVisitant}*/}
                      </Grid.Column>
                      <Grid.Column width={3}>
                        <Button
                          floated="right"
                          color="green"
                          disabled={partit.tipusesdeveniment_data.id !== 1 || (Number(partit.num_entrades) === 0 && Number(partit.preu_entrades) === 0) || (Number(partit.num_entrades_disponibles) === 0 && Number(partit.preu_entrades) !== 0)}
                          onClick={() => { auth?.me ? comprarEntrada(partit) : ModalShowLogin() }}
                          style={{ minWidth: "180px" }}
                        >
                          {((Number(partit.num_entrades_disponibles) !== 0 && Number(partit.preu_entrades) !== 0) || (partit.tipusesdeveniment_data.id !== 1)) && 'Comprar Entrades'}
                          {Number(partit.num_entrades) === 0 && Number(partit.preu_entrades) === 0 && partit.tipusesdeveniment_data.id === 1 && 'Gratuït'}
                          {Number(partit.num_entrades) !== 0 && Number(partit.preu_entrades) === 0 && 'Reservar entrades'}
                          {Number(partit.num_entrades) !== 0 && Number(partit.num_entrades_disponibles) === 0 && 'Esgotat'}
                          <Icon name="chevron right" />
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  )
                )}
              </Grid>
            </Segment>
          ))}
        </Grid.Column>
      </Grid>
      <ModalBasic show={showLogin} onClose={ModalShowLogin} title="Iniciar sessió">
        <LoginForm onRecuperar={onRecuperar} />
      </ModalBasic>
      <ModalBasic
        show={showModal}
        title={titlewModal}
        children={contentModal}
        onClose={openCloseModal}
        size="tiny"
      />
    </>
  ) : (
    []
  );
};
