/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderPage } from "../../components/Admin/HeaderPage/HeaderPage";
import { Loader } from "semantic-ui-react";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AlertBasic } from "../../components/Common/AlertBasic";
import { TableCompeticio } from "../../components/Admin/Equips/TableCompeticio/TableCompeticio";
import { useUser } from "../../hooks/useUser";
import { useTalles } from "../../hooks/useTalles";
import { CreateEditTalla } from "../../components/Admin/Botiga";
import { toast } from "react-toastify";
export function AdminTalles() {
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState(null);
  const [missatgeAlert, setMissatgeAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [idTalla, setIdTalla] = useState();

  const { loading, talles, getTalles, deleteTalla } = useTalles();
  const { checkPermis } = useUser();
  useEffect(() => {
    getTalles();
  }, [refresh]);

  const navigate = useNavigate();
  if (!checkPermis("isStaff")) return navigate("/");
  if (!checkPermis("VeureCompeticio")) return navigate("/admin");

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseAlert = () => setShowAlert((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);

  const onCreateTalla = () => {
    setTitleModal("Crear talla");
    setContentModal(
      <CreateEditTalla onClose={openCloseModal} onRefesh={onRefesh} />
    );
    openCloseModal();
  };

  const onUpdateTalla = (data) => {
    setTitleModal("Editar talla");
    setContentModal(
      <CreateEditTalla
        onClose={openCloseModal}
        onRefesh={onRefesh}
        talla={data}
      />
    );
    openCloseModal();
  };

  const onDeleteTalla = (data) => {
    setTitleAlert(`Eliminar la talla ${data.nom}?`);
    setMissatgeAlert(
      "Estàs segura que vols eliminar la talla de forma permanent? Aquesta acció és irreversible!"
    );
    setIdTalla(data.id);
    openCloseAlert();
  };
  return (
    <>
      <HeaderPage
        title="Totes les talles"
        btnTitle={checkPermis("EditarBotiga") ? "Nova Talla" : undefined}
        btnClick={checkPermis("EditarBotiga") ? onCreateTalla : undefined}
      />
      {loading ? (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      ) : (
        <TableCompeticio
          data={talles}
          onUpdate={onUpdateTalla}
          onDelete={onDeleteTalla}
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
            await deleteTalla(idTalla);
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
