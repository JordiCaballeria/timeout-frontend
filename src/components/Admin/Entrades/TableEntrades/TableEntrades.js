import React, { useState } from "react";
import "./TableEntrades.scss";
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

export const TableEntrades = (props) => {
  const { entrades, veureEntrada } = props;
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const nPages = Math.ceil(entrades?.length / recordsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const { checkPermis } = useUser();

  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: entrades,
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
      {entrades ? (
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
                Nom Usuari
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "esdeveniment" ? direction : null}
                onClick={() =>
                  dispatch({ type: "CHANGE_SORT", column: "tipusentrada" })
                }
              >
                Esdeveniments
              </Table.HeaderCell>
              <Table.HeaderCell>Tipus Esdeveniment</Table.HeaderCell>
              <Table.HeaderCell>Data</Table.HeaderCell>
              <Table.HeaderCell>Hora</Table.HeaderCell>
              <Table.HeaderCell>Codi QR</Table.HeaderCell>
              <Table.HeaderCell>Activa</Table.HeaderCell>
              {/*    <Table.HeaderCell></Table.HeaderCell> */}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {entrades
              .slice(indexOfFirstRecord, indexOfLastRecord)
              .map((entrada, index) => (
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
                  <Table.Cell>
                    {dateLocal(entrada.esdeveniment_data.data)}
                  </Table.Cell>
                  <Table.Cell>
                    {timeLocal(entrada.esdeveniment_data.data)}
                  </Table.Cell>
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
                  {/*     {checkPermis("EditarEntrades") && (
                    <Actions entrada={entrada} />
                  )} */}
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
                    {entrades.length} registres
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
  const { entrada, deleteEntrada } = props;
  return (
    <>
      <Table.Cell textAlign="right">
        <Button icon negative onClick={() => deleteEntrada(entrada)}>
          <Icon name="close" />
        </Button>
      </Table.Cell>
    </>
  );
};
