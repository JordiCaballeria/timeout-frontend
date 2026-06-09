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
export function AdminEsports() {
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState(null);
  const [missatgeAlert, setMissatgeAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [idEsport, setIdEsport] = useState();

  const { loading, esport, getEsports, deleteEsport } = useEquips();
  const { checkPermis } = useUser();

  useEffect(() => {
    getEsports();
  }, [refresh]);

  const navigate = useNavigate();
  if (!checkPermis("isStaff")) return navigate("/");
  if (!checkPermis("VeureCompeticio")) return navigate("/admin");

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseAlert = () => setShowAlert((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);

  const onCreateEsport = () => {
    setTitleModal("Crear Esport");
    setContentModal(
      <CreateEditCompeticio
        onClose={openCloseModal}
        onRefesh={onRefesh}
        tipusCompeticio={"esport"}
      />
    );
    openCloseModal();
  };

  const onUpdateEsport = (data) => {
    setTitleModal("Editar Esport");
    setContentModal(
      <CreateEditCompeticio
        data={data}
        onClose={openCloseModal}
        onRefesh={onRefesh}
        tipusCompeticio={"esport"}
      />
    );
    openCloseModal();
  };

  const onDeleteEsport = (data) => {
    setTitleAlert(`Eliminar l'esport ${data.nom}?`);
    setMissatgeAlert(
      "Estàs segura que vols eliminar l'esport de forma permanent? Aquesta acció és irreversible!"
    );
    setIdEsport(data.id);
    openCloseAlert();
  };

  return (
    <>
      <HeaderPage
        title="Tots els Esports"
        btnTitle={checkPermis("EditarCompeticio") ? "Nou Esports" : undefined}
        btnClick={checkPermis("EditarCompeticio") ? onCreateEsport : undefined}
      />
      {loading ? (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      ) : (
        <TableCompeticio
          data={esport}
          onUpdate={onUpdateEsport}
          onDelete={onDeleteEsport}
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
            await deleteEsport(idEsport);
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
