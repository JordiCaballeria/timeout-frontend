import React, { useEffect } from "react";
import { Button, Grid, Icon } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import { Sponsors } from "../../components/Client/Sponsors";
import { Noticies } from "./Noticies";
import { useEquips } from "../../hooks/useEquips";
import { usePatrocinadors } from "../../hooks/usePatrocinadors";
import { map } from "lodash";
import "./Home.scss";

import { CarouselProductes } from "../../components/Client/CarouselProductes";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

export const Home = () => {
  let imatges = [
    {
      id: 1,
      imatge:
        "https://upload.wikimedia.org/wikipedia/commons/1/1a/ST_vs_Gloucester_-_Match_-_23.JPG",
    },
    {
      id: 2,
      imatge:
        "https://sarugbyshop.co.za/wp-content/uploads/2023/02/2021-bok-jersey-am.jpg",
    },
  ];
  const { patrocinadors, getPatrocinadors } = usePatrocinadors();
  const { equipsClient, getEquipsClient } = useEquips();

  useEffect(() => {
    getPatrocinadors();
    getEquipsClient();
  }, []);

  return (
    <>
      <main>
        <CarouselProvider
          visibleSlides={1}
          naturalSlideWidth={1}
          naturalSlideHeight={1}
          totalSlides={imatges.length}
          interval={5000}
          isPlaying={true}
          style={{
            marginTop: "-27px",
            marginBottom: "40px",
            height: "400px",
          }}
        >
          <Slider>
            {map(imatges, (imatge, index) => (
              <Slide index={index}>
                <img
                  alt={imatge.id}
                  src={imatge.imatge}
                  style={{ width: "100%", height: "400px", objectFit: "cover" }}
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
        <Grid stackable relaxed className="conatiner-main">
          <Grid.Row columns={2}>
            <Grid.Column width={12}>
              <Noticies menu={false} limitNoticies={5} />
            </Grid.Column>
            <Grid.Column
              width={4}
              style={{ padding: "40px 0", marginTop: "-60px" }}
            >
              <CarouselProductes />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <Sponsors patrocinadors={patrocinadors} />
      </main>
    </>
  );
};
