/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderPage } from "../../components/Admin/HeaderPage/HeaderPage";
import { Loader } from "semantic-ui-react";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AlertBasic } from "../../components/Common/AlertBasic";
import { useEquips } from "../../hooks/useEquips";
import { CreateEditCompeticio } from "../../components/Admin/Equips/CreateEditCompeticio/CreateEditCompeticio";
import { TableCompeticio } from "../../components/Admin/Equips/TableCompeticio/TableCompeticio";
import { useUser } from "../../hooks/useUser";
import { toast } from "react-toastify";

export function AdminCategories() {
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState(null);
  const [missatgeAlert, setMissatgeAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [idCategoria, setIdCategoria] = useState();
  const { checkPermis } = useUser();

  const { loading, categoria, getCategories, deleteCategoria } = useEquips();

  useEffect(() => {
    getCategories();
  }, [refresh]);

  const navigate = useNavigate();
  if (!checkPermis("isStaff")) return navigate("/");
  if (!checkPermis("VeureCompeticio")) return navigate("/admin");

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseAlert = () => setShowAlert((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);

  const onCreateCategoria = () => {
    setTitleModal("Crear Categoria");
    setContentModal(
      <CreateEditCompeticio
        onClose={openCloseModal}
        onRefesh={onRefesh}
        tipusCompeticio={"categoria"}
      />
    );
    openCloseModal();
  };

  const onUpdateCategoria = (data) => {
    setTitleModal("Editar Categoria");
    setContentModal(
      <CreateEditCompeticio
        data={data}
        onClose={openCloseModal}
        onRefesh={onRefesh}
        tipusCompeticio={"categoria"}
      />
    );
    openCloseModal();
  };

  const onDeleteCategoria = (data) => {
    setTitleAlert(`Eliminar la categoria ${data.nom}?`);
    setMissatgeAlert(
      "Estàs a punt d'eliminar la categoria de forma permanent, estàs segura? Aquesta acció és irreversible!"
    );
    setIdCategoria(data.id);
    openCloseAlert();
  };

  return (
    <>
      <HeaderPage
        title="Totes les Categories"
        btnTitle={
          checkPermis("EditarCompeticio") ? "Nova Categoria" : undefined
        }
        btnClick={
          checkPermis("EditarCompeticio") ? onCreateCategoria : undefined
        }
      />
      {loading ? (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      ) : (
        <TableCompeticio
          data={categoria}
          onUpdate={onUpdateCategoria}
          onDelete={onDeleteCategoria}
        />
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
            await deleteCategoria(idCategoria);
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
