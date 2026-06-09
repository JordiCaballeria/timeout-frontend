/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEsdeveniments } from "../../hooks/useEsdeveniments";
import { HeaderPage } from "../../components/Admin/HeaderPage/HeaderPage";
import { Loader } from "semantic-ui-react";
import { TableEsdeveniments } from "../../components/Admin/Esdeveniments/TableEsdeveniments/TableEsdeveniments.js";
import { CreateEditEsdevenimentForm } from "../../components/Admin/Esdeveniments/CreateEditEsdevenimentForm/CreateEditEsdevenimentForm";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { AlertBasic } from "../../components/Common/AlertBasic";
import { useEquips } from "../../hooks/useEquips";
import { useUser } from "../../hooks/useUser";
import { toast } from "react-toastify";

export function AdminEsdeveniments() {
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState(null);
  const [missatgeAlert, setMissatgeAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [idEsdeveniment, setIdEsdeveniment] = useState();
  const [filterTipus, setFilterTipus] = useState([]);
  const [filterEquips, setFilterEquips] = useState([]);
  const {
    loading,
    esdeveniments,
    tipusEsdeveniments,
    getTipusEsdeveniments,
    getEsdeveniments,
    deleteEsdeveniment,
    /* error, */
  } = useEsdeveniments();

  const { equips, getEquips } = useEquips();
  const { checkPermis } = useUser();

  useEffect(() => {
    getEsdeveniments();
    getTipusEsdeveniments();
  }, [refresh]);

  useEffect(() => {
    getEquips();
  }, [refresh]);

  const navigate = useNavigate();
  if (!checkPermis("isStaff")) return navigate("/");
  if (!checkPermis("VeureEsdeveniments")) return navigate("/admin");

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseAlert = () => setShowAlert((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);

  let optionsTipus = tipusEsdeveniments
    ? tipusEsdeveniments.map((tipus) => {
        return { id: tipus.id, text: tipus.nom, value: tipus.nom };
      })
    : [];
  let optionsEquips = equips
    ? equips.map((equip) => {
        return { id: equip.id, text: equip.nom, value: equip.nom };
      })
    : [];

  const handleSlcChangeTipus = (e, data) => {
    setFilterTipus(data.value);
  };

  const handleSlcChangeEquips = (e, data) => {
    setFilterEquips(data.value);
  };

  const createEsdeveniment = () => {
    setTitleModal("Crear Esdeveniment");
    setContentModal(
      <CreateEditEsdevenimentForm
        onClose={openCloseModal}
        onRefesh={onRefesh}
        tipusEsdeveniments={tipusEsdeveniments}
        equips={equips}
      />
    );
    openCloseModal();
  };

  const updateEsdeveniment = (data) => {
    setTitleModal("Editar Esdeveniment");
    setContentModal(
      <CreateEditEsdevenimentForm
        esdeveniment={data}
        onClose={openCloseModal}
        onRefesh={onRefesh}
        tipusEsdeveniments={tipusEsdeveniments}
        equips={equips}
      />
    );
    openCloseModal();
  };

  const onDeleteEsdeveniment = (data) => {
    setTitleAlert(`Eliminar l'esdeveniment ${data.Esdevenimentname}?`);
    setMissatgeAlert(
      "Estàs segura que vols eliminar l'esdeveniment de forma permanent? Aquesta acció és irreversible!"
    );
    setIdEsdeveniment(data.id);
    openCloseAlert();
  };

  function checkTipusEsdeveniment(esdeveniment) {
    if (esdeveniment.tipusesdeveniment_data === null) {
      return false;
    }

    return filterTipus.every((tipus) => {
      return esdeveniment.tipusesdeveniment_data.nom.includes(tipus);
    });
  }

  function checkEquips(esdeveniment) {
    if (esdeveniment.equip_data === null) {
      return false;
    }

    return filterEquips.every((equip) => {
      return esdeveniment.equip_data.nom.includes(equip);
    });
  }

  return (
    <>
      <HeaderPage
        title="Tots els Esdeveniments"
        btnTitle={
          checkPermis("EditarEsdeveniments") ? "Nou Esdeveniment" : undefined
        }
        btnClick={
          checkPermis("EditarEsdeveniments") ? createEsdeveniment : undefined
        }
        slcOptionsText="Tipus Esdeveniments"
        slcOptions={optionsTipus}
        slcChange={handleSlcChangeTipus}
        slcOptionsText2="Equips"
        slcOptions2={optionsEquips}
        slcChange2={handleSlcChangeEquips}
      />
      {loading ? (
        <Loader active inline="centered">
          Carregant...
        </Loader>
      ) : (
        <TableEsdeveniments
          esdeveniments={
            esdeveniments
              ? esdeveniments.filter((esdeveniment) =>
                  filterTipus.length > 0
                    ? checkTipusEsdeveniment(esdeveniment)
                    : true && filterEquips.length > 0
                    ? checkEquips(esdeveniment)
                    : true
                )
              : []
          }
          updateEsdeveniment={updateEsdeveniment}
          deleteEsdeveniment={onDeleteEsdeveniment}
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
            await deleteEsdeveniment(idEsdeveniment);
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
