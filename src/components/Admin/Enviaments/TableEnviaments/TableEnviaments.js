import React, { useState } from "react";
import "./TableEnviaments.scss";
import _, { update } from "lodash";

import {
  Table,
  Button,
  Icon,
  Loader,
  Grid,
  Input,
  Pagination,
} from "semantic-ui-react";
import { useUser } from "../../../../hooks/useUser";

export const TableEnviaments = (props) => {
  const { enviaments, deleteEnviament, veureDetalls, updateEnviament } = props;
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const nPages = Math.ceil(enviaments?.length / recordsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const { checkPermis } = useUser();

  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: enviaments,
    direction: null,
  });
  const { column, direction } = state;

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

  return (
    <>
      {enviaments ? (
        <Table
          className="table-enviaments-admin"
          color="orange"
          compact
          striped
          sortable
          style={{ height: "80vh" }}
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "id" ? direction : null}
                onClick={() => dispatch({ type: "CHANGE_SORT", column: "id" })}
              >
                #
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "nom" ? direction : null}
                onClick={() => dispatch({ type: "CHANGE_SORT", column: "nom" })}
              >
                Usuari
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "tipusenviament" ? direction : null}
                onClick={() =>
                  dispatch({ type: "CHANGE_SORT", column: "tipusenviament" })
                }
              >
                Estat Enviament
              </Table.HeaderCell>
              <Table.HeaderCell>Direcció</Table.HeaderCell>
              <Table.HeaderCell>Detalls</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {enviaments
              .slice(indexOfFirstRecord, indexOfLastRecord)
              .map((enviament, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{enviament.id}</Table.Cell>
                  <Table.Cell>
                    {enviament.pagament_data.user_data.first_name}{" "}
                    {enviament.pagament_data.user_data.last_name}
                  </Table.Cell>
                  <Table.Cell>
                    {enviament.estatenviament_data
                      ? enviament.estatenviament_data.nom
                      : "-"}
                  </Table.Cell>
                  <Table.Cell>{enviament.direccio}</Table.Cell>
                  <Table.Cell>
                    <Button
                      icon
                      onClick={() => veureDetalls(enviament.pagament_data)}
                    >
                      <Icon name="eye" />
                    </Button>
                  </Table.Cell>
                  {checkPermis("EditarEnviaments") && (
                    <Actions
                      enviament={enviament}
                      deleteEnviament={deleteEnviament}
                      updateEnviament={updateEnviament}
                    />
                  )}
                </Table.Row>
              ))}
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
                    Ensenyant {currentPage} de {nPages} pàgines de{" "}
                    {enviaments.length} registres
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
      ) : (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      )}
    </>
  );
};

const Actions = (props) => {
  const { enviament, deleteEnviament, updateEnviament } = props;
  return (
    <>
      <Table.Cell textAlign="right">
        <Button icon onClick={() => updateEnviament(enviament)}>
          <Icon name="pencil" />
        </Button>
        <Button icon negative onClick={() => deleteEnviament(enviament)}>
          <Icon name="close" />
        </Button>
      </Table.Cell>
    </>
  );
};
