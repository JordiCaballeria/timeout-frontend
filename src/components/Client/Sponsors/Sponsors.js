import React, { useEffect } from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';
import { usePatrocinadors } from '../../../hooks/usePatrocinadors'

import './Sponsors.scss';

export function Sponsors() {

    const { patrocinadors, getPatrocinadors } = usePatrocinadors();

    useEffect(() => { getPatrocinadors() }, [])

    return (
        <>
            <Container >
                <Grid doubling verticalAlign='middle' centered columns={5}>
                    {patrocinadors?.filter(sponsor => sponsor.actiu).map(sponsor => (
                        <Grid.Column centered key={sponsor.id}>
                            <Image
                                centered
                                as='a'
                                target='_blank'
                                alt={sponsor.nom}
                                href={sponsor.link}
                                src={sponsor.path_imatge} />
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>
        </>
    )
}
