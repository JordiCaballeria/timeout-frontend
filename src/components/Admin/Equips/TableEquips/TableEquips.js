import React, { useState } from "react";

import {
  Table,
  Button,
  Icon,
  Label,
  Grid,
  Input,
  Pagination,
} from "semantic-ui-react";
import { map } from "lodash";
import { useUser } from "../../../../hooks/useUser";
import { BASE_API } from "../../../../utils/constants";

export const TableEquips = (props) => {
  const { equips, updateEquip, deleteEquip, showJugadors, enviarMail } = props;
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const nPages = Math.ceil(equips ? equips.length / recordsPerPage : 1);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const { checkPermis } = useUser();

  /*  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: equips,
    direction: null,
  })
  const { column, data, direction } = state

  function exampleReducer(state, action) {
    switch (action.type) {
      case 'CHANGE_SORT':
        if (state.column === action.column) {
          return {
            ...state,
            data: state.data.slice().reverse(),
            direction:
              state.direction === 'ascending' ? 'descending' : 'ascending',
          }
        }

        return {
          column: action.column,
          data: _.sortBy(state.data, [action.column]),
          direction: 'ascending',
        }
      default:
        throw new Error()
    }
  } */

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
  return equips ? (
    <Table
      className="table-equips-admin"
      color="orange"
      compact
      striped
      sortable
      style={{ height: "80vh" }}
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
          /* sorted={column === 'equip' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'equip' })} */
          >
            Equip
          </Table.HeaderCell>
          <Table.HeaderCell
          /* sorted={column === 'categoria' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'categoria' })} */
          >
            Categoria
          </Table.HeaderCell>
          <Table.HeaderCell
          /* sorted={column === 'divisio' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'divisio' })} */
          >
            Divisió
          </Table.HeaderCell>
          <Table.HeaderCell
          /* sorted={column === 'esport' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'esport' })} */
          >
            Esport
          </Table.HeaderCell>
          <Table.HeaderCell>Entrenadors</Table.HeaderCell>
          <Table.HeaderCell>Jugadors</Table.HeaderCell>
          <Table.HeaderCell>Pròxim Esdeveniment</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {equips
          .slice(indexOfFirstRecord, indexOfLastRecord)
          .map((equip, index) => (
            <Table.Row key={index}>
              <Table.Cell>{equip.nom ? equip.nom : "-"}</Table.Cell>
              <Table.Cell>
                {equip.categoria_data ? equip.categoria_data.nom : "-"}
              </Table.Cell>
              <Table.Cell>
                {equip.divisio_data ? equip.divisio_data.nom : "-"}
              </Table.Cell>
              <Table.Cell>
                {equip.esport_data ? equip.esport_data.nom : "-"}
              </Table.Cell>
              <Table.Cell>
                {equip.users_data.filter((user) => user.rol === 6).length > 0
                  ? map(
                    equip.users_data.filter((user) => user.rol === 6),
                    (user, index) => (
                      <Label key={index} image>
                        <img
                          src={
                            user.path_photo
                              ? user.path_photo
                              : `${BASE_API}/uploads/User/avatar.png`
                          }
                          alt="LOGO"
                        />
                        {user.user_data.first_name} {user.user_data.last_name}
                      </Label>
                    )
                  )
                  : "-"}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {equip.users_data.filter((user) => user.rol === 7).length + " "} 
                <Icon
                link
                  name="eye"
                  onClick={() =>
                    showJugadors(
                      equip.users_data.filter((user) => user.rol === 7),
                      equip.nom
                    )
                  }
                />
              </Table.Cell>
              <Table.Cell textAlign="center">
                {equip?.esdeveniments[0]
                  ? (dateLocal(equip.esdeveniments[0].data) + ", " + timeLocal(equip.esdeveniments[0].data))
                  : "-"}
              </Table.Cell>
              {checkPermis("EditarEquips") && (
                <Actions
                  equip={equip}
                  updateEquip={updateEquip}
                  deleteEquip={deleteEquip}
                  enviarMail={enviarMail}
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
                Ensenyant {currentPage} de {nPages} pàgines de {equips.length}{" "}
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
    []
  );
};

const Actions = (props) => {
  const { equip, updateEquip, deleteEquip, enviarMail } = props;
  return (
    <>
      <Table.Cell textAlign="right">
        <Button icon color="blue" onClick={() => enviarMail(equip)}>
          <Icon name="mail" />
        </Button>
        <Button icon onClick={() => updateEquip(equip)}>
          <Icon name="pencil" />
        </Button>
        <Button icon negative onClick={() => deleteEquip(equip)}>
          <Icon name="close" />
        </Button>
      </Table.Cell>
    </>
  );
};
