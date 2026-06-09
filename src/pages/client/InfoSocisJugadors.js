import React from 'react'
import { Grid, Header, Image, Divider } from 'semantic-ui-react'

export function InfoSocisJugadors() {

    return (
        <>
            <Grid container stackable textAlign='justified'>
                <Grid.Row>
                    <Grid.Column>
                        <Header as="h1" block>INFORMACIÓ SOCIS I JUGADORS</Header>
                        <Divider hidden />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                    <Grid.Column floated='left' width={4} textAlign='centered'>
                        <Image size='medium' src='https://i.postimg.cc/BvGvnW6J/SRCtr.png' />
                        <Header textAlign='centered' as="h4">Peu de pàgina de la imatge</Header>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}
