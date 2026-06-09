import React, { useState } from "react";
import "./TableEsdeveniments.scss";
import _ from "lodash";

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

export const TableEsdeveniments = (props) => {
  const { esdeveniments, updateEsdeveniment, deleteEsdeveniment } = props;
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const nPages = Math.ceil(esdeveniments.length / recordsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const { checkPermis } = useUser();

  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: esdeveniments,
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
    <>
      {esdeveniments ? (
        <Table
          className="table-esdeveniments-admin"
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
                onClick={() =>
                  dispatch({ type: "CHANGE_SORT", column: "username" })
                }
              >
                Nom
              </Table.HeaderCell>
              <Table.HeaderCell>Data</Table.HeaderCell>
              <Table.HeaderCell>Hora</Table.HeaderCell>
              {/* <Table.HeaderCell>Descripcio</Table.HeaderCell> */}
              <Table.HeaderCell>Tipus Esdeveniment</Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "equip" ? direction : null}
                onClick={() =>
                  dispatch({ type: "CHANGE_SORT", column: "equip" })
                }
              >
                Equip
              </Table.HeaderCell>
              <Table.HeaderCell>Entrades disponibles</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {esdeveniments
              .slice(indexOfFirstRecord, indexOfLastRecord)
              .map((esdeveniment, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{esdeveniment.id}</Table.Cell>
                  <Table.Cell>{esdeveniment.nom}</Table.Cell>
                  <Table.Cell>{dateLocal(esdeveniment.data)}</Table.Cell>
                  <Table.Cell>{timeLocal(esdeveniment.data)}</Table.Cell>
                  {/* <Table.Cell>{esdeveniment.descripcio}</Table.Cell> */}
                  <Table.Cell>
                    {esdeveniment.tipusesdeveniment_data
                      ? esdeveniment.tipusesdeveniment_data.nom
                      : "-"}
                  </Table.Cell>
                  <Table.Cell>
                    {esdeveniment.equip_data
                      ? esdeveniment.equip_data.nom
                      : "-"}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {esdeveniment.tipusesdeveniment_data.id === 1 ? esdeveniment.num_entrades_disponibles : "-"}
                  </Table.Cell>
                  {checkPermis("EditarEsdeveniments") && (
                    <Actions
                      esdeveniment={esdeveniment}
                      updateEsdeveniment={updateEsdeveniment}
                      deleteEsdeveniment={deleteEsdeveniment}
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
                    {esdeveniments.length} registres
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
  const { esdeveniment, updateEsdeveniment, deleteEsdeveniment } = props;
  return (
    <>
      <Table.Cell textAlign="right">
        <Button icon onClick={() => updateEsdeveniment(esdeveniment)}>
          <Icon name="pencil" />
        </Button>
        <Button icon negative onClick={() => deleteEsdeveniment(esdeveniment)}>
          <Icon name="close" />
        </Button>
      </Table.Cell>
    </>
  );
};
