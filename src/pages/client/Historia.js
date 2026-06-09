import React from 'react'
import { Grid, Header, Image, Divider } from 'semantic-ui-react'

export function Historia() {
    return (
        <>
            <Grid container stackable textAlign='justified'>
                <Grid.Row>
                    <Grid.Column>
                        <Header as="h1" block>HISTÒRIA DEL SABADELL RUGBY CLUB</Header>
                        <Divider hidden />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Header as="h2" >Any 2014: FUNDACIÓ DEL CLUB</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <p style={{ fontSize: '16px' }}>
                            El rugbi va arribar a la ciutat de Sabadell al febrer del 2014, però un seguit de problemes amb la junta d'aleshores va obligar, poc després, a refundar el club.
                        </p>
                        <p style={{ fontSize: '16px' }}>
                            El Sabadell Rugby Club, doncs, <b>va néixer oficialment al juny del 2014</b> amb l'objectiu de transmetre els principals valors d'aquest esport a una ciutat que no oferia a les seves ciutadanes la possibilitat de practicar aquest esport. <b>Francisco Caballero "Paco"</b> en serà el seu primer president.
                        </p>
                    </Grid.Column>
                    <Grid.Column floated='right' width={4}>
                        <Image size='small' src='https://i.ibb.co/0Mbsdg1/1r-logo-sabadellrc.png' centered/>
                        <p style={{ fontSize: '12px', textAlign: "center", marginTop: "10px" }}>Primer escut del SRC. Aquest va tenir una curta durada, de del febrer l juny del 2014</p>
                    </Grid.Column>
                </Grid.Row>
                <Divider />

                <Grid.Row>
                    <Grid.Column>
                        <Header as="h2" >TEMPORADA 2014-2015: L'EXILI SABADALLENC</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <p style={{ fontSize: '16px' }}>
                            En els seus inicis, el club que havia començat els seus entrenaments al Parc Catalunya, va lluitar per aconseguir un camp a la ciutat, però les dificultats per aconseguir-lo, <b>van portar al club a competir els seus primers anys al Camp de Les Oliveres de Santa Coloma de Gramanet</b>. Abans, però, s'havia aconseguit entrenar uns mesos als camps de l'OAR Gràcia.
                        </p>
                        <p style={{ fontSize: '16px' }}>
                            En la <b>primera temporada de competició oficial el club</b> comptava amb 25 fitxes d'un sènior masculí, que just iniciava la seva aventura en aquest esport a la 3a Divisió Catalana, dirigits per <b>Uriel Martínez</b>. També hi havia algunes dones que composaven l'embrió de l'equip femení, que aquella primera temporada van jugar cedides a Carboners de Terrassa.
                        </p>
                    </Grid.Column>
                    <Grid.Column floated='right' width={4}>
                        <Image size='medium' src='https://i.ibb.co/R7BVfyh/celebracio-finalitzacio-1atemporada.png' />
                        <p style={{ fontSize: '12px', textAlign: "center", marginTop: "10px" }}>Celebració de la finalització de la 1a temporada de competició del SRC.</p>
                    </Grid.Column>
                </Grid.Row>
                <Divider />

                <Grid.Row>
                    <Grid.Column>
                        <Header as="h2" >TEMPORADA 2015-2016: FUNDACIÓ DEL SÈNIOR FEMENÍ</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <p style={{ fontSize: '16px' }}>
                            S'<b>inicia el que serà l'equip femení del Sabadell</b>, tot i que encara no competeix oficialment. És una temporada d'assoliment de conceptes i creixement esportiu de l'equip. Els entrenaments són dirigits per Carlos López "Caniche".
                        </p>
                        <p style={{ fontSize: '16px' }}>
                            Pel que fa al masculí, es fitxa a l'entrenador <b>Fran González</b>, el que significarà un salt de qualitat als plantejaments del joc. S'aconsegueix la <b>classificació per jugar a la 2a Divisió Catalana</b>, la posició final encara és discreta, finalitzant la competició en 9a posició.
                        </p>
                        <p style={{ fontSize: '16px' }}>
                            A principis de l'any 2016, l'<b>Ajuntament de Sabadell ofereix un camp a la ciutat per poder entrenar en el Complex de Sant Oleguer</b>. Els partits locals, però, es segueixen disputant al Camp de les Oliveres de Santa Coloma.
                        </p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Image size='large' src='https://i.ibb.co/FztJrR4/primer-entrenament-femeni.png' centered />
                        <p style={{ fontSize: '12px', textAlign: "center", marginTop: "10px" }}>Imatge d'un dels primers entrenaments del sènior femení.</p>
                    </Grid.Column>
                </Grid.Row>
                <Divider />

                <Grid.Row>
                    <Grid.Column>
                        <Header as="h2" >TEMPORADA 2016-2017: UN CAMP A SABADELL</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <p style={{ fontSize: '16px' }}>
                            Aquesta és una temporada de grans canvis en el club. El primer de tots és que per fi, Sabadell compta amb un camp on disputar partits de competició oficial de rugbi: <b>El Camp Municipal de La Roureda</b>. L'Ajuntament de Sabadell el converteix en un camp mixte, apte per a la pràctica del rugbi. Des d'aleshores, aquest camp s'ha convertit en el terreny de joc habitual del club, l'indret des d'on es representa la ciutat a través del rugbi.
                        </p>
                        <p style={{ fontSize: '16px' }}>
                            També es creix pel que fa al rugby femení. <b>Les jugadores del Sabadell Rugby Club competeixen per primera vegada sota el nom de Partisanes</b>, fruit de l'acord de fusió entre els equips femenins del Sabadell i el Santa Coloma. En el seu primer any, quedaran en 7a posició a la 2a Divisió Catalana. L'equip serà dirigit per <b>Míriam De La Rubia</b> (entrenadora del Sabadell) i <b>Rubén Montes</b> (entrenador del Santa Coloma).
                        </p>
                        <p style={{ fontSize: '16px' }}>
                            I el sènior masculí fa el gran salt de qualitat buscat amb la incorporació de Fran González a la direcció de l'equip. Després d'una primera excel·lent volta, <b>el conjunt es guanya el dret a jugar a la Divisió Catalana.</b> La dificultat de la nova categoria es fa evident, i l'equip queda en 12a posició. El club es manté a la divisió gràcies a la renúncia del filial del CEU.
                        </p>
                    </Grid.Column>
                    <Grid.Column floated='right' width={4}>
                        <Image size='medium' src='https://i.ibb.co/ZzYwcSt/primer-partit-oficial-Partisanes.png' />
                        <p style={{ fontSize: '12px', textAlign: "center", marginTop: "10px" }}>1r partit oficial de les Partisanes, contra les Crancs d'Osona, a Vic.</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <p style={{ fontSize: '16px' }}>
                            I el sènior masculí fa el gran salt de qualitat buscat amb la incorporació de Fran González a la direcció de l'equip. Després d'una primera excel·lent volta, <b>el conjunt es guanya el dret a jugar a la Divisió Catalana.</b> La dificultat de la nova categoria es fa evident, i l'equip queda en 12a posició. El club es manté a la divisió gràcies a la renúncia del filial del CEU.
                        </p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column verticalAlign='bottom'>
                        <Image size='large' src='https://i.ibb.co/NL9vwmk/celebracio-ascens-1a-divisio.png' centered />
                        <p style={{ fontSize: '12px', textAlign: "center", marginTop: "10px" }}>Celebració ascens a 1a Divisió Catalana al camp del CRUC.</p>
                    </Grid.Column>
                    <Grid.Column>
                        <Image size='large' src='https://i.ibb.co/kxpfJDR/camp-municipal-la-roureda.png' centered />
                        <p style={{ fontSize: '12px', textAlign: "center", marginTop: "10px" }}>Imatge del Camp Municipal de la Roureda</p>
                    </Grid.Column>
                </Grid.Row>
                <Divider />

                <Grid.Row>
                    <Grid.Column>
                        <Header as="h2" >TEMPORADA 2017-2018: PLAÇA PELS PLAYOFFS DEL TÍTOL</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <p style={{ fontSize: '16px' }}>
                            A principis de curs <b>Arnau Vidal substitueix a Francisco Caballero al capdavant de la presidència del club.</b> La seva candidatura s'imposa a la liderada per la fins aleshores vicepresidenta <b>Elisabet Grané</b>.
                        </p>
                        <p style={{ fontSize: '16px' }}>
                            L'<b>equip sènior Masculí completa una temporada històrica</b>: Queda 4t en la temporada regular de la Divisió Catalana, I obté una <b>plaça pels playoffs del títol</b>. A les semifinals jugades a Granollers, però, l'equip local (Spartans de Granollers) s'imposarà per un ajustat 24-20. S'assoleix, però, la millor temporada de la història fins aquest moment.
                        </p>
                        <p style={{ fontSize: '16px' }}>
                            El femení segueix fusionat amb el Santa Coloma sota el nom de Partisanes. Aquest cop l'entrenadora del conjunt serà <b>Cristina Sánchez</b> junt amb en <b>Rubén Montes</b>. Aquesta serà la última temporada de la fusió.
                        </p>
                        <p style={{ fontSize: '16px' }}>
                            Pel que fa a la situació del camp de La Roureda, l'Ajuntament torna a ubicar els entrenament del club a Sant Oleguer, però manté els partits a La Roureda. Un fet que suposa un pas enrere a l'aconseguit fins aleshores.
                        </p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Image size='large' src='https://i.ibb.co/n74zGqb/plantilla-semifinals-1a-divisio-catalunya.png' centered />
                        <p style={{ fontSize: '12px', textAlign: "center", marginTop: "10px" }}>La plantilla que va arribar a les semifinals de 1a Divisió catalana, amb afició.</p>
                    </Grid.Column>
                </Grid.Row>
                <Divider />

                <Grid.Row>
                    <Grid.Column>
                        <Header as="h2" >TEMPORADA 2018-2019: NINGÚ VA DIR QUE SERIA FÀCIL</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <p style={{ fontSize: '16px' }}>
                            Després de veure perillar els espais d'entrenament del club durant l'agost, finalment <b>s'arriba un acord in-extremis amb a L'<b>Ajuntament de Sabadell per a poder entrenar.</b> Aquest cop, el Sabadell haurà d'entrenar en dos camps diferents (Sant Oleguer i Olímpia), però seguirà disputant els seus partits a La Roureda.</b>
                        </p>
                        <p style={{ fontSize: '16px' }}>
                            En competició oficial, <b>el femení es fusiona novament, aquest cop amb el Begues Rugby Club sota el nom de Valquiries. Cristina Sánchez</b> comença entrenant el conjunt, però a mitja temporada ho ha de deixar per motius de salut. <b>Fran Gonzalez</b>, també entrenador del masculí, es farà càrrec de l'equip fins a final de temporada. L'equip quedarà en 4a posició de la 2a Divisió Catalana.
                        </p>
                        <p style={{ fontSize: '16px' }}>
                            Pel que fa el masculí, després d'un inici de temporada en un grup molt dur, acaba finalitzant la lliga en la 6a posició de la Primera Divisió Catalana, tot i disputar fins a l'últim partit les opcions per jugar els playoff del títol.
                        </p>
                    </Grid.Column>
                    <Grid.Column floated='right' width={4}>
                        <Image size='medium' src='https://i.ibb.co/w0gFr2P/partit-oficial-Partisines.png' />
                        <p style={{ fontSize: '12px', textAlign: "center", marginTop: "10px" }}>1r partit oficial de les Partisanes, contra les Crancs d'Osona, a Vic.</p>
                    </Grid.Column>
                </Grid.Row>
                <Divider />

                <Grid.Row>
                    <Grid.Column>
                        <Header as="h2">TEMPORADA 2019-2020: L'ARRIBADA DE LA COVID19</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <p style={{ fontSize: '16px' }}>
                            <b>Aquesta temporada quedarà marcada per la pandèmia mundial que va significar la COVID19, i que va afectar a tot el món i a tots els nivells.</b>
                        </p>
                        <p style={{ fontSize: '16px' }}>
                            Esportivament parlant, <b>el sènior femení estrena entrenador: Montes</b>, provinent dels Dragons de Santa Coloma (i que ja havia entrenat al femení quan aquestes estaven fusionades amb aquest club) es fa càrrec del femení. Aquest cop es fusiona amb les Espartanes de Granollers, sota el nom de FEM Vallès. En la primera fase de classificació per a Primera Catalana no assoleix l'objectiu d'ascendir, però realitzen una segona volta espectacular: <b>Aconsegueixen la classificació per a la final contra FEM- Rugby. Aquest partit no s'arribarà a disputar mai per les mesures de confinament davant la COVID19, i la competició queda anulada.</b>
                        </p>
                        <p style={{ fontSize: '16px' }}>
                            Amb el masculí, el guió també és molt similar. En la primera volta juguen la fase de classificació per disputar la Divisió d'Honor Catalana "Vueling". Realitzen una bona primera volta, però no és suficient per a la classificació per a la DHC: perden l'últim partit contra Químics, que els hi pren la classificació per un sol punt de diferència. En la segona volta a Primera Catalana, obtenen molts bons resultats, i a falta de dos partits per al final de la lliga regular, obtenen la classificació per a disputar les semifinals de la competició... Però <b>els dos partits que falten per jugar i les semifinals tampoc es disputaran mai amb l'arribada de la COVID19.</b>
                        </p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Image size='large' src='https://i.ibb.co/8m355QJ/derbi-Can-Jofresa.png' centered />
                        <p style={{ fontSize: '12px', textAlign: "center", marginTop: "10px" }}>Imatge del derbi contra Carboners a Can Jofresa el 6-10-19. El SRC s'imposaria 24-39.<b> Fotografia:</b> Edu Rols</p>
                    </Grid.Column>
                </Grid.Row>
                <Divider />

                <Grid.Row>
                    <Grid.Column>
                        <Header as="h2" >TEMPORADA 2020-2021: FUNDACIÓ DE L'ESCOLA DE RUGBY</Header>
                        <p style={{ fontSize: '16px' }}>
                            La pandèmia de la COVID19 encara fa estralls a nivell mundial, i després d'un llarg confinament per raons de salut de la població, tots els equips tornen als entrenaments. Aquest cop, però amb moltes restriccions per evitar la propagació del virus.
                        </p>
                        <p style={{ fontSize: '16px' }}>
                            La Federació Catalana de Rugbi preveu que la competició s'iniciarà a principis de gener, però la tercera onada colpeja amb força a la població, i el Sabadell Rugby Club decideix que per responsabiitat, no es participarà de la competició i es mantindran els entrenaments amb les mesures sanitàries corresponents. Aquesta renúncia a competir no comportarà el descens de categories dels equips, però al no estar federades, sí tindran més restriccions per entrenar i de mobilitat. És doncs, un any de feina interna i reestructuració.
                        </p>
                        <p style={{ fontSize: '16px' }}>
                            Per altra banda, després d'un any de la desaparició de l'Escola de Rugbi de Sant Quirze del Vallès (que actuava com a escola gràcies a un acord entre directives), el Sabadell Rugby Club inicia el projecte de l'Escola de Rugbi, i es convertirà en el projecte més important del club.
                        </p>
                        <p style={{ fontSize: '16px' }}>
                            Al juny hi ha un canvi de junta, aquest cop sense eleccions al no presentar-se cap candidatura alternativa. Oriol Ferran agafarà el relleu d'Arnau Vidal, que deixa el càrrec de president.
                        </p>
                    </Grid.Column>
                </Grid.Row>
                <Divider hidden />
            </Grid>
        </>
    )
}
