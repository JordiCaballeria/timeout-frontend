/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEsdeveniments } from "../../hooks/useEsdeveniments";
import { HeaderPage } from "../../components/Admin/HeaderPage/HeaderPage";
import { Loader } from "semantic-ui-react";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AlertBasic } from "../../components/Common/AlertBasic";
import { useUser } from "../../hooks/useUser";
import { TableEntrades } from "../../components/Admin/Entrades/TableEntrades/TableEntrades";
import { NovaEntradaForm, VeureEntrada } from "../../components/Admin/Entrades";
import { usePagaments } from "../../hooks/usePagaments";
import { toast } from "react-toastify";
export function AdminEntrades() {
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState(null);
  const [missatgeAlert, setMissatgeAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [idEsdeveniment, setIdEsdeveniment] = useState();
  const [filterEsdeveniment, setFilterEsdeveniment] = useState([]);
  const { loading, esdeveniments, entrades, getEsdeveniments, getEntrades } =
    useEsdeveniments();
  const { checkPermis, getUsers, users } = useUser();
  const { getTipusPagaments, tipusPagament } = usePagaments();

  useEffect(() => {
    getEsdeveniments();
    getEntrades();
    getUsers();
    getTipusPagaments();
  }, [refresh]);

  const navigate = useNavigate();
  if (!checkPermis("isStaff")) return navigate("/");
  if (!checkPermis("VeureEntrades")) return navigate("/admin");

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseAlert = () => setShowAlert((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);

  let optionsEsdeveniments = esdeveniments
    ? esdeveniments.map((esdeveniment) => {
        return {
          id: esdeveniment.id,
          text: esdeveniment.nom,
          value: esdeveniment.nom,
        };
      })
    : [];

  const handleSlcChangeEsdeveniment = (e, data) => {
    setFilterEsdeveniment(data.value);
  };

  const novaEntrada = () => {
    setTitleModal("Nova Entrada");
    setContentModal(
      <NovaEntradaForm
        esdeveniments={esdeveniments}
        tipusPagament={tipusPagament}
        users={users}
        onClose={openCloseModal}
        onRefresh={onRefesh}
      />
    );
    openCloseModal();
  };

  const veureEntrada = (data) => {
    setTitleModal("Entrada ", data.id);
    setContentModal(<VeureEntrada entrada={data} />);
    openCloseModal();
  };

  function checkTipusEsdeveniment(esdeveniment) {
    if (esdeveniment === null) {
      return false;
    }

    return filterEsdeveniment.every((tipus) => {
      return esdeveniment.nom.includes(tipus);
    });
  }
  return (
    <>
      <HeaderPage
        title="Totes les Entrades"
        btnTitle={checkPermis("EditarEntrades") ? "Vendre Entrada" : undefined}
        btnClick={checkPermis("EditarEntrades") ? novaEntrada : undefined}
        slcOptionsText="Esdeveniments"
        slcOptions={optionsEsdeveniments}
        slcChange={handleSlcChangeEsdeveniment}
      />
      {loading ? (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      ) : (
        <TableEntrades entrades={entrades} veureEntrada={veureEntrada} />
      )}
      <ModalBasic
        show={showModal}
        title={titlewModal}
        children={contentModal}
        onClose={openCloseModal}
        size="small"
      />
      <AlertBasic
        show={showAlert}
        title={titleAlert}
        missatge={missatgeAlert}
        disagreeFunction={async () => {
          try {
            //await deleteEsdeveniment(idEsdeveniment);
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
