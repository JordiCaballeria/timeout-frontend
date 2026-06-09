import React from "react";
import QRCode from "qrcode.react";
import { Grid, List } from "semantic-ui-react";
export const VeureEntrada = (props) => {
  const { entrada } = props;

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
  
  return (
    <Grid columns={2}>
      <Grid.Column width={7} textAlign="center" verticalAlign="middle">
        <QRCode size={250} value={`${entrada.codi}`} />
      </Grid.Column>
      <Grid.Column width={9} >
        <List size="medium" divided relaxed>
          <List.Item>
            <List.Header>Usuari:</List.Header>
            <List.List>
              <List.Item
                icon="user"
                content={`${entrada.pagament_data.user_data.first_name} ${entrada.pagament_data.user_data.last_name}`}
              />
              <List.Item
                icon="mail"
                content={entrada.pagament_data.user_data.email}
              />
            </List.List>
          </List.Item>

          <List.Item>
            <List.Header>Entrada:</List.Header>
            <List.List>
              <List.Item icon="id badge" content={`Num Ref:  ${entrada.id}`} />
              <List.Item
                icon="dollar"
                content={`${entrada.esdeveniment_data.preu_entrades} €`}
              />
            </List.List>

          </List.Item>
          <List.Item>
            <List.Header>Esdeveniment:</List.Header>
            <List.List>
              <List.Item
                icon="ticket alternate"
                content={entrada.esdeveniment_data.nom}
              />
              <List.Item
                icon="marker"
                content={entrada.esdeveniment_data.location || ""}
              />
              <List.Item
                icon="calendar"
                content={dateLocal(entrada.esdeveniment_data.data)}
              />
              <List.Item
                icon="clock"
                content={timeLocal(entrada.esdeveniment_data.data)}
              />
            </List.List>
          </List.Item>
        </List>
      </Grid.Column>
    </Grid>
  );
};
