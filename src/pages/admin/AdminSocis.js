import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { HeaderPage } from "../../components/Admin/HeaderPage/HeaderPage";
import { Loader } from "semantic-ui-react";
import { CreateEditUserForm } from "../../components/Admin/Users";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AlertBasic } from "../../components/Common/AlertBasic";
import { TableSocis } from "../../components/Admin/Users/TableSocis/TableSocis";
import { useRol } from "../../hooks/useRol";
import { SendMailForm } from "../../components/Admin/Users/SendMailForm/SendMailForm";
import { useNavigate } from "react-router-dom";
import { NouSociForm } from "../../components/Admin/Users/NouSociForm";
import { usePagaments } from "../../hooks/usePagaments";
import { toast } from "react-toastify";

export function AdminSocis() {
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState(null);
  const [missatgeAlert, setMissatgeAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [idUser, setIdUser] = useState();
  const { getRols, rols } = useRol();
  const { getTipusPagaments, tipusPagament } = usePagaments();

  const { loading, users, getUsers, deleteUser, error, checkPermis } =
    useUser();

  useEffect(() => {
    getUsers();
    getRols();
    getTipusPagaments();
  }, [refresh]);
  const navigate = useNavigate();
  if (!checkPermis("isStaff")) return navigate("/");
  if (!checkPermis("VeureUsers")) return navigate("/admin");
  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseAlert = () => setShowAlert((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);

  const createUser = () => {
    setTitleModal("Crear Soci");
    setContentModal(
      <NouSociForm
        users={users}
        tipusPagament={tipusPagament}
        onClose={openCloseModal}
        onRefresh={onRefesh}
      />
    );
    openCloseModal();
  };

  const updateUser = (data) => {
    setTitleModal("Editar Soci");
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
    setTitleAlert(`Eliminar el soci ${data.username}?`);
    setMissatgeAlert(
      "Estàs segura que vols eliminar el soci de forma permanent? Aquesta acció és irreversible!"
    );
    setIdUser(data.id);
    openCloseAlert();
  };
  const enviarMail = (data) => {
    if (!checkPermis("EnviarMails")) {
      return;
    }
    let usersAuxIds = users.filter((user) => user.is_soci);
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
        title="Socis"
        btnTitle={checkPermis("EditarUsers") ? "Nou Soci" : undefined}
        btnClick={checkPermis("EditarUsers") ? createUser : undefined}
        btnTitle2={checkPermis("EnviarMails") ? "Enviar correu" : undefined}
        btnClick2={checkPermis("EnviarMails") ? enviarMail : undefined}
      />
      {loading ? (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      ) : (
        <TableSocis
          users={users.filter((user) => user.is_soci)}
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
