/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderPage } from "../../components/Admin/HeaderPage/HeaderPage";
import { Loader } from "semantic-ui-react";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AlertBasic } from "../../components/Common/AlertBasic";
import { useUser } from "../../hooks/useUser";
import { TableEnviaments } from "../../components/Admin/Enviaments/TableEnviaments/TableEnviaments";
import { useEnviaments } from "../../hooks/useEnviaments";
import { TableDetallsPagament } from "../../components/Admin/Pagaments/TableDetallsPagament/TableDetallsPagament";
import { toast } from "react-toastify";
import { EditEnviament } from "../../components/Admin/Enviaments/EditEnviament.js";

export function AdminEnviaments() {
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState(null);
  const [missatgeAlert, setMissatgeAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [idEnviament, setIdEnviament] = useState();
  const { checkPermis } = useUser();
  const {
    estatEnviaments,
    enviaments,
    loading,
    getEnviaments,
    getEstatEnviaments,
    deleteEnviament,
  } = useEnviaments();

  useEffect(() => {
    getEnviaments();
    getEstatEnviaments();
  }, [refresh]);

  const navigate = useNavigate();
  if (!checkPermis("isStaff")) return navigate("/");
  if (!checkPermis("VeureEnviaments")) return navigate("/admin");

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseAlert = () => setShowAlert((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);

  const veureDetalls = (data) => {
    setTitleModal(`Detalls Pagament ${data.id}`);
    setContentModal(<TableDetallsPagament detalls={data.detalls_data} />);
    openCloseModal();
  };

  const onUpdateEnviament = (data) => {
    setTitleModal(`Editar enviament ${data.id}`);
    setContentModal(
      <EditEnviament
        onClose={openCloseModal}
        onRefesh={onRefesh}
        enviament={data}
      />
    );
    openCloseModal();
  };

  const onDeleteEnviament = (data) => {
    setTitleAlert(`Eliminar l'enviament ${data.id}?`);
    setMissatgeAlert(
      "Estàs segura que vols eliminar l'enviament de forma permanent? Aquesta acció és irreversible!"
    );
    setIdEnviament(data.id);
    openCloseAlert();
  };

  return (
    <>
      <HeaderPage title="Tots els Enviaments" />
      {loading ? (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      ) : (
        <TableEnviaments
          enviaments={enviaments}
          veureDetalls={veureDetalls}
          deleteEnviament={onDeleteEnviament}
          updateEnviament={onUpdateEnviament}
        />
      )}
      <ModalBasic
        show={showModal}
        title={titlewModal}
        children={contentModal}
        onClose={openCloseModal}
        size="mini"
      />
      <AlertBasic
        show={showAlert}
        title={titleAlert}
        missatge={missatgeAlert}
        disagreeFunction={async () => {
          try {
            await deleteEnviament(idEnviament);
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
