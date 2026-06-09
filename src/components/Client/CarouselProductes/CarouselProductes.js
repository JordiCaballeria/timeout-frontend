import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { map } from "lodash";
import { useProductes } from '../../../hooks/useProductes'
import { BASE_API } from '../../../utils/constants'
import {
    CarouselProvider,
    Slider,
    Slide,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Card, Header } from 'semantic-ui-react';
import './CarouselProductes.scss'

export function CarouselProductes() {
    const { productes, getProductes } = useProductes();
    const navigate = useNavigate();

    useEffect(() => { getProductes() }, [])

    return (
        <div>
            <CarouselProvider
                visibleSlides={2}
                naturalSlideWidth={3}
                naturalSlideHeight={3.7}
                totalSlides={productes?.length}
                orientation={'vertical'}
                interval={3000}
                isPlaying={true}
                style={{ maxHeight: "980px"}}
            >
                <Slider
                    style={{ height: "980px" }}
                >
                    {map(productes, (producte, index) => (
                        <Slide
                            index={index}
                            style={{padding: "210px 0px", marginTop: "20px"}}
                        >
                            {/* <img
                                alt={producte.id}
                                src={`${BASE_API}${producte.imatges_producte[0].path_imatge}`}
                                style={{ width: "100%", height: "300px", objectFit: "contain" }}
                            /> */}
                            <Card.Group centered>
                                <Card
                                    key={producte.id}
                                onClick={() => navigate(`/botiga/${producte.id}`)}
                                style={{boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.25)"}}
                                >
                                    <CarouselProvider
                                        visibleSlides={1}
                                        naturalSlideWidth={1}
                                        naturalSlideHeight={1}
                                        totalSlides={producte.imatges_producte.length}
                                    /* isIntrinsicHeight={true} */
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
                            </Card.Group>
                        </Slide>
                    ))}
                </Slider>
            </CarouselProvider>
        </div>
    )
}
