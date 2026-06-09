import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Header,
  Segment,
  Divider,
  Button,
  Image,
  Dropdown,
  Icon,
} from "semantic-ui-react";
import { useProductes } from "../../hooks/useProductes";
import { useAuth } from "../../hooks/useAuth";
import { addProductCart } from "../../api/cart";
import { toast } from "react-toastify";
import { map, size } from "lodash";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  ImageWithZoom,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { BASE_API } from "../../utils/constants";

export function Botiga() {
  const { producteId } = useParams();
  const { producte, getProducteById } = useProductes();
  const [quantitat, setQuantitat] = useState(1);
  const [quantitatMax, setQuantitatMax] = useState();
  const [talla, setTalla] = useState(null);
  const { auth, navRefresh } = useAuth();
  const disabled = producte ? size(producte?.talles_producte) < 1 : true;

  let optionsTalles = producte
    ? producte.talles_producte.map((talla) => {
        return {
          id: talla.id,
          text: talla.talla.nom,
          value: talla.talla.nom,
        };
      })
    : [];

  useEffect(() => {
    getProducteById(producteId);
  }, []);

  const addCart = (product) => {
    addProductCart(product, talla, quantitat, quantitatMax);
    navRefresh();
  };

  const handleSlcChangeTalla = (e, data) => {
    setTalla(data.value);
    const talla = optionsTalles.find(({ value }) => value === data.value);
    const infotalla = producte?.talles_producte?.find(
      ({ id }) => id === talla?.id
    );

    setQuantitatMax(Number(infotalla?.quantitat));
    if (quantitat > Number(infotalla?.quantitat)) {
      setQuantitat(Number(infotalla?.quantitat));
    }
  };

  function onChangeQuantitat(value) {
    if (quantitat + value !== 0 && quantitat + value <= quantitatMax) {
      setQuantitat(quantitat + value);
    }
  }

  return (
    <>
      {producte && (
        <Grid container stackable relaxed>
          <Grid.Row columns={2}>
            <Grid.Column>
              {producte.imatges_producte.length > 0 ? (
                <CarouselProvider
                  visibleSlides={1}
                  naturalSlideWidth={325}
                  naturalSlideHeight={325}
                  totalSlides={producte.imatges_producte.length}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Slider>
                    {map(producte.imatges_producte, (imatge, index) => (
                      <Slide index={index}>
                        <ImageWithZoom
                          src={`${BASE_API}${imatge.path_imatge}`}
                        />
                      </Slide>
                    ))}
                  </Slider>
                  <Button
                    as={ButtonBack}
                    icon
                    circular
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      marginLeft: "4px",
                    }}
                  >
                    <Icon name="angle left" />
                  </Button>
                  <Button
                    as={ButtonNext}
                    icon
                    circular
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <Icon name="angle right" />
                  </Button>
                </CarouselProvider>
              ) : (
                <Image
                  src="https://react.semantic-ui.com/images/wireframe/image.png"
                  size="medium"
                  centered
                />
              )}
            </Grid.Column>
            <Grid.Column width={8}>
              <Segment>
                <Header as="h1">{producte.nom}</Header>
                {auth?.me?.is_soci && (
                  <>
                    <Header as="h3">
                      <del>{producte.preu} €</del>{" "}
                      <span style={{ color: "#db2828" }}>
                        {producte.preu_soci} €
                      </span>
                    </Header>
                  </>
                )}
                {!auth?.me?.is_soci && (
                  <>
                    <Header as="h3">
                      {producte.preu} €
                      <Header.Subheader>
                        Preu soci: {producte.preu_soci} €
                      </Header.Subheader>
                    </Header>
                  </>
                )}
                {disabled && (
                  <Header as={"h4"} color="red">
                    Actualment no hi ha stock d'aquest producte!
                  </Header>
                )}
                <p>{producte.descripcio}</p>
                <Header as="h3"> Talla </Header>
                <Dropdown
                  placeholder="Selecciona una talla"
                  fluid
                  selection
                  options={optionsTalles}
                  onChange={handleSlcChangeTalla}
                  disabled={disabled}
                />
                <Header as="h3"> Quantitat </Header>
                <Button.Group>
                  <Button
                    icon="minus"
                    disabled={disabled}
                    onClick={() => onChangeQuantitat(-1)}
                  />
                  <Button.Or text={quantitat} />
                  <Button
                    icon="plus"
                    disabled={disabled}
                    onClick={() => onChangeQuantitat(1)}
                  />
                </Button.Group>
                <Divider hidden />
                <Button
                  style={{ marginBottom: "10px" }}
                  fluid
                  color="green"
                  disabled={disabled || !talla}
                  onClick={() => {
                    addCart(producte);
                  }}
                >
                  Afegir a la cistella
                </Button>
                {/* <Button
                  fluid
                  color="orange"
                  disabled={disabled}
                  onClick={() => addCart(producte)}
                >
                  Comprar ara
                </Button> */}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </>
  );
}
