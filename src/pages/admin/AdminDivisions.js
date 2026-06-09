/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderPage } from "../../components/Admin/HeaderPage/HeaderPage";
import { Loader } from "semantic-ui-react";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AlertBasic } from "../../components/Common/AlertBasic";
import { useEquips } from "../../hooks/useEquips";
import { TableCompeticio } from "../../components/Admin/Equips/TableCompeticio/TableCompeticio";
import { CreateEditCompeticio } from "../../components/Admin/Equips/CreateEditCompeticio/CreateEditCompeticio";
import { useUser } from "../../hooks/useUser";
import { toast } from "react-toastify";

export function AdminDivisions() {
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState(null);
  const [missatgeAlert, setMissatgeAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [idDivisio, setIdDivisio] = useState();

  const { loading, divisio, getDivisions, deleteDivisio } = useEquips();
  const { checkPermis } = useUser();
  useEffect(() => {
    getDivisions();
  }, [refresh]);

  const navigate = useNavigate();
  if (!checkPermis("isStaff")) return navigate("/");
  if (!checkPermis("VeureCompeticio")) return navigate("/admin");

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseAlert = () => setShowAlert((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);

  const onCreateDivisio = () => {
    setTitleModal("Crear divisió");
    setContentModal(
      <CreateEditCompeticio
        onClose={openCloseModal}
        onRefesh={onRefesh}
        tipusCompeticio={"divisio"}
      />
    );
    openCloseModal();
  };

  const onUpdateDivisio = (data) => {
    setTitleModal("Editar divisió");
    setContentModal(
      <CreateEditCompeticio
        data={data}
        onClose={openCloseModal}
        onRefesh={onRefesh}
        tipusCompeticio={"divisio"}
      />
    );
    openCloseModal();
  };

  const onDeleteDivisio = (data) => {
    setTitleAlert(`Eliminar el tipus d'esdeveniment ${data.nom}?`);
    setMissatgeAlert(
      "Estàs segura que vols eliminar la divisió de forma permanent? Aquesta acció és irreversible!"
    );
    setIdDivisio(data.id);
    openCloseAlert();
  };
  return (
    <>
      <HeaderPage
        title="Totes les divisions"
        btnTitle={checkPermis("EditarCompeticio") ? "Nova Divisio" : undefined}
        btnClick={checkPermis("EditarCompeticio") ? onCreateDivisio : undefined}
      />
      {loading ? (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      ) : (
        <TableCompeticio
          data={divisio}
          onUpdate={onUpdateDivisio}
          onDelete={onDeleteDivisio}
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
            await deleteDivisio(idDivisio);
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
