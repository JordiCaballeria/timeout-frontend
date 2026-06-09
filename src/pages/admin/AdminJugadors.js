import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { HeaderPage } from "../../components/Admin/HeaderPage/HeaderPage";
import { Loader } from "semantic-ui-react";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AlertBasic } from "../../components/Common/AlertBasic";
import { TableJugadores } from "../../components/Admin";
import { SendMailForm } from "../../components/Admin/Users/SendMailForm/SendMailForm";
import { CreateEditUserForm } from "../../components/Admin";
import { useRol } from "../../hooks/useRol";
import { toast } from "react-toastify";

export function AdminJugadors() {
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState(null);
  const [missatgeAlert, setMissatgeAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [idUser, setIdUser] = useState();
  const { getRols, rols } = useRol();
  const { loading, jugadores, getJugadores, checkPermis, deleteUser } =
    useUser();

  useEffect(() => {
    getJugadores();
    getRols();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const navigate = useNavigate();
  if (!checkPermis("isStaff")) return navigate("/");
  if (!checkPermis("VeureJugadors")) return navigate("/admin");

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseAlert = () => setShowAlert((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);

  const onDeleteUser = (data) => {
    setTitleAlert(`Eliminar el jugador ${data.username}?`);
    setMissatgeAlert(
      "Estàs segura que vols eliminar el jugador de forma permanent? Aquesta acció és irreversible!"
    );
    setIdUser(data.id);
    openCloseAlert();
  };

  const createUser = () => {
    setTitleModal("Crear Usuari");
    setContentModal(
      <CreateEditUserForm
        onClose={openCloseModal}
        onRefesh={onRefesh}
        rols={rols}
      />
    );
    openCloseModal();
  };

  const updateUser = (data) => {
    setTitleModal("Editar Usuari");
    setContentModal(
      <CreateEditUserForm
        user={data}
        onClose={openCloseModal}
        onRefesh={onRefesh}
        rols={rols}
      />
    );
    openCloseModal();
  };

  const enviarMail = () => {
    if (!checkPermis("EnviarMails")) {
      return;
    }
    setTitleModal("Enviar correu");
    setContentModal(
      <SendMailForm
        users={jugadores}
        onClose={openCloseModal}
        onRefesh={onRefesh}
      />
    );
    openCloseModal();
  };
  const enviarMailIndividual = (data) => {
    if (!checkPermis("EnviarMails")) {
      return;
    }
    let usersAuxIds = [data.id];
    setTitleModal(`Enviar correu a ${data.username}`);
    setContentModal(
      <SendMailForm
        users={usersAuxIds}
        onClose={openCloseModal}
        onRefesh={onRefesh}
      />
    );
    openCloseModal();
  };

  return (
    <>
      <HeaderPage
        title="Totes les jugadores"
        btnTitle={checkPermis("EditarJugadors") ? "Nou Jugador" : undefined}
        btnClick={createUser}
        btnTitle2={checkPermis("EnviarMails") ? "Enviar correus" : undefined}
        btnClick2={enviarMail}
      />
      {loading ? (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      ) : (
        <TableJugadores
          jugadores={jugadores}
          onDelete={onDeleteUser}
          onUpdate={updateUser}
          enviarMail={enviarMailIndividual}
        />
      )}
      <ModalBasic
        show={showModal}
        title={titlewModal}
        children={contentModal}
        onClose={openCloseModal}
        size={"small"}
      />
      <AlertBasic
        show={showAlert}
        title={titleAlert}
        missatge={missatgeAlert}
        disagreeFunction={async () => {
          try {
            await deleteUser(idUser);
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
