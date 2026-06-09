import React from 'react'
import { useNavigate } from "react-router-dom"
import { Container, Item, Label, Button, Icon } from 'semantic-ui-react'
import { map } from 'lodash';

import moment from 'moment';
import 'moment/locale/ca';
moment.locale('ca');

export function ListNoticies(props) {
    const { noticies, menu, limitNoticies } = props
    const navigate = useNavigate();
    let showInMenu = menu === false ? false : true;

    const goToNoticia = (id) => {
        navigate(`/noticies/${id}`)
    }

    function dateLocal(datetime) {
        const dt = new Date(datetime);
        dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
        return dt;
    }

    function mydiff(date1, date2, interval) {
        var second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24, week = day * 7;
        date1 = dateLocal(date1);
        date2 = dateLocal(date2);
        var timediff = date2 - date1;
        if (isNaN(timediff)) return NaN;

        switch (interval) {
            case "years": return date2.getFullYear() - date1.getFullYear();
            case "months": return (
                (date2.getFullYear() * 12 + date2.getMonth())
                -
                (date1.getFullYear() * 12 + date1.getMonth())
            );
            case "weeks": return Math.floor(timediff / week);
            case "days": return Math.floor(timediff / day);
            case "hours": return Math.floor(timediff / hour);
            case "minutes": return Math.floor(timediff / minute);
            case "seconds": return Math.floor(timediff / second);
            default: return undefined;
        }

    }
    const sections = [
        { key: 'Home', content: <a href='/' style={{ color: "inherit", textDecoration: "inherit" }}>Home</a>, link: true },
        { key: 'Noticies', content: 'Noticies', link: false },
    ]

    const renderNoticies = () => {
        return (
            <Item.Group divided link>
                {map(noticies
                    .sort((a, b) => dateLocal(b.data_publicacio).setHours(0, 0, 0, 0) - dateLocal(a.data_publicacio).setHours(0, 0, 0, 0))
                    .filter(noticia => noticia.activa && moment(dateLocal(noticia.data_publicacio)).diff() < 0)
                    .slice(0, limitNoticies), (noticia) => (
                        <Item link key={noticia.id} onClick={() => goToNoticia(noticia.id)}>
                            {
                                mydiff(noticia.data_publicacio, new Date(), "days") <= 1 ? (
                                    <Item.Image
                                        size='medium'
                                        label={{
                                            color: 'red',
                                            content: 'New',
                                            ribbon: 'right'
                                        }}
                                        src={noticia.path_imatge}
                                        rounded
                                    />
                                ) :
                                    (
                                        <Item.Image
                                            size='medium'
                                            src={noticia.path_imatge}
                                            rounded />
                                    )
                            }
                            <Item.Content>
                                <Item.Header as='a'>{noticia.titol}</Item.Header>
                                <Item.Meta >
                                    <span>{noticia.subtitol}</span>
                                </Item.Meta>
                                <Item.Extra>
                                    <Button floated='right' primary style={{ backgroundColor: "#f7931d" }}>
                                        Llegir Noticia
                                        <Icon name='chevron right' />
                                    </Button>
                                    <Item.Meta >
                                        <Label>
                                            {moment(dateLocal(noticia.data_publicacio)).fromNow()}
                                        </Label>
                                    </Item.Meta>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
            </Item.Group>
        )
    }
    return (
        <div className='list-noticies-client'>
            {showInMenu ? (
                <Container>
                    <h2>Noticies</h2>
                    {renderNoticies()}
                </Container>
            ) : (
                renderNoticies()
            )}
        </div>
    )
}
