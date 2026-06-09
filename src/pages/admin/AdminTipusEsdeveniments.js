/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEsdeveniments } from "../../hooks/useEsdeveniments";
import { HeaderPage } from "../../components/Admin/HeaderPage/HeaderPage";
import { Loader } from "semantic-ui-react";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AlertBasic } from "../../components/Common/AlertBasic";
import { TableTipusEsdeveniments } from "../../components/Admin/Esdeveniments/TableTipusEsdeveniments/TableTipusEsdeveniments";
import { CreateEditTipusEsdeveniment } from "../../components/Admin/Esdeveniments/CreateEditTipusEsdeveniments/CreateEditTipusEsdeveniments";
import { useUser } from "../../hooks/useUser";
import { toast } from "react-toastify";

export function AdminTipusEsdeveniments() {
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState(null);
  const [missatgeAlert, setMissatgeAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [idTipusEsdeveniment, setIdTipusEsdeveniment] = useState();
  const { checkPermis } = useUser();
  const {
    loading,
    tipusEsdeveniments,
    getTipusEsdeveniments,
    deleteTipusEsdeveniment,
  } = useEsdeveniments();

  useEffect(() => {
    getTipusEsdeveniments();
  }, [refresh]);

  const navigate = useNavigate();
  if (!checkPermis("isStaff")) return navigate("/");
  if (!checkPermis("VeureEsdeveniments")) return navigate("/admin");

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseAlert = () => setShowAlert((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);

  const onCreateTipusEsdeveniment = () => {
    setTitleModal("Crear Tipus Esdeveniment");
    setContentModal(
      <CreateEditTipusEsdeveniment
        onRefesh={onRefesh}
        onClose={openCloseModal}
      />
    );
    openCloseModal();
  };

  const onUpdateTipusEsdeveniment = (data) => {
    setTitleModal("Editar Tipus Esdeveniment");
    setContentModal(
      <CreateEditTipusEsdeveniment
        onRefesh={onRefesh}
        onClose={openCloseModal}
        tipusEsdeveniment={data}
      />
    );
    openCloseModal();
  };

  const onDeleteTipusEsdeveniment = (data) => {
    setTitleAlert(`Eliminar el tipus d'esdeveniment ${data.nom}?`);
    setMissatgeAlert(
      "Estàs segura que vols eliminar el tipus d'esdeveniment de forma permanent? Aquesta acció és irreversible!"
    );
    setIdTipusEsdeveniment(data.id);
    openCloseAlert();
  };

  return (
    <>
      <HeaderPage
        title="Tots els Tipus d'Esdeveniments"
        btnTitle={
          checkPermis("EditarEsdeveniments")
            ? "Nou Tipus d'Esdeveniment"
            : undefined
        }
        btnClick={
          checkPermis("EditarEsdeveniments")
            ? onCreateTipusEsdeveniment
            : undefined
        }
      />
      {loading ? (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      ) : (
        <TableTipusEsdeveniments
          tipusEsdeveniments={tipusEsdeveniments}
          onUpdate={onUpdateTipusEsdeveniment}
          onDelete={onDeleteTipusEsdeveniment}
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
            await deleteTipusEsdeveniment(idTipusEsdeveniment);
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
