import React, { useState } from "react";
import "./TableCompeticio.scss";

import {
  Table,
  Button,
  Icon,
  Loader,
  Grid,
  Input,
  Pagination,
} from "semantic-ui-react";
import { map } from "lodash";
import _ from "lodash";
import { useUser } from "../../../../hooks/useUser";

export const TableCompeticio = (props) => {
  const { data, onUpdate, onDelete } = props;
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const nPages = Math.ceil(data.length / recordsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const { checkPermis } = useUser();

  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    dataCompteicio: data,
    direction: null,
  });
  const { column, dataCompteicio, direction } = state;

  function exampleReducer(state, action) {
    switch (action.type) {
      case "CHANGE_SORT":
        if (state.column === action.column) {
          return {
            ...state,
            dataCompteicio: state.dataCompteicio.slice().reverse(),
            direction:
              state.direction === "ascending" ? "descending" : "ascending",
          };
        }

        return {
          column: action.column,
          dataCompteicio: _.sortBy(state.dataCompteicio, [action.column]),
          direction: "ascending",
        };
      default:
        throw new Error();
    }
  }
  return (
    <>
      {data ? (
        <Table
          className="table-rols-admin"
          color="orange"
          compact
          striped
          sortable
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "nom" ? direction : null}
                onClick={() => dispatch({ type: "CHANGE_SORT", column: "nom" })}
              >
                Nom
              </Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(
              dataCompteicio.slice(indexOfFirstRecord, indexOfLastRecord),
              (a, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{a.id}</Table.Cell>
                  <Table.Cell>{a.nom}</Table.Cell>
                  {checkPermis("EditarCompeticio") && (
                    <Actions
                      onUpdate={() => onUpdate(a)}
                      onDelete={() => onDelete(a)}
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
                    Ensenyant {currentPage} de {nPages} pàgines de {data.length}{" "}
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
      ) : (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      )}
    </>
  );
};

const Actions = (props) => {
  const { onUpdate, onDelete } = props;
  return (
    <>
      <Table.Cell textAlign="right">
        <Button icon onClick={() => onUpdate()}>
          <Icon name="pencil" />
        </Button>
        <Button icon negative onClick={() => onDelete()}>
          <Icon name="close" />
        </Button>
      </Table.Cell>
    </>
  );
};
