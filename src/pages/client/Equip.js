import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Header, Card, Loader } from "semantic-ui-react";
import { useEquips } from "../../hooks/useEquips";
import { map } from "lodash";
import { BASE_API } from "../../utils/constants";

export function Equip() {
  const { equipId } = useParams();
  const { equip, getEquipById } = useEquips();

  const entrenadors = equip
    ? equip.users_data.filter((user) => user.rol === 6)
    : [];
  const jugadors = equip
    ? equip.users_data.filter((user) => user.rol === 7)
    : [];

  useEffect(() => {
    getEquipById(equipId);
  }, [equipId]);

  return (
    <>
      <Grid container doubling columns={6}>
        <Grid.Row>
          <Header as="h2">{equip?.nom}</Header>
        </Grid.Row>
        <Grid.Row textAlign="centered">
          <Header as="h3" dividing style={{ marginTop: "20px" }}>
            Entrenadors
          </Header>
        </Grid.Row>
        <Grid.Row centered stretched>
          {equip ? (
            entrenadors.length > 0 ? (
              map(entrenadors, (entrenador) => (
                <Grid.Column style={{ marginBottom: "25px" }}>
                  <Card raised centered key={entrenador.id}>
                    <img
                      alt={entrenador.nom}
                      src={
                        entrenador.user_data.path_photo
                          ? `${BASE_API}${entrenador.user_data.path_photo}`
                          : `${BASE_API}/uploads/User/avatar.png`
                      }
                      style={{ height: "170px", objectFit: "contain" }}
                    />
                    <Card.Content>
                      <Card.Header>
                        {entrenador.user_data.first_name +
                          " " +
                          entrenador.user_data.last_name}
                      </Card.Header>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))
            ) : (
              <Header
                as="h4"
                textAlign="centered"
                style={{ marginTop: "20px" }}
              >
                No hi ha entrenadors a l'equip {equip?.nom}
              </Header>
            )
          ) : (
            <Loader active inline="centered">
              Carregant...
            </Loader>
          )}
        </Grid.Row>
        <Grid.Row textAlign="centered">
          <Header as="h3" dividing style={{ marginTop: "20px" }}>
            Jugadors
          </Header>
        </Grid.Row>
        <Grid.Row centered stretched>
          {equip ? (
            jugadors.length > 0 ? (
              map(jugadors, (jugador) => (
                <Grid.Column style={{ marginBottom: "25px" }}>
                  <Card raised centered key={jugador.id}>
                    <img
                      alt={jugador.nom}
                      src={
                        jugador.user_data.path_photo
                          ? `${BASE_API}${jugador.user_data.path_photo}`
                          : `${BASE_API}/uploads/User/avatar.png`
                      }
                      style={{ height: "170px", objectFit: "contain" }}
                    />
                    <Card.Content>
                      <Card.Header>
                        {jugador.user_data.first_name +
                          " " +
                          jugador.user_data.last_name}
                      </Card.Header>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))
            ) : (
              <Header
                as="h4"
                textAlign="centered"
                style={{ marginTop: "20px" }}
              >
                No hi ha jugadors a l'equip {equip?.nom}
              </Header>
            )
          ) : (
            <Loader active inline="centered">
              Carregant...
            </Loader>
          )}
        </Grid.Row>
      </Grid>
    </>
  );
}
