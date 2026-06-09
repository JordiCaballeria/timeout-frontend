import React, { useState } from "react";
import "./TableUsers.scss";
import {
  Table,
  Button,
  Icon,
  Label,
  Grid,
  Input,
  Pagination,
} from "semantic-ui-react";
import _ from "lodash";
import { map } from "lodash";
import { useUser } from "../../../../hooks/useUser";

export const TableUsers = (props) => {
  const { users, updateUser, deleteUser, rolsUserData, enviarMail } = props;
  const { getRolsUser, checkPermis } = useUser();
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const nPages = Math.ceil(users.length / recordsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: users,
    direction: null,
  });
  const { column, data, direction } = state;

  function exampleReducer(state, action) {
    switch (action.type) {
      case "CHANGE_SORT":
        if (state.column === action.column) {
          return {
            ...state,
            data: state.data.slice().reverse(),
            direction:
              state.direction === "ascending" ? "descending" : "ascending",
          };
        }

        return {
          column: action.column,
          data: _.sortBy(state.data, [action.column]),
          direction: "ascending",
        };
      default:
        throw new Error();
    }
  }

  const onPress = async (user) => {
    await getRolsUser(user.id);
    rolsUserData();
  };

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
          <Table.HeaderCell
            sorted={column === "username" ? direction : null}
            onClick={() =>
              dispatch({ type: "CHANGE_SORT", column: "username" })
            }
          >
            Username
          </Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "nom" ? direction : null}
            onClick={() => dispatch({ type: "CHANGE_SORT", column: "nom" })}
          >
            Nom
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "cognoms" ? direction : null}
            onClick={() => dispatch({ type: "CHANGE_SORT", column: "cognoms" })}
          >
            Cognoms
          </Table.HeaderCell>
          <Table.HeaderCell>Rol</Table.HeaderCell>
          <Table.HeaderCell>Actiu</Table.HeaderCell>
          <Table.HeaderCell>Staff</Table.HeaderCell>
          <Table.HeaderCell>Soci</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(
          data.slice(indexOfFirstRecord, indexOfLastRecord),
          (user, index) => (
            <Table.Row key={index}>
              <Table.Cell disabled={!user.is_active}>
                {user.username}
              </Table.Cell>
              <Table.Cell disabled={!user.is_active}>{user.email}</Table.Cell>
              <Table.Cell disabled={!user.is_active}>
                {user.first_name}
              </Table.Cell>
              <Table.Cell disabled={!user.is_active}>
                {user.last_name}
              </Table.Cell>
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

              <Actions
                user={user}
                updateUser={updateUser}
                deleteUser={deleteUser}
                enviarMail={enviarMail}
                checkPermis={checkPermis}
              />
            </Table.Row>
          )
        )}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="10">
            <Grid stackable columns="equal" verticalAlign="middle">
              <Grid.Column>
                Llistats per pàgina:
                <Input
                  type="number"
                  style={{ width: "70px" }}
                  value={recordsPerPage}
                  onChange={(e) => setRecordsPerPage(e.target.value)}
                />
              </Grid.Column>
              <Grid.Column>
                Ensenyant {currentPage} de {nPages} pàgines de {users.length}{" "}
                registres
              </Grid.Column>
              <Grid.Column>
                <Pagination
                  floated="right"
                  totalPages={nPages}
                  onPageChange={(_, { activePage }) =>
                    setCurrentPage(activePage)
                  }
                />
              </Grid.Column>
            </Grid>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

const Actions = (props) => {
  const { user, updateUser, deleteUser, enviarMail, checkPermis } = props;
  return (
    <>
      <Table.Cell textAlign="right">
        {checkPermis("EnviarMails") && (
          <Button icon color="blue" onClick={() => enviarMail(user)}>
            <Icon name="mail" />
          </Button>
        )}
        {checkPermis("EditarUsers") && (
          <>
            <Button icon onClick={() => updateUser(user)}>
              <Icon name="pencil" />
            </Button>
            <Button icon negative onClick={() => deleteUser(user)}>
              <Icon name="close" />
            </Button>
          </>
        )}
      </Table.Cell>
    </>
  );
};
