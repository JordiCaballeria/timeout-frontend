import React, { useState } from "react";
import "./TableJugadores.scss";

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
import _ from "lodash";
import { useUser } from "../../../../hooks/useUser";
import { BASE_API } from "../../../../utils/constants";

export const TableJugadores = (props) => {
  const { jugadores, onDelete, onUpdate } = props;
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const nPages = Math.ceil(jugadores.length / recordsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const { checkPermis } = useUser();

  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: jugadores,
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
      {jugadores ? (
        <Table
          className="table-jugadores-admin"
          color="orange"
          compact
          striped
          sortable
          style={{ height: "80vh" }}
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Foto</Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "username" ? direction : null}
                onClick={() =>
                  dispatch({ type: "CHANGE_SORT", column: "username" })
                }
              >
                Username
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "nom" ? direction : null}
                onClick={() => dispatch({ type: "CHANGE_SORT", column: "nom" })}
              >
                Nom
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "cognoms" ? direction : null}
                onClick={() =>
                  dispatch({ type: "CHANGE_SORT", column: "cognoms" })
                }
              >
                Cognoms
              </Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Dorsal</Table.HeaderCell>
              <Table.HeaderCell>Fitxa</Table.HeaderCell>
              {/* <Table.HeaderCell>Equip</Table.HeaderCell> */}
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data
              .slice(indexOfFirstRecord, indexOfLastRecord)
              .map((jugadora, index) => {
                const imatge = jugadora?.path_photo
                  ? jugadora.path_photo
                  : `${BASE_API}/uploads/User/avatar.png`;
                return (
                  <Table.Row key={index}>
                    {/* <Table.Cell>{jugadora.id}</Table.Cell> */}
                    <Table.Cell collapsing>
                      <Image
                        centered
                        rounded
                        bordered
                        src={imatge}
                        size="mini"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {jugadora.username ? jugadora.username : "-"}
                    </Table.Cell>
                    <Table.Cell>
                      {jugadora.first_name ? jugadora.first_name : "-"}
                    </Table.Cell>
                    <Table.Cell>
                      {jugadora.last_name ? jugadora.last_name : "-"}
                    </Table.Cell>
                    <Table.Cell>
                      {jugadora.email ? jugadora.email : "-"}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {jugadora.dorsal ? jugadora.dorsal : "-"}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {jugadora.fitxa ? jugadora.fitxa : "-"}
                    </Table.Cell>
                    {/* <Table.Cell>
                      {map(jugadora.equips_data, (equip, index) => (
                        <Label key={index}>{equip.nom ? jugadora.nom : "-"}</Label>
                      ))}
                    </Table.Cell> */}
                    <Actions
                      user={jugadora}
                      updatejugadora={onUpdate}
                      deletejugadora={onDelete}
                      checkPermis={checkPermis}
                    />
                  </Table.Row>
                );
              })}
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
                    {jugadores.length} registres
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
  const { user, updatejugadora, deletejugadora, checkPermis, enviarMail } =
    props;
  return (
    <>
      <Table.Cell textAlign="right">
        {checkPermis("EnviarMails") && (
          <Button icon color="blue" onClick={() => enviarMail(user)}>
            <Icon name="mail" />
          </Button>
        )}
        {checkPermis("EditarJugadors") && (
          <>
            <Button icon onClick={() => updatejugadora(user)}>
              <Icon name="pencil" />
            </Button>
            <Button icon negative onClick={() => deletejugadora(user)}>
              <Icon name="close" />
            </Button>
          </>
        )}
      </Table.Cell>
    </>
  );
};
