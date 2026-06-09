import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Loader } from "semantic-ui-react";
import { size } from "lodash";
import { useProductes } from "../../hooks/useProductes";
import { getProductsCart } from "../../api/cart";
import { ListProductCart } from "../../components/Client/ListProductesCart";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { PayCartForm } from "../../components/Client/PayCartForm/PayCartForm";
import { usePagaments } from "../../hooks/usePagaments";

export function Cart() {
  const [productes, setProductes] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [reload, setReload] = useState(false);
  const { getProducteById } = useProductes();
  const { getTipusPagaments, tipusPagament } = usePagaments();

  useEffect(() => {
    (async () => {
      const productsCart = getProductsCart();

      const productsArray = [];
      for await (const product of productsCart) {
        const response = await getProducteById(product.id);
        productsArray.push(response);
      }
      setProductes(productsArray);
    })();
    getTipusPagaments();
  }, [reload]);

  const onPagar = (data, total) => {
    setTitleModal("Comprar productes ", data.id);
    setContentModal(
      <PayCartForm
        onClose={openCloseModal}
        onRefesh={onReload}
        productes={productes}
        venta={data}
        tipusPagament={tipusPagament}
        total={total}
      />
    );
    openCloseModal();
  };

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onReload = () => setReload((prev) => !prev);

  return (
    <Container>
      <h2>La teva cistella</h2>
      {!productes ? (
        <Loader active inline="centered" />
      ) : size(productes) < 1 ? (
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "20px" }}>La teva cistella està buida.</p>
          <Link to={"/botiga"}>
            <Button>Seguir comprant</Button>
          </Link>
        </div>
      ) : (
        <ListProductCart
          productes={productes}
          onReload={onReload}
          onPagar={onPagar}
        />
      )}
      <ModalBasic
        show={showModal}
        title={titlewModal}
        children={contentModal}
        onClose={openCloseModal}
        size="tiny"
      />
    </Container>
  );
}
