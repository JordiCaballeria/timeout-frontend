import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TableProductes.scss";

import {
  Table,
  Button,
  Icon,
  Loader,
  Image,
  Label,
  Grid,
  Input,
  Pagination,
} from "semantic-ui-react";
import { map } from "lodash";
import _ from "lodash";
import { useUser } from "../../../../hooks/useUser";
import { BASE_API } from "../../../../utils/constants";

export const TableProductes = (props) => {
  const { onUpdate, onDelete, productes, showTalles } = props;
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const nPages = productes ? Math.ceil(productes.length / recordsPerPage) : 1;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const { checkPermis } = useUser();

  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: productes,
    direction: null,
  });
  const { column, data, direction } = state;

  const sumarQuantitat = (producte) => {
    let suma = 0;
    producte.talles_producte.forEach((talla) => {
      suma = Number(suma) + Number(talla.quantitat);
    });
    return suma;
  };

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
      {productes ? (
        <Table
          className="table-productes-admin"
          color="orange"
          compact
          striped
          sortable
          style={{ height: "80vh" }}
        >
          <Table.Header>
            <Table.Row>
              {/* <Table.HeaderCell>#</Table.HeaderCell> */}
              <Table.HeaderCell>Imatge</Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "nom" ? direction : null}
                onClick={() =>
                  dispatch({ type: "CHANGE_SORT", column: "username" })
                }
              >
                Nom
              </Table.HeaderCell>
              {/* <Table.HeaderCell
                sorted={column === "descripcio" ? direction : null}
                onClick={() => dispatch({ type: "CHANGE_SORT", column: "nom" })}
              >
                Descripció
              </Table.HeaderCell> */}
              <Table.HeaderCell
                sorted={column === "cognoms" ? direction : null}
                onClick={() =>
                  dispatch({ type: "CHANGE_SORT", column: "cognoms" })
                }
              >
                Preu
              </Table.HeaderCell>
              <Table.HeaderCell>Preu Soci</Table.HeaderCell>
              <Table.HeaderCell>Tipus Producte</Table.HeaderCell>
              <Table.HeaderCell>Quantitat</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {productes
              .slice(indexOfFirstRecord, indexOfLastRecord)
              .map((producte, index) => {
                const imatge =
                  producte?.imatges_producte?.length > 0
                    ? BASE_API + producte?.imatges_producte[0].path_imatge
                    : `${BASE_API}/uploads/User/avatar.png`;
                return (
                  <Table.Row key={index}>
                    {/* <Table.Cell>{producte.id}</Table.Cell> */}
                    <Table.Cell collapsing>
                      <Image
                        centered
                        rounded
                        bordered
                        src={imatge}
                        width="100%"
                      />
                    </Table.Cell>
                    <Table.Cell>{producte.nom}</Table.Cell>
                    {/* <Table.Cell>{producte.descripcio}</Table.Cell> */}
                    <Table.Cell>{producte.preu} €</Table.Cell>
                    <Table.Cell>{producte.preu_soci} €</Table.Cell>
                    <Table.Cell>{producte.tipus_data.nom}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {String(sumarQuantitat(producte)) + " "}
                      <Icon name="eye" onClick={() => showTalles(producte)} />
                    </Table.Cell>
                    <Actions
                      producte={producte}
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
                    {productes.length} registres
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
  const { producte, updatejugadora, deletejugadora, checkPermis } = props;
  const navigate = useNavigate();

  return (
    <>
      <Table.Cell textAlign="right">
        <Button
          icon
          color="teal"
          onClick={() => navigate(`/botiga/${producte.id}`)}
        >
          <Icon name="external" />
        </Button>
        {checkPermis("EditarBotiga") && (
          <>
            <Button icon onClick={() => updatejugadora(producte)}>
              <Icon name="pencil" />
            </Button>
            <Button icon negative onClick={() => deletejugadora(producte)}>
              <Icon name="close" />
            </Button>
          </>
        )}
      </Table.Cell>
    </>
  );
};
