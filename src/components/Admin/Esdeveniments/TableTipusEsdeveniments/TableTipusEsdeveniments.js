import React, { useState } from "react";
import "./TableTipusEsdeveniments.scss";

import {
  Table,
  Button,
  Icon,
  Loader,
  Label,
  Grid,
  Input,
  Pagination,
} from "semantic-ui-react";
import { map } from "lodash";
import _ from "lodash";
import { useUser } from "../../../../hooks/useUser";

export const TableTipusEsdeveniments = (props) => {
  const { tipusEsdeveniments, onUpdate, onDelete } = props;
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const nPages = Math.ceil(tipusEsdeveniments.length / recordsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const { checkPermis } = useUser();

  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: tipusEsdeveniments,
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
  return (
    <>
      {tipusEsdeveniments ? (
        <Table
          className="table-rols-admin"
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
                Nom
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "descripcio" ? direction : null}
                onClick={() =>
                  dispatch({ type: "CHANGE_SORT", column: "descripcio" })
                }
              >
                Descripcio
              </Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(
              data.slice(indexOfFirstRecord, indexOfLastRecord),
              (tipusEsdeveniments, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{tipusEsdeveniments.id}</Table.Cell>
                  <Table.Cell>{tipusEsdeveniments.nom}</Table.Cell>
                  <Table.Cell>{tipusEsdeveniments.descripcio}</Table.Cell>
                  {checkPermis("EditarEsdeveniments") && (
                    <Actions
                      rol={tipusEsdeveniments}
                      updateRol={() => onUpdate(tipusEsdeveniments)}
                      deleteRol={() => onDelete(tipusEsdeveniments)}
                    />
                  )}
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
                    Ensenyant {currentPage} de {nPages} pàgines de{" "}
                    {tipusEsdeveniments.length} registres
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
  const { /* rol, */ updateRol, deleteRol } = props;
  return (
    <>
      <Table.Cell textAlign="right">
        <Button icon onClick={() => updateRol()}>
          <Icon name="pencil" />
        </Button>
        <Button icon negative onClick={() => deleteRol()}>
          <Icon name="close" />
        </Button>
      </Table.Cell>
    </>
  );
};
