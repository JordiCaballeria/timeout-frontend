/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderPage } from "../../components/Admin/HeaderPage/HeaderPage";
import { Loader } from "semantic-ui-react";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AlertBasic } from "../../components/Common/AlertBasic";
import { useUser } from "../../hooks/useUser";
import { useProductes } from "../../hooks/useProductes";
import {
  CreateEditProducte,
  RealitzarVenta,
  TableProductes,
  ViewTallesProducte,
} from "../../components/Admin/Botiga";
import { useTalles } from "../../hooks/useTalles";
import { usePagaments } from "../../hooks/usePagaments";
import { toast } from "react-toastify";

export function AdminProductes() {
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [sizeModal, setSizeModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState(null);
  const [missatgeAlert, setMissatgeAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [idProducte, setIdProducte] = useState();
  const { tipusPagament, getTipusPagaments } = usePagaments();

  const {
    loading,
    productes,
    tipusProducte,
    getProductes,
    deleteProducte,
    getTipusProductes,
  } = useProductes();
  const { checkPermis } = useUser();
  const { talles, getTalles } = useTalles();

  useEffect(() => {
    getProductes();
    getTalles();
    getTipusProductes();
    getTipusPagaments();
  }, [refresh]);

  const navigate = useNavigate();
  if (!checkPermis("isStaff")) return navigate("/");
  if (!checkPermis("VeureCompeticio")) return navigate("/admin");

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseAlert = () => setShowAlert((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);
  const onCreateProducte = () => {
    setTitleModal("Crear producte");
    setContentModal(
      <CreateEditProducte
        talles={talles}
        tipusProducte={tipusProducte}
        onClose={openCloseModal}
        onRefesh={onRefesh}
      />
    );
    setSizeModal("fullscreen");
    openCloseModal();
  };

  const onUpdateProducte = (data) => {
    setTitleModal("Editar producte");
    setContentModal(
      <CreateEditProducte
        talles={talles}
        tipusProducte={tipusProducte}
        onClose={openCloseModal}
        onRefesh={onRefesh}
        producte={data}
      />
    );
    setSizeModal("fullscreen");
    openCloseModal();
  };

  const onDeleteProducte = (data) => {
    setTitleAlert(`Eliminar el producte ${data.nom}?`);
    setMissatgeAlert(
      "Estàs segura que vols eliminar el producte de forma permanent? Aquesta acció és irreversible!"
    );
    setIdProducte(data.id);
    openCloseAlert();
  };

  const onNovaVenta = () => {
    setTitleModal("Nova Venta");
    setContentModal(
      <RealitzarVenta
        onClose={openCloseModal}
        onRefesh={onRefesh}
        productes={productes}
        tipusPagament={tipusPagament}
      />
    );
    setSizeModal("fullscreen");
    openCloseModal();
  };
  const showTalles = (producte) => {
    setTitleModal(`Talles del producte ${producte.nom} `);
    setContentModal(<ViewTallesProducte producte={producte} />);
    setSizeModal("small");
    openCloseModal();
  };
  return (
    <>
      <HeaderPage
        title="Tots els productes"
        btnTitle={checkPermis("EditarBotiga") ? "Nou Producte" : undefined}
        btnClick={checkPermis("EditarBotiga") ? onCreateProducte : undefined}
        btnTitle2={checkPermis("EditarBotiga") ? "Nova Venta" : undefined}
        btnClick2={checkPermis("EditarBotiga") ? onNovaVenta : undefined}
      />
      {loading ? (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      ) : (
        <TableProductes
          productes={productes}
          talles={talles}
          onUpdate={onUpdateProducte}
          onDelete={onDeleteProducte}
          showTalles={showTalles}
        />
      )}
      <ModalBasic
        show={showModal}
        title={titlewModal}
        children={contentModal}
        onClose={openCloseModal}
        size={sizeModal}
      />
      <AlertBasic
        show={showAlert}
        title={titleAlert}
        missatge={missatgeAlert}
        disagreeFunction={async () => {
          try {
            await deleteProducte(idProducte);
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
