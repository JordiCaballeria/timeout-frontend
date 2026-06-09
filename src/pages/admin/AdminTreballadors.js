import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { HeaderPage } from "../../components/Admin/HeaderPage/HeaderPage";
import { Loader } from "semantic-ui-react";
import {
  CreateEditUserForm,
  TableTreballadors,
} from "../../components/Admin/Users";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AlertBasic } from "../../components/Common/AlertBasic";
import { useRol } from "../../hooks/useRol";
import { SendMailForm } from "../../components/Admin/Users/SendMailForm/SendMailForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export function AdminTreballadors() {
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState(null);
  const [missatgeAlert, setMissatgeAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [idUser, setIdUser] = useState();
  const { loading, users, getUsers, deleteUser, checkPermis } = useUser();
  const { getRols, rols } = useRol();
  const [rolFilter, setrolFilter] = useState([]);

  let options = rols
    ? rols.map((rol) => {
        return { id: rol.id, text: rol.nom, value: rol.nom };
      })
    : [];

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
    setTitleModal("Crear Treballador");
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
    setTitleModal("Editar Treballador");
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
  const enviarMail = (data) => {
    if (!checkPermis("EnviarMails")) {
      return;
    }
    let usersAuxIds = users
      .filter((user) => user.is_staff && checkrols(user))
      .map((user) => user.id);
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

  const onDeleteUser = (data) => {
    setTitleAlert(`Eliminar el treballador ${data.username}?`);
    setMissatgeAlert(
      "Estàs segura que vols eliminar el treballador de forma permanent? Aquesta acció és irreversible!"
    );
    setIdUser(data.id);
    openCloseAlert();
  };

  const handleSlcChange = (e, data) => {
    setrolFilter(data.value);
  };

  function checkrols(user) {
    let rolsUser = [];

    user.rols_data.forEach((rol) => {
      rolsUser.push(rol.nom);
    });

    return rolFilter.every((rol) => {
      return rolsUser.includes(rol);
    });
  }

  return (
    <>
      <HeaderPage
        title="Treballadors"
        btnTitle={checkPermis("EditarUsers") ? "Nou Treballador" : undefined}
        btnClick={checkPermis("EditarUsers") ? createUser : undefined}
        btnTitle2={checkPermis("EnviarMails") ? "Enviar correu" : undefined}
        btnClick2={checkPermis("EnviarMails") ? enviarMail : undefined}
        slcOptionsText="Rols"
        slcOptions={options}
        slcChange={handleSlcChange}
      />
      {loading ? (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      ) : (
        <TableTreballadors
          users={users.filter((user) => user.is_staff && checkrols(user))}
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
        size="large"
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
