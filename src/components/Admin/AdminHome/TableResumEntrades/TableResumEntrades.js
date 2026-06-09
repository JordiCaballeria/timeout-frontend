import React from "react";
import { Button, Icon, Table } from "semantic-ui-react";

export const TableResumEntrades = (props) => {
  const { resumEntrades, veureEntrada } = props;

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
    <Table
      className="table-entrades-admin"
      color="orange"
      compact
      striped
      sortable
      style={{ height: "80vh" }}
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>#</Table.HeaderCell>
          <Table.HeaderCell>Nom Usuari</Table.HeaderCell>
          <Table.HeaderCell>Esdeveniment</Table.HeaderCell>
          <Table.HeaderCell>Tipus Esdeveniment</Table.HeaderCell>
          <Table.HeaderCell>Data</Table.HeaderCell>
          <Table.HeaderCell>Hora</Table.HeaderCell>
          <Table.HeaderCell>Codi QR</Table.HeaderCell>
          <Table.HeaderCell>Activa</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {resumEntrades.map((entrada, index) => (
          <Table.Row key={index}>
            <Table.Cell>{entrada.id}</Table.Cell>
            <Table.Cell>
              {entrada.pagament_data.user_data.first_name}{" "}
              {entrada.pagament_data.user_data.last_name}
            </Table.Cell>
            <Table.Cell>{entrada.esdeveniment_data.nom}</Table.Cell>
            <Table.Cell>
              {entrada.esdeveniment_data.tipusesdeveniment_data
                ? entrada.esdeveniment_data.tipusesdeveniment_data.nom
                : "-"}
            </Table.Cell>
            <Table.Cell>{dateLocal(entrada.esdeveniment_data.data)}</Table.Cell>
            <Table.Cell>{timeLocal(entrada.esdeveniment_data.data)}</Table.Cell>
            <Table.Cell>
              <Button icon onClick={() => veureEntrada(entrada)}>
                <Icon name="eye" />
              </Button>
            </Table.Cell>
            <Table.Cell className="status">
              {entrada.activa ? (
                <Icon name="check" color="green" />
              ) : (
                <Icon name="close" color="red" />
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
