import React, { useState } from "react";
import "./PatrocinadorsTable.scss";

import {
  Table,
  Button,
  Icon,
  Loader,
  Image,
  Grid,
  Input,
  Pagination,
} from "semantic-ui-react";
import { map } from "lodash";
import _ from "lodash";
import { useUser } from "../../../../hooks/useUser";

export const PatrocinadorsTable = (props) => {
  const { patrocinadors, onDelete, onUpdate } = props;
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const nPages = Math.ceil(patrocinadors.length / recordsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const { checkPermis } = useUser();

  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: patrocinadors,
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
      {patrocinadors ? (
        <Table
          className="table-patrocinadors-admin"
          color="orange"
          compact
          striped
          sortable
          fixed
          singleLine
          style={{ height: "80vh" }}
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                width={1}
                sorted={column === "id" ? direction : null}
                onClick={() => dispatch({ type: "CHANGE_SORT", column: "id" })}
              >
                #
              </Table.HeaderCell>
              <Table.HeaderCell width={3}>Imatge</Table.HeaderCell>
              <Table.HeaderCell
                width={3}
                sorted={column === "nom" ? direction : null}
                onClick={() => dispatch({ type: "CHANGE_SORT", column: "nom" })}
              >
                Nom
              </Table.HeaderCell>
              <Table.HeaderCell
                width={3}
                sorted={column === "email" ? direction : null}
                onClick={() =>
                  dispatch({ type: "CHANGE_SORT", column: "email" })
                }
              >
                Correu
              </Table.HeaderCell>
              <Table.HeaderCell
                width={2}
                sorted={column === "telefon" ? direction : null}
                onClick={() =>
                  dispatch({ type: "CHANGE_SORT", column: "telefon" })
                }
              >
                Telefon
              </Table.HeaderCell>
              <Table.HeaderCell
                width={2}
                sorted={column === "direccio" ? direction : null}
                onClick={() =>
                  dispatch({ type: "CHANGE_SORT", column: "direccio" })
                }
              >
                Direccio
              </Table.HeaderCell>
              <Table.HeaderCell width={4}>Enllaç</Table.HeaderCell>
              <Table.HeaderCell width={2}>Actiu</Table.HeaderCell>
              <Table.HeaderCell width={3}></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(
              data.slice(indexOfFirstRecord, indexOfLastRecord),
              (patrocinador, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{patrocinador.id}</Table.Cell>
                  <Table.Cell>
                    <Image src={patrocinador.path_imatge} rounded size="tiny" />
                  </Table.Cell>
                  <Table.Cell>{patrocinador.nom}</Table.Cell>
                  <Table.Cell>{patrocinador.email}</Table.Cell>
                  <Table.Cell>{patrocinador.telefon}</Table.Cell>
                  <Table.Cell>{patrocinador.direccio}</Table.Cell>
                  <Table.Cell>{patrocinador.link}</Table.Cell>
                  <Table.Cell className="status">
                    {patrocinador.actiu ? (
                      <Icon name="check" color="green" />
                    ) : (
                      <Icon name="close" color="red" />
                    )}
                  </Table.Cell>
                  {checkPermis("EditarPatrocinadors") && (
                    <Actions
                      patrocinador={patrocinador}
                      updatePatrocinador={() => onUpdate(patrocinador)}
                      deletePatrocinador={() => onDelete(patrocinador)}
                    />
                  )}
                </Table.Row>
              )
            )}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="11">
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
                    {patrocinadors.length} registres
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
  const { patrocinador, updatePatrocinador, deletePatrocinador } = props;

  return (
    <>
      <Table.Cell textAlign="right">
        <Button icon onClick={() => updatePatrocinador(patrocinador)}>
          <Icon name="pencil" />
        </Button>
        <Button icon negative onClick={() => deletePatrocinador(patrocinador)}>
          <Icon name="close" />
        </Button>
      </Table.Cell>
    </>
  );
};
