import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import { HeaderPage } from "../../components/Admin/HeaderPage";

import { usePatrocinadors } from "../../hooks/usePatrocinadors";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AlertBasic } from "../../components/Common/AlertBasic";
import { useUser } from "../../hooks/useUser";
import { PatrocinadorsTable } from "../../components/Admin/Patrocinadors/PatrocinadorsTable/PatrocinadorsTable";
import { CreateEditPatrocinador } from "../../components/Admin/Patrocinadors/CreateEditPatrocinador/CreateEditPatrocinador";
import { toast } from "react-toastify";
export function AdminPatrocinadors() {
  const { getPatrocinadors, patrocinadors, loading, deletePatrocinador } =
    usePatrocinadors();
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState(null);
  const [missatgeAlert, setMissatgeAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [idPatrocinador, setIdPatrocinador] = useState();

  useEffect(() => {
    getPatrocinadors();
  }, [refresh]);

  const { checkPermis } = useUser();

  const navigate = useNavigate();
  if (!checkPermis("isStaff")) return navigate("/");
  if (!checkPermis("VeurePatrocinadors")) return navigate("/admin");

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseAlert = () => setShowAlert((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);

  const createPatrocinador = () => {
    setTitleModal("Crear Patrocinador");
    setContentModal(
      <CreateEditPatrocinador onClose={openCloseModal} onRefesh={onRefesh} />
    );
    openCloseModal();
  };

  const updatePatrocinador = (data) => {
    setTitleModal("Editar Patrocinador");
    setContentModal(
      <CreateEditPatrocinador
        patrocinador={data}
        onClose={openCloseModal}
        onRefesh={onRefesh}
      />
    );
    openCloseModal();
  };

  const onDeletePatrocinador = (data) => {
    setTitleAlert(`Eliminar el patrocinador ${data.titol}?`);
    setMissatgeAlert(
      "Estàs segura que vols eliminar el patrocinador de forma permanent? Aquesta acció és irreversible!"
    );
    setIdPatrocinador(data.id);
    openCloseAlert();
  };

  return (
    <>
      <HeaderPage
        title="Patrocinadors"
        btnTitle={
          checkPermis("EditarPatrocinadors") ? "Nou Patrocinador" : undefined
        }
        btnClick={
          checkPermis("EditarPatrocinadors") ? createPatrocinador : undefined
        }
      />
      {loading ? (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      ) : (
        <PatrocinadorsTable
          patrocinadors={patrocinadors}
          onDelete={onDeletePatrocinador}
          onUpdate={updatePatrocinador}
        />
      )}
      <ModalBasic
        show={showModal}
        title={titlewModal}
        children={contentModal}
        onClose={openCloseModal}
        size="fullscreen"
      />
      <AlertBasic
        show={showAlert}
        title={titleAlert}
        missatge={missatgeAlert}
        disagreeFunction={async () => {
          try {
            await deletePatrocinador(idPatrocinador);
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
