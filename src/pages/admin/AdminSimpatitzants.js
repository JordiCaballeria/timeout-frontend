import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { HeaderPage } from "../../components/Admin/HeaderPage/HeaderPage";
import { Loader } from "semantic-ui-react";
import { CreateEditUserForm, TableUsers } from "../../components/Admin/Users";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AlertBasic } from "../../components/Common/AlertBasic";
import { useNavigate } from "react-router-dom";
import { useRol } from "../../hooks/useRol";
import { SendMailForm } from "../../components/Admin/Users/SendMailForm/SendMailForm";
import { toast } from "react-toastify";

export function AdminSimpatitzants() {
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState(null);
  const [missatgeAlert, setMissatgeAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [idUser, setIdUser] = useState();
  const { getRols, rols } = useRol();

  const { loading, users, getUsers, deleteUser, checkPermis } = useUser();

  useEffect(() => {
    getUsers();
    getRols();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const navigate = useNavigate();
  if (!checkPermis("isStaff")) return navigate("/");
  if (!checkPermis("VeureUsers")) return navigate("/admin");
  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseAlert = () => setShowAlert((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);

  const createUser = () => {
    setTitleModal("Crear Simpatitzant");
    setContentModal(
      <CreateEditUserForm onClose={openCloseModal} onRefesh={onRefesh} />
    );
    openCloseModal();
  };

  const updateUser = (data) => {
    setTitleModal("Editar Simpatitzant");
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
  const onDeleteUser = (data) => {
    setTitleAlert(`Eliminar el simpatitzant ${data.username}?`);
    setMissatgeAlert(
      "Estàs segura que vols eliminar el simpatitzant de forma permanent? Aquesta acció és irreversible!"
    );
    setIdUser(data.id);
    openCloseAlert();
  };
  const enviarMail = (data) => {
    if (!checkPermis("EnviarMails")) {
      return;
    }
    let usersAuxIds = users.filter((user) => !user.is_soci && !user.is_staff);
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
        title="Simpatitzants"
        btnTitle={checkPermis("EditarUsers") ? "Nou Simpatitzant" : undefined}
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
          users={users.filter((user) => !user.is_soci && !user.is_staff)}
          updateUser={updateUser}
          deleteUser={onDeleteUser}
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
