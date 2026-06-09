import React from 'react'
import { Container, Segment, Image, List, Item } from 'semantic-ui-react'

export function Footer(props) {
    return (
        <Segment secondary as="footer" className='client-footer' style={{ marginTop: "auto", boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)" }}>
            <Container textAlign="center" >
                <Image centered size='tiny' src='https://i.postimg.cc/BvGvnW6J/SRCtr.png' />
                <Item>©{new Date().getFullYear()} All rights reserved</Item>
                <Item style={{marginTop: "10px"}}>
                    <span>Powered by</span>{' '}
                    <Image src={'https://i.ibb.co/Qv98nDc/nom-Time-Out.png'} size='tiny' verticalAlign='middle' />{'™'}
                </Item>

                <List horizontal divided link size='small'>
                    <List.Item as='a' href=''>
                        Avís Legal
                    </List.Item>
                    <List.Item as='a' href=''>
                        Política de privacitat
                    </List.Item>
                    <List.Item as='a' href='/contacte'>
                        Contacte
                    </List.Item>
                </List>
            </Container>
            {/* <Icon link name='angle double up' size='big' /> */}
        </Segment>
    )
}

/* import React from 'react'
import { Container, Segment, Image, List, Item, Icon, Grid } from 'semantic-ui-react'

export function Footer() {
    return (
        <Segment secondary as="footer" >
            <Grid textAlign='center' verticalAlign='middle'>
                <Grid.Row centered>
                    <Grid.Column width={3}>
                        <Image centered size='tiny' src='https://i.postimg.cc/BvGvnW6J/SRCtr.png' />
                        <Item>©{new Date().getFullYear()} All rights reserved</Item>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <List horizontal divided link size='small'>
                            <List.Item as='a' href=''>
                                Avís Legal
                            </List.Item>
                            <List.Item as='a' href=''>
                                Política de privacitat
                            </List.Item>
                            <List.Item as='a' href=''>
                                Contacte
                            </List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column floated='right' width={3}>
                        <Icon floated='right' link name='angle double up' size='big' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}
 */