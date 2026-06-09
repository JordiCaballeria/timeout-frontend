import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderPage } from "../../components/Admin/HeaderPage/HeaderPage";
import { Loader } from "semantic-ui-react";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AlertBasic } from "../../components/Common/AlertBasic";
import { useRol } from "../../hooks/useRol";
import { usePermisos } from "../../hooks/usePermisos";
import { RolTable } from "../../components/Admin/Rols/RolTable";
import { CreateEditRol } from "../../components/Admin/Rols/CreateEditRol.js/CreateEditRol";
import { useUser } from "../../hooks/useUser";
import { toast } from "react-toastify";

export function AdminRols() {
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState(null);
  const [missatgeAlert, setMissatgeAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { loading, rols, getRols, error, deleteRol } = useRol();
  const { getPermisos, permisos } = usePermisos();
  const [idRol, setIdRol] = useState();
  useEffect(() => {
    getRols();
    getPermisos();
  }, [refresh]);
  const { checkPermis } = useUser();

  const navigate = useNavigate();
  if (!checkPermis("isStaff")) return navigate("/");
  if (!checkPermis("VeureRols")) return navigate("/admin");

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseAlert = () => setShowAlert((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);

  const createRol = () => {
    setTitleModal("Crear Rol");
    setContentModal(
      <CreateEditRol
        onClose={openCloseModal}
        onRefesh={onRefesh}
        permisos={permisos}
      />
    );
    openCloseModal();
  };

  const updateRol = (data) => {
    setTitleModal("Editar Rol");
    setContentModal(
      <CreateEditRol
        rol={data}
        onClose={openCloseModal}
        onRefesh={onRefesh}
        permisos={permisos}
      />
    );
    openCloseModal();
  };

  const onDeleteRol = (data) => {
    setTitleAlert(`Eliminar el rol ${data.nom}?`);
    setMissatgeAlert(
      "Estàs segura que vols eliminar el rol de forma permanent? Aquesta acció és irreversible!"
    );
    setIdRol(data.id);
    openCloseAlert();
  };

  return (
    <>
      <HeaderPage
        title="Tots els rols"
        btnTitle={checkPermis("EditarRols") ? "Nou Rol" : undefined}
        btnClick={checkPermis("EditarRols") ? createRol : undefined}
      />
      {loading ? (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      ) : (
        <RolTable rols={rols} deleteRol={onDeleteRol} updateRol={updateRol} />
      )}
      <ModalBasic
        show={showModal}
        title={titlewModal}
        children={contentModal}
        onClose={openCloseModal}
      />
      <AlertBasic
        show={showAlert}
        title={titleAlert}
        missatge={missatgeAlert}
        disagreeFunction={async () => {
          try {
            await deleteRol(idRol);
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
