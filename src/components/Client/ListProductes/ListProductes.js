import React, { useState } from "react";
import { Card, Header, Grid, Menu, Sticky } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { map } from "lodash";
import { BASE_API } from "../../../utils/constants";
import './ListProductes.scss'

import {
  CarouselProvider,
  Slider,
  Slide,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

export function ListProductes(props) {
  const { productes, tipusProducte } = props;
  const navigate = useNavigate();

  const [activeItem, setactiveItem] = useState("TOTS");
  const handleItemClick = (e, { name }) => {
    setactiveItem(name);
    settipusFilter(name);
  };

  const [tipusFilter, settipusFilter] = useState("TOTS");

  const goToProducte = (id) => {
    navigate(`/botiga/${id}`);
  };

  return (

    <div className="list-productes-client">
      <Grid stackable relaxed>
        <Grid.Row>
          <Grid.Column widescreen={2} largeScreen={3} computer={4} tablet={4} mobile={4}>
          </Grid.Column>
          <Grid.Column widescreen={14} largeScreen={13} computer={12} tablet={12} mobile={12}>
            <h2>Botiga</h2>
          </Grid.Column>
        </Grid.Row>

        {/* MENU MOBILE */}
        <Grid.Row only='mobile'>
          <div class="menu-mobile">
            <Menu pointing secondary className="vertical-center">
              <Menu.Item
                name="TOTS"
                active={activeItem.toUpperCase() === "TOTS" ? true : false}
                onClick={handleItemClick}
              />
              {map(tipusProducte, (tipus, index) => (
                <Menu.Item
                  key={index}
                  name={(tipus.nom).toUpperCase()}
                  active={activeItem.toUpperCase() === (tipus.nom).toUpperCase() ? true : false}
                  onClick={handleItemClick}
                />
              ))}
            </Menu>
          </div>
        </Grid.Row >

        <Grid.Row columns={2}>
          {/* MENU TABLET AND COMPUTER */}
          <Grid.Column widescreen={2} largeScreen={2} computer={3} tablet={4} /* mobile={4} */ only='tablet'>
            <Menu pointing secondary vertical size="big" style={{ width: "100%", minWidth: "175px" }}>
              <Menu.Item>
                <Menu.Header>Filtra per...</Menu.Header>
              </Menu.Item>
              <Menu.Item
                name="TOTS"
                active={activeItem === "TOTS" ? true : false}
                onClick={handleItemClick}
              />
              {map(tipusProducte, (tipus, index) => (
                <Menu.Item
                  key={index}
                  name={(tipus.nom).toUpperCase()}
                  active={(activeItem).toUpperCase() === (tipus.nom).toUpperCase() ? true : false}
                  onClick={handleItemClick}
                />
              ))}
            </Menu>
          </Grid.Column>
          <Grid.Column widescreen={14} largeScreen={14} computer={13} tablet={12} mobile={16}>
            {productes?.filter(
              (producte) => (producte.tipus_data.nom).toUpperCase() === (tipusFilter).toUpperCase()
            ).length > 0 || tipusFilter === "TOTS" ? (
              <Card.Group centered>
                {map(
                  tipusFilter === "TOTS"
                    ? productes
                    : productes.filter(
                      (producte) => (producte.tipus_data.nom).toUpperCase() === (tipusFilter).toUpperCase()
                    ),
                  (producte) => (
                    <Card
                      key={producte.id}
                      onClick={() => goToProducte(producte.id)}
                    >
                      <CarouselProvider
                        visibleSlides={1}
                        naturalSlideWidth={100}
                        naturalSlideHeight={100}
                        totalSlides={producte.imatges_producte.length}
                        isIntrinsicHeight={true}
                      >
                        <Slider>
                          {map(producte.imatges_producte, (imatge, index) => (
                            <Slide index={index}>
                              <img
                                alt={imatge.id}
                                src={`${BASE_API}${imatge.path_imatge}`}
                                style={{ width: "100%", height: "300px", objectFit: "contain" }}
                              />
                            </Slide>
                          ))}
                        </Slider>
                      </CarouselProvider>
                      <Card.Content>
                        <Card.Header>{producte.nom}</Card.Header>
                        <Card.Meta>
                          Preu socis: {producte.preu_soci} €
                        </Card.Meta>
                        <Header as="h4" floated="right">
                          {producte.preu} €
                        </Header>
                      </Card.Content>
                    </Card>
                  )
                )}
              </Card.Group>
            ) : (
              <Header as="h3" textAlign="center">
                No hi ha productes del tipus seleccionat
              </Header>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
