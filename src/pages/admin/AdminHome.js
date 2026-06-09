import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { Tab, Loader } from "semantic-ui-react";
import { TableResumUsers } from "../../components/Admin/AdminHome/TableResumUsers/TableResumUsers";
import { TableResumSocis } from "../../components/Admin/AdminHome/TableResumSocis/TableResumSocis";
import { TableResumProductes } from "../../components/Admin/AdminHome/TableResumProductes/TableResumProductes";
import { TableResumEntrades } from "../../components/Admin/AdminHome/TableResumEntrades/TableResumEntrades";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { VeureEntrada } from "../../components/Admin/Entrades";
export const AdminHome = () => {
  const { checkPermis } = useUser();
  const navigate = useNavigate();
  const { getResum, resum, loading } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  useEffect(() => {
    getResum();
  }, []);
  if (!checkPermis("isStaff")) return navigate("/");
  const openCloseModal = () => setShowModal((prev) => !prev);

  const veureEntrada = (data) => {
    setTitleModal("Entrada ", data.id);
    setContentModal(<VeureEntrada entrada={data} />);
    openCloseModal();
  };

  const panes = [
    {
      menuItem: "Ultims usuaris registrats",
      render: () => (
        <Tab.Pane>
          <TableResumUsers resumUsers={resum.ultims_users} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Ultims socis donats d'alta",
      render: () => (
        <Tab.Pane>
          <TableResumSocis resumSocis={resum.ultims_soci_users} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Ultims productes comprats",
      render: () => (
        <Tab.Pane>
          <TableResumProductes resumProductes={resum.ultims_productesvenuts} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Ultimes entrades venudes",
      render: () => (
        <Tab.Pane>
          <TableResumEntrades
            resumEntrades={resum.ultimes_entradesvenudes}
            veureEntrada={veureEntrada}
          />
        </Tab.Pane>
      ),
    },
  ];

  if (loading)
    return (
      <Loader active inline="centered">
        Carregant...
      </Loader>
    );
  return (
    <>
      <Tab panes={panes} />
      <ModalBasic
        show={showModal}
        title={titlewModal}
        children={contentModal}
        onClose={openCloseModal}
        size="fullscreen"
      />
    </>
  );
};
