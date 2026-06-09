import React from 'react'
import { Grid, Header, Image, List, Divider } from 'semantic-ui-react'

export function Soci() {
    return (
        <>
            <Grid container stackable textAlign='justified' style={{ fontSize: '16px', }}>
                <Grid.Row>
                    <Grid.Column>
                        <Header as="h1" block>FES-TE SÒCIA</Header>
                    </Grid.Column>
                </Grid.Row>
                <Divider />
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Header as="h3">🏉 I TU, PORTES EL RUGBI A LA PELL?</Header>
                        <p>Ja fa uns mesos que a poc a poc el club ha pogut tornar a la normalitat amb els entrenaments dels sèniors femení i masculí, així com la recentment creada escola de rugbi de Sabadell. Tenim nois i noies jugant a diferents categories i els dos sèniors competint. A nosaltres ens agradaria tornar a comptar amb el teu suport: les sòcies i socis sou una part fonamental d'aquest projecte, amplieu la base en la qual se sustenta el club i amb una petita aportació econòmica ens ajudeu a empènyer amb més força, a donar un últim alè a l'última jugada del partit, a aixecar més amunt les touches, a placar més contundentment...</p>
                        <Header as="h3">PER QUÈ SERVEIX?</Header>
                        <p>Fer-se soci o sòcia del Sabadell RC ajuda al club a seguir creixent i poder afrontar reptes que fins ara són impossibles a causa dels entrebancs econòmics. A part, juntes, podem aconseguir portar el nom de la ciutat ben amunt, al lloc on es mereix.</p>
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='centered'>
                        <Image centered src='https://i.ibb.co/2W5z9DN/Escoleta.png' />
                    </Grid.Column>
                </Grid.Row>
                <Divider />
                <Grid.Row>
                    <Grid.Column width={6} textAlign='centered'>
                        <Image centered src='https://blogger.googleusercontent.com/img/a/AVvXsEiW7GA7KpU0LlRBlFs790uPl6e8ZSb1JGl-SOvNRlr_CbUP-o3JYRbzQgQOyJ8_GT6BPT-qghIxYEdmFzWPAw7DIL26tpURYvHVpAmdOaMbcBmT37a1uArvVftw8nzeGYK4TA3ElsXy_f9SJULHLASrSczzdZqveKherwhzmpV40jk4eNR_YOGSEmCE=w640-h640'/>
                    </Grid.Column>
                    <Grid.Column width={8}>

                        <Header as="h3">“Què m’aporta ser sòcia del Sabadell RC?”:</Header>
                        <List ordered>
                            <List.Item>Ajudar al club a seguir creixent.</List.Item>
                            <List.Item>Rebreu les principals notícies del club i les cròniques dels partits dels diferents equips i el cartells dels partits. D’aquesta manera, podreu estar al corrent de les novetats i els resultats del club.</List.Item>
                            <List.Item>Et regalarem una bossa de tela estampada amb l'escut del Sabadell RC.</List.Item>
                            <List.Item>Et regalarem un adhesiu per què el teu cotxe, l'agenda o el mòbil també portin el Sabadell Rugby club a la pell.</List.Item>
                            <List.Item>Tindràs prioritat per reservar entrades als partits que juguem com a local en cas que retornin les limitacions d'aforament als recintes esportius.</List.Item>
                            <List.Item>Podràs participar d'activitats exclusives per a socis.</List.Item>
                            <List.Item>Descomptes en el marxandatge del club.</List.Item>
                            <List.Item>Descomptes exclusius per part dels nostres patrocinadors.</List.Item>
                            <Divider hidden />
                            <List.Item>I per si tots aquests motius fossin pocs entre totes les sòcies i socis sortejarem una de les samarretes del club!</List.Item>
                        </List>
                    </Grid.Column>
                </Grid.Row>
                <Divider />
                <Grid.Row>
                    <Grid.Column >

                        <Header as="h3">“Quant costa?”:</Header>
                        <p>Amb només 25€ a la temporada podeu ser socis o sòcies del club i gaudir de tots els avantatges explicats prèviament. </p>

                        <Header as="h3">“Com ho podem fer?”:</Header>
                        <p>Per unir-vos al Sabadell RC ho podeu fer directament des d'aquesta mateixa pàgina web al botó que trobareu a la barra de navegació.</p>

                        <Header as="h3">“Quant de temps dura?”:</Header>
                        <p>Si us feu sòcies podreu gaudir de tots els privilegis durant l'etapa que hagueu seleccionat en el formulari. Una vegada finalitzat aquest període, podreu renovar la subscripció i continuar ajudant al club de la ciutat.</p>

                        <Divider hidden />
                        <p>Si teniu qualsevol dubte, podeu posar-vos en contacte amb nosaltres a través del correu electrònic src.socis@gmail.com o a qualsevol dels nostres perfils oficials de les xarxes socials.</p>
                        <p>I recorda, amb tu a la grada som més fortes!
                            Salut, rugby i cebes!</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}
