import { map } from "lodash";
import React from "react";
import { Icon, Label, Table } from "semantic-ui-react";

export const TableResumSocis = (props) => {
  const { resumSocis } = props;
  return (
    <Table
      className="table-users-admin"
      color="orange"
      compact
      striped
      sortable
      style={{ height: "80vh" }}
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Username</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Nom</Table.HeaderCell>
          <Table.HeaderCell>Cognoms</Table.HeaderCell>
          <Table.HeaderCell>Rol</Table.HeaderCell>
          <Table.HeaderCell>Actiu</Table.HeaderCell>
          <Table.HeaderCell>Staff</Table.HeaderCell>
          <Table.HeaderCell>Soci</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {resumSocis.map((user, index) => (
          <Table.Row key={index}>
            <Table.Cell disabled={!user.is_active}>{user.username}</Table.Cell>
            <Table.Cell disabled={!user.is_active}>{user.email}</Table.Cell>
            <Table.Cell disabled={!user.is_active}>
              {user.first_name}
            </Table.Cell>
            <Table.Cell disabled={!user.is_active}>{user.last_name}</Table.Cell>
            <Table.Cell>
              {map(user.rols_data, (rol, index) => (
                <Label key={index}>{rol.nom}</Label>
              ))}
            </Table.Cell>
            <Table.Cell className="status">
              {user.is_active ? (
                <Icon name="check" color="green" />
              ) : (
                <Icon name="close" color="red" />
              )}
            </Table.Cell>
            <Table.Cell className="status">
              {user.is_staff ? (
                <Icon name="check" color="green" />
              ) : (
                <Icon name="close" color="red" />
              )}
            </Table.Cell>
            <Table.Cell className="status">
              {user.is_soci ? (
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
