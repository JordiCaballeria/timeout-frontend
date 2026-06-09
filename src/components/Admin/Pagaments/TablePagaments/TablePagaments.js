import React, { useState } from "react";
import "./TablePagaments.scss";
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

export const TablePagaments = (props) => {
  const { pagaments, deletePagament, veureDetalls } = props;
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const nPages = Math.ceil(pagaments?.length / recordsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const { checkPermis } = useUser();
  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: pagaments,
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

  const returnBotiga = (pagament) => {
    if (pagament.detalls_data.length > 0) return "Productes";
    if (pagament.total !== "0.00" && pagament.total % 25 === 0)
      return "Quota soci";
    return "Entrades";
  };

  return (
    <>
      {pagaments ? (
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
                sorted={column === "tipuspagament" ? direction : null}
                onClick={() =>
                  dispatch({ type: "CHANGE_SORT", column: "tipuspagament" })
                }
              >
                Tipus Pagament
              </Table.HeaderCell>
              <Table.HeaderCell>Data</Table.HeaderCell>
              <Table.HeaderCell>Hora</Table.HeaderCell>
              <Table.HeaderCell>Detalls</Table.HeaderCell>
              <Table.HeaderCell>Venta</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {pagaments
              .slice(indexOfFirstRecord, indexOfLastRecord)
              .map((pagament, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{pagament.id}</Table.Cell>
                  <Table.Cell>
                    {pagament.user_data.first_name}{" "}
                    {pagament.user_data.last_name}
                  </Table.Cell>
                  <Table.Cell>
                    {pagament.tipuspagament_data
                      ? pagament.tipuspagament_data.nom
                      : "-"}
                  </Table.Cell>
                  <Table.Cell>
                    {pagament.created_at ? dateLocal(pagament.created_at) : "-"}
                  </Table.Cell>
                  <Table.Cell>
                    {pagament.created_at ? timeLocal(pagament.created_at) : "-"}
                  </Table.Cell>
                  <Table.Cell>
                    {pagament.detalls_data.length > 0 ? (
                      <Button icon onClick={() => veureDetalls(pagament)}>
                        <Icon name="eye" />
                      </Button>
                    ) : (
                      "-"
                    )}
                  </Table.Cell>
                  <Table.Cell>{returnBotiga(pagament)}</Table.Cell>
                  <Table.Cell>{pagament.total} €</Table.Cell>
                  {checkPermis("EditarPagaments") && (
                    <Actions
                      pagament={pagament}
                      deletePagament={deletePagament}
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
                    {pagaments.length} registres
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
  const { pagament, deletePagament } = props;
  return (
    <>
      <Table.Cell textAlign="right">
        <Button icon negative onClick={() => deletePagament(pagament)}>
          <Icon name="close" />
        </Button>
      </Table.Cell>
    </>
  );
};
