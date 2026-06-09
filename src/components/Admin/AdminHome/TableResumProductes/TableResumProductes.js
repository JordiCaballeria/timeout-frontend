import React from "react";
import { Image, Table } from "semantic-ui-react";
import { BASE_API } from "../../../../utils/constants";

export const TableResumProductes = (props) => {
  const { resumProductes } = props;
  return (
    <Table
      className="table-productes-admin"
      color="orange"
      compact
      striped
      sortable
      style={{ height: "80vh" }}
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Imatge</Table.HeaderCell>
          <Table.HeaderCell>Nom</Table.HeaderCell>
          <Table.HeaderCell>Comprador</Table.HeaderCell>
          <Table.HeaderCell>Tipus Producte</Table.HeaderCell>
          <Table.HeaderCell>Preu</Table.HeaderCell>
          <Table.HeaderCell>Preu Soci</Table.HeaderCell>
          <Table.HeaderCell>Quantitat</Table.HeaderCell>
          <Table.HeaderCell>Talla</Table.HeaderCell>
          <Table.HeaderCell>Total</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {resumProductes?.map((item, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell collapsing>
                <Image
                  centered
                  rounded
                  bordered
                  src={`${BASE_API}/uploads/User/avatar.png`}
                  width="100%"
                />
              </Table.Cell>
              <Table.Cell>{item.producte_data.nom}</Table.Cell>
              <Table.Cell>{item.pagament_data.user_data.username}</Table.Cell>
              <Table.Cell>{item.producte_data.tipus_data.nom}</Table.Cell>
              <Table.Cell>{item.producte_data.preu}</Table.Cell>
              <Table.Cell>{item.producte_data.preu_soci}</Table.Cell>
              <Table.Cell>{item.quantitat}</Table.Cell>
              <Table.Cell>{item.talla_data.nom}</Table.Cell>
              <Table.Cell>
                {item.pagament_data.total}
                {"€"}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
