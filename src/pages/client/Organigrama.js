import React from "react";
import { Grid, Header, Card, Divider } from "semantic-ui-react";
import { BASE_API } from "../../utils/constants";

export function Organigrama() {

  return (
    <>
      <Grid centered container stackable doubling divided="vertically">
        <Grid.Row>
          <Grid.Column>
            <Header as="h1" block>
              ORGANIGRAMA
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Divider hidden />
        <Grid.Row centered columns={4}>
          <Grid.Column>
            <Card centered color="orange">
              <img
                alt={"example"}
                src="https://i.ibb.co/YDVwms3/Oriol-Ferran.png"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Content>
                <Card.Header>Oriol Ferran</Card.Header>
                <Card.Meta>President</Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={4}>
          <Grid.Column>
            <Card centered color="orange">
              <img
                alt={"example"}
                src="https://i.ibb.co/zrscBD4/Alejandro-Almansa.png"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Content>
                <Card.Header>Alejandro Almansa</Card.Header>
                <Card.Meta>Secretari</Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card centered color="orange">
              <img
                alt={"example"}
                src="https://i.ibb.co/nwzCNRD/Francesc-Farras.png"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Content>
                <Card.Header>Francesc Farràs</Card.Header>
                <Card.Meta>Tresorer</Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={4}>
          <Grid.Column>
            <Card centered color="orange">
              <img
                alt={"example"}
                src="https://i.ibb.co/K7gFmWq/Josu-Quintana.png"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Content>
                <Card.Header>Josu Quintana</Card.Header>
                <Card.Meta>Direcció Esportiva</Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card centered color="orange">
              <img
                alt={"example"}
                src="https://i.ibb.co/NKqq0Lq/Laura-Perez.png"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Content>
                <Card.Header>Laura Pérez</Card.Header>
                <Card.Meta>Direcció Escola</Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card centered color="orange">
              <img
                alt={"example"}
                src="https://i.ibb.co/2SGyPW3/Celia-Navarrete.png"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Content>
                <Card.Header>Cèlia Navarrete</Card.Header>
                <Card.Meta>Àrea de màrqueting i patrocinis</Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card centered color="orange">
              <img
                alt={"example"}
                src="https://i.ibb.co/zrscBD4/Alejandro-Almansa.png"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Content>
                <Card.Header>Alejandro Almansa</Card.Header>
                <Card.Meta>Àrea social</Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
