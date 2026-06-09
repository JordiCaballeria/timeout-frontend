import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Client/Navbar";
import { Footer } from "../../components/Client/Footer";
import { ModalBasic } from "../../components/Common/ModalBasic";
import "./ClientLayout.scss";
import { LoginForm } from "../../components/Admin/LoginForm/LoginForm";
import { useAuth } from "../../hooks/useAuth";
import { RegisterEditForm } from "../../components/Client/RegisterForm/RegisterForm";
import { RecuperarPassword } from "../../components/Common/RecuperarPassword/RecuperarPassword";
export const ClientLayout = (props) => {
  const { children } = props;
  const [showLogin, setshowLogin] = useState(false);
  const [showRegister, setshowRegister] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  const ModalShowLogin = () => setshowLogin((prev) => !prev);
  const ModalShowRegister = () => setshowRegister((prev) => !prev);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const [refresh, setRefresh] = useState(false);

  const onRefesh = () => setRefresh((prev) => !prev);
  const { auth } = useAuth();

  useEffect(() => {
    closeModalAuth();
    // eslint-disable-next-line
  }, [auth, refresh]);

  const closeModalAuth = () => {
    if (auth) {
      setshowLogin(false);
    }
  };

  const onRecuperar = () => {
    setTitleModal("Recuperar contrasseya");
    setContentModal(
      <RecuperarPassword onClose={openCloseModal} onRefesh={onRefesh} />
    );
    openCloseModal();
  };

  return (
    <>
      <div className="client-layout">
        <div>
          <Navbar
            ModalLogin={ModalShowLogin}
            ModalRegister={ModalShowRegister}
          />
        </div>
        <div className="client-layout__main-content">
          {children}
          <ModalBasic show={showLogin} onClose={ModalShowLogin} title="Iniciar sessió">
            <LoginForm onRecuperar={onRecuperar} />
          </ModalBasic>
          <ModalBasic
            show={showRegister}
            onClose={ModalShowRegister}
            title="Crea el teu compte"
          >
            <RegisterEditForm onClose={ModalShowRegister} onRefesh={onRefesh} />
          </ModalBasic>
          <ModalBasic
            show={showModal}
            title={titlewModal}
            children={contentModal}
            onClose={openCloseModal}
            size={"tiny"}
          />
        </div>
        <Footer />
      </div>
    </>
  );
};
