/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderPage } from "../../components/Admin/HeaderPage/HeaderPage";
import { Loader } from "semantic-ui-react";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AlertBasic } from "../../components/Common/AlertBasic";
import { TableCompeticio } from "../../components/Admin/Equips/TableCompeticio/TableCompeticio";
import { CreateEditCompeticio } from "../../components/Admin/Equips/CreateEditCompeticio/CreateEditCompeticio";
import { useUser } from "../../hooks/useUser";
import { CreateEditTipusProducte } from "../../components/Admin/Botiga";
import { useProductes } from "../../hooks/useProductes";
import { toast } from "react-toastify";
export function AdminTipusProducte() {
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState(null);
  const [missatgeAlert, setMissatgeAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [idTipusProducte, setIdTipusProducte] = useState();

  const {
    loading,
    talles,
    getTipusProductes,
    deleteTipusProducte,
    tipusProducte,
  } = useProductes();
  const { checkPermis } = useUser();
  useEffect(() => {
    getTipusProductes();
  }, [refresh]);

  const navigate = useNavigate();
  if (!checkPermis("isStaff")) return navigate("/");
  if (!checkPermis("VeureCompeticio")) return navigate("/admin");

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseAlert = () => setShowAlert((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);

  const onCreateTipusProducte = () => {
    setTitleModal("Crear tipus de producte");
    setContentModal(
      <CreateEditTipusProducte onClose={openCloseModal} onRefesh={onRefesh} />
    );
    openCloseModal();
  };

  const onUpdateTipusProducte = (data) => {
    setTitleModal("Editar tipus de producte");
    setContentModal(
      <CreateEditTipusProducte
        onClose={openCloseModal}
        onRefesh={onRefesh}
        tipusProducte={data}
      />
    );
    openCloseModal();
  };

  const onDeleteTipusProducte = (data) => {
    setTitleAlert(`Eliminar el tipus de producte ${data.nom}?`);
    setMissatgeAlert(
      "Estàs segura que vols eliminar el tipus de producte de forma permanent? Aquesta acció és irreversible!"
    );
    setIdTipusProducte(data.id);
    openCloseAlert();
  };
  return (
    <>
      <HeaderPage
        title="Tots els tipus de productes"
        btnTitle={
          checkPermis("EditarBotiga") ? "Nou tipus de producte" : undefined
        }
        btnClick={
          checkPermis("EditarBotiga") ? onCreateTipusProducte : undefined
        }
      />
      {loading ? (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      ) : (
        <TableCompeticio
          data={tipusProducte}
          onUpdate={onUpdateTipusProducte}
          onDelete={onDeleteTipusProducte}
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
            await deleteTipusProducte(idTipusProducte);
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
