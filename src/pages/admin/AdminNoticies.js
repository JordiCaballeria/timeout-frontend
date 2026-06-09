import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import { HeaderPage } from "../../components/Admin/HeaderPage";
import { NoticiesTable } from "../../components/Admin/Noticies/NoticiesTable";
import { useNoticies } from "../../hooks/useNoticies";
import { AddEditNoticiesForm } from "../../components/Admin/Noticies/AddEditNoticiesForm";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AlertBasic } from "../../components/Common/AlertBasic";
import { useEsdeveniments } from "../../hooks/useEsdeveniments";
import { useUser } from "../../hooks/useUser";
import { toast } from "react-toastify";
export function AdminNoticies() {
  const { getNoticies, noticies, loading, deleteNoticia } = useNoticies();
  const { getEsdeveniments, esdeveniments } = useEsdeveniments();
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState(null);
  const [missatgeAlert, setMissatgeAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [idNoticia, setIdNoticia] = useState();

  useEffect(() => {
    getEsdeveniments();
    getNoticies();
  }, [refresh]);

  const { checkPermis } = useUser();

  const navigate = useNavigate();
  if (!checkPermis("isStaff")) return navigate("/");
  if (!checkPermis("VeureNoticies")) return navigate("/admin");

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseAlert = () => setShowAlert((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);

  const createNoticia = () => {
    setTitleModal("Crear Noticia");
    setContentModal(
      <AddEditNoticiesForm
        onClose={openCloseModal}
        onRefesh={onRefesh}
        esdeveniments={esdeveniments}
      />
    );
    openCloseModal();
  };

  const updateNoticia = (data) => {
    setTitleModal("Editar Noticia");
    setContentModal(
      <AddEditNoticiesForm
        noticia={data}
        onClose={openCloseModal}
        onRefesh={onRefesh}
        esdeveniments={esdeveniments}
      />
    );
    openCloseModal();
  };

  const onDeleteNoticia = (data) => {
    setTitleAlert(`Eliminar la notícia ${data.titol}?`);
    setMissatgeAlert(
      "Estàs segura que vols eliminar la notícia de forma permanent? Aquesta acció és irreversible!"
    );
    setIdNoticia(data.id);
    openCloseAlert();
  };

  return (
    <>
      <HeaderPage
        title="Noticies"
        btnTitle={checkPermis("EditarNoticies") ? "Nova Noticia" : undefined}
        btnClick={checkPermis("EditarNoticies") ? createNoticia : undefined}
      />
      {loading ? (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      ) : (
        <NoticiesTable
          noticies={noticies}
          onDelete={onDeleteNoticia}
          onUpdate={updateNoticia}
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
            await deleteNoticia(idNoticia);
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
