import React, { useState, useEffect } from "react";
import { useEquips } from "../../hooks/useEquips";
import { Loader } from "semantic-ui-react";
import { HeaderPage } from "../../components/Admin/HeaderPage/HeaderPage";
import { TableEquips } from "../../components/Admin/Equips/TableEquips/TableEquips";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AlertBasic } from "../../components/Common/AlertBasic";
import { TableJugadores } from "../../components/Admin";
import { CreateEditEquip } from "../../components/Admin/Equips/CreateEditEquip/CreateEditEquip";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { SendMailForm } from "../../components/Admin/Users/SendMailForm/SendMailForm";
import { toast } from "react-toastify";

export function AdminEquips() {
  const {
    getEntrenadores,
    getJugadores,
    jugadores,
    entrenadores,
    checkPermis,
  } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState(null);
  const [missatgeAlert, setMissatgeAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [idEquip, setIdEquip] = useState();
  const {
    getCategories,
    getDivisions,
    getEsports,
    getEquips,
    deleteEquip,
    equips,
    divisio,
    categoria,
    esport,
    loading,
    error,
  } = useEquips();

  useEffect(() => {
    getEquips();
    getCategories();
    getDivisions();
    getEsports();
    getJugadores();
    getEntrenadores();
  }, [refresh]);

  const navigate = useNavigate();
  if (!checkPermis("isStaff")) return navigate("/");
  if (!checkPermis("VeureEquips")) return navigate("/admin");

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseAlert = () => setShowAlert((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);

  const createEquip = () => {
    setTitleModal("Crear Equip");
    setContentModal(
      <CreateEditEquip
        onClose={openCloseModal}
        onRefesh={onRefesh}
        categories={categoria}
        divisions={divisio}
        esports={esport}
        users={jugadores}
        entrenadores={entrenadores}
      />
    );
    openCloseModal();
  };

  const updateEquip = (data) => {
    setTitleModal("Editar Equip");
    setContentModal(
      <CreateEditEquip
        onClose={openCloseModal}
        onRefesh={onRefesh}
        categories={categoria}
        divisions={divisio}
        esports={esport}
        equip={data}
        users={jugadores}
        entrenadores={entrenadores}
      />
    );
    openCloseModal();
  };
  const enviarMail = (data) => {
    if (!checkPermis("EnviarMails")) {
      return;
    }
    let usersAuxIds = data.users_data
      .map((roluser) => roluser.user);
    setTitleModal("Enviar correu");
    setContentModal(
      <SendMailForm
        users={usersAuxIds}
        onClose={openCloseModal}
        onRefesh={onRefesh}
      />
    );
    openCloseModal();
  };
  const showJugadors = (jugadores, nomEquip) => {
    let jugadoresAux = [];
    jugadores.map((jugadora) => {
      jugadoresAux.push(jugadora.user_data);
    });
    setTitleModal(`Jugadores del equip ${nomEquip} `);
    setContentModal(<TableJugadores jugadores={jugadoresAux} />);
    openCloseModal();
  };

  const onDeleteEquip = (data) => {
    setTitleAlert(`Eliminar l'equip ${data.nom}?`);
    setMissatgeAlert(
      "Estàs segura que vols eliminar l'equip de forma permanent? Aquesta acció és irreversible!"
    );
    setIdEquip(data.id);
    openCloseAlert();
  };

  return (
    <>
      <HeaderPage
        title="Equips"
        btnTitle={checkPermis("EditarEquips") ? "Nou Equip" : undefined}
        btnClick={checkPermis("EditarEquips") ? createEquip : undefined}
      />
      {loading ? (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      ) : (
        <TableEquips
          equips={equips}
          updateEquip={updateEquip}
          deleteEquip={onDeleteEquip}
          showJugadors={showJugadors}
          enviarMail={enviarMail}
        />
      )}
      <ModalBasic
        show={showModal}
        title={titlewModal}
        children={contentModal}
        onClose={openCloseModal}
        size={"large"}
      />
      <AlertBasic
        show={showAlert}
        title={titleAlert}
        missatge={missatgeAlert}
        disagreeFunction={async () => {
          try {
            await deleteEquip(idEquip);
            onRefesh();
            openCloseAlert();
          } catch (error) {
            toast.error(error);
          }
        }}
        agreeFunction={openCloseAlert}
        disagreeText="Eliminar"
        agreeText="Cancelar"
        onClose={openCloseAlert}
      />
    </>
  );
}
