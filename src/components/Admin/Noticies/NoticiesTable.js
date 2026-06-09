import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NoticiesTable.scss";

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
import { useUser } from "../../../hooks/useUser";

export const NoticiesTable = (props) => {
  const { noticies, onDelete, onUpdate } = props;
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const nPages = Math.ceil(noticies.length / recordsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const { checkPermis } = useUser();

  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: noticies,
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
      {noticies ? (
        <Table
          className="table-noticies-admin"
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
              {/* <Table.HeaderCell
                width={1}
                sorted={column === "id" ? direction : null}
                onClick={() => dispatch({ type: "CHANGE_SORT", column: "id" })}
              >
                #
              </Table.HeaderCell> */}
              <Table.HeaderCell width={3}>Imatge</Table.HeaderCell>
              <Table.HeaderCell
                width={6}
                sorted={column === "titol" ? direction : null}
                onClick={() =>
                  dispatch({ type: "CHANGE_SORT", column: "titol" })
                }
              >
                Titol
              </Table.HeaderCell>
              {/* <Table.HeaderCell
                width={3}
                sorted={column === "subtitol" ? direction : null}
                onClick={() =>
                  dispatch({ type: "CHANGE_SORT", column: "subtitol" })
                }
              >
                Subtitol
              </Table.HeaderCell> */}
              {/* <Table.HeaderCell
                width={3}
                sorted={column === "contingut" ? direction : null}
                onClick={() =>
                  dispatch({ type: "CHANGE_SORT", column: "contingut" })
                }
              >
                Contingut
              </Table.HeaderCell> */}
              <Table.HeaderCell
                width={6}
                sorted={column === "esdeveniment" ? direction : null}
                onClick={() =>
                  dispatch({ type: "CHANGE_SORT", column: "esdeveniment" })
                }
              >
                Esdeveniment
              </Table.HeaderCell>
              <Table.HeaderCell
                width={2}
                sorted={column === "autor" ? direction : null}
                onClick={() =>
                  dispatch({ type: "CHANGE_SORT", column: "autor" })
                }
              >
                Autor
              </Table.HeaderCell>
              <Table.HeaderCell
                width={2}
                sorted={column === "fotograf" ? direction : null}
                onClick={() =>
                  dispatch({ type: "CHANGE_SORT", column: "fotograf" })
                }
              >
                Fotograf
              </Table.HeaderCell>
              <Table.HeaderCell width={2}>Activa</Table.HeaderCell>
              <Table.HeaderCell width={3}>Nomes Jugadors</Table.HeaderCell>
              <Table.HeaderCell width={4}></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(
              data.slice(indexOfFirstRecord, indexOfLastRecord),
              (noticia, index) => (
                <Table.Row key={index}>
                  {/* <Table.Cell>{noticia.id}</Table.Cell> */}
                  <Table.Cell collapsing>
                    <Image centered rounded bordered src={noticia.path_imatge} width='100%' />
                  </Table.Cell>
                  <Table.Cell>{noticia.titol}</Table.Cell>
                  {/* <Table.Cell>{noticia.subtitol}</Table.Cell> */}
                  {/* <Table.Cell>{noticia.contingut}</Table.Cell> */}
                  <Table.Cell>
                    {noticia.esdeveniment_data
                      ? noticia.esdeveniment_data.nom
                      : "-"}
                  </Table.Cell>
                  <Table.Cell>{noticia.autor}</Table.Cell>
                  <Table.Cell>{noticia.fotograf}</Table.Cell>
                  <Table.Cell className="status">
                    {noticia.activa ? (
                      <Icon name="check" color="green" />
                    ) : (
                      <Icon name="close" color="red" />
                    )}
                  </Table.Cell>
                  <Table.Cell className="status">
                    {noticia.nomes_jugadors ? (
                      <Icon name="check" color="green" />
                    ) : (
                      <Icon name="close" color="red" />
                    )}
                  </Table.Cell>
                  {checkPermis("EditarNoticies") && (
                    <Actions
                      noticia={noticia}
                      updateNoticia={() => onUpdate(noticia)}
                      deleteNoticia={() => onDelete(noticia)}
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
                    {noticies.length} registres
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
  const { noticia, updateNoticia, deleteNoticia } = props;
  const navigate = useNavigate();

  return (
    <>
      <Table.Cell textAlign="right">
        <Button
          icon
          color="teal"
          onClick={() => navigate(`/noticies/${noticia.id}`)}
        >
          <Icon name="external" />
        </Button>
        <Button icon onClick={() => updateNoticia(noticia)}>
          <Icon name="pencil" />
        </Button>
        <Button icon negative onClick={() => deleteNoticia()}>
          <Icon name="close" />
        </Button>
      </Table.Cell>
    </>
  );
};
