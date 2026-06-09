import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { HeaderPage } from "../../components/Admin/HeaderPage/HeaderPage";
import { Loader } from "semantic-ui-react";
import { TableUsers, CreateEditUserForm } from "../../components/Admin/Users/";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AlertBasic } from "../../components/Common/AlertBasic";
import { useRol } from "../../hooks/useRol";
import { SendMailForm } from "../../components/Admin/Users/SendMailForm/SendMailForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export function AdminUsers() {
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState(null);
  const [missatgeAlert, setMissatgeAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [idUser, setIdUser] = useState();
  const { loading, users, getUsers, deleteUser, rolsUsuari, checkPermis } =
    useUser();
  const { getRols, rols } = useRol();

  useEffect(() => {
    getUsers();
    getRols();
  }, [refresh]);
  const navigate = useNavigate();
  if (!checkPermis("isStaff")) return navigate("/");
  if (!checkPermis("VeureUsers")) return navigate("/admin");
  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseAlert = () => setShowAlert((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);

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
  const rolsUserData = () => {
    /*  setTitleModal("Editar Treballador");
     setContentModal(
       <CreateEditUserForm
         user={data}
         onClose={openCloseModal}
         onRefesh={onRefesh}
       />
     );
     openCloseModal(); */
  };
  const onDeleteUser = (data) => {
    setTitleAlert(`Eliminar l'usuari ${data.username}?`);
    setMissatgeAlert(
      "Estàs segura que vols eliminar l'usuari de forma permanent? Aquesta acció és irreversible!"
    );
    setIdUser(data.id);
    openCloseAlert();
  };

  const enviarMail = () => {
    if (!checkPermis("EnviarMails")) {
      return;
    }
    setTitleModal("Enviar correu");
    setContentModal(
      <SendMailForm
        users={users}
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
        title="Tots els usuaris"
        btnTitle={checkPermis("EditarUsers") ? "Nou Usuari" : undefined}
        btnClick={checkPermis("EditarUsers") ? createUser : undefined}
        btnTitle2={checkPermis("EnviarMails") ? "Enviar correu" : undefined}
        btnClick2={checkPermis("EnviarMails") ? enviarMail : undefined}
      />
      {loading ? (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      ) : (
        <TableUsers
          users={users}
          updateUser={updateUser}
          deleteUser={onDeleteUser}
          rolsUserData={rolsUserData}
          enviarMail={enviarMailIndividual}
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
