import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import { HeaderPage } from "../../components/Admin/HeaderPage";

import { usePagaments } from "../../hooks/usePagaments";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AlertBasic } from "../../components/Common/AlertBasic";
import { useUser } from "../../hooks/useUser";
import { TablePagaments } from "../../components/Admin/Pagaments/TablePagaments/TablePagaments";
import { TableDetallsPagament } from "../../components/Admin/Pagaments/TableDetallsPagament/TableDetallsPagament";
import { toast } from "react-toastify";
export function AdminPagaments() {
  const { getPagaments, pagaments, loading, deletePagament } = usePagaments();
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState(null);
  const [missatgeAlert, setMissatgeAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [idPagament, setIdPagament] = useState();

  useEffect(() => {
    getPagaments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const { checkPermis } = useUser();

  const navigate = useNavigate();
  if (!checkPermis("isStaff")) return navigate("/");
  if (!checkPermis("VeurePagaments")) return navigate("/admin");

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseAlert = () => setShowAlert((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);

  const veureDetalls = (data) => {
    setTitleModal(`Detalls Pagament ${data.id}`);
    setContentModal(<TableDetallsPagament detalls={data.detalls_data} />);
    openCloseModal();
  };

  const onDeletePagament = (data) => {
    setTitleAlert(`Eliminar el pagament ${data.id}?`);
    setMissatgeAlert(
      "Estàs segura que vols eliminar el pagament de forma permanent? Aquesta acció és irreversible!"
    );
    setIdPagament(data.id);
    openCloseAlert();
  };

  return (
    <>
      <HeaderPage title="Pagaments" />
      {loading ? (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      ) : (
        <TablePagaments
          pagaments={pagaments}
          deletePagament={onDeletePagament}
          veureDetalls={veureDetalls}
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
            await deletePagament(idPagament);
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
