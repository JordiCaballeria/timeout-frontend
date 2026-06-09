import React, { useState } from "react";
import _ from "lodash";

import { Table, Button, Icon } from "semantic-ui-react";
import { useUser } from "../../../../hooks/useUser";
export const TableDetallsPagament = (props) => {
  const { detalls } = props;
  return (
    <>
      <Table
        className="table-pagaments-admin"
        color="orange"
        compact
        striped
        sortable
        style={{ height: "80vh" }}
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Producte</Table.HeaderCell>
            <Table.HeaderCell>Quantitat</Table.HeaderCell>
            <Table.HeaderCell>Total Producte</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {detalls.map((detall, index) => (
            <Table.Row key={index}>
              <Table.Cell>{detall.id}</Table.Cell>
              <Table.Cell>{detall.producte_data.nom}</Table.Cell>
              <Table.Cell>{detall.quantitat}</Table.Cell>
              <Table.Cell>
                {detall.producte_data.preu * detall.quantitat}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
