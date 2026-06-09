import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Header, Segment, Divider, Button, List, Container, Image, GridColumn } from 'semantic-ui-react';
import { useNoticies } from '../../hooks/useNoticies'

export function Noticia() {
  const { noticiaId } = useParams();
  const { noticia, getNoticiaById } = useNoticies();

  useEffect(() => { getNoticiaById(noticiaId) }, [])

  function dateLocal(datetime) {
    const dt = new Date(datetime);
    dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
    return dt.toLocaleDateString();
}

  return (
    <>
      {noticia &&
        <Grid container stackable>
          <Grid.Row>
            <Segment basic>
              <Header as="h1" size="huge">
                <Header.Content>{noticia.titol}</Header.Content>
                <Header.Subheader style={{fontSize: "18px"}}>{noticia.subtitol}</Header.Subheader>
                <Divider hidden style={{margin: "10px"}}/>
                <Header.Subheader>{noticia.data_publicacio && dateLocal(noticia.data_publicacio)}</Header.Subheader>
              </Header>
            </Segment>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Image src={noticia.path_imatge} size='large' floated='right' rounded />
              <div style={{fontSize: "16px"}} dangerouslySetInnerHTML={{ __html: noticia.contingut }} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <List style={{fontSize: "16px"}}>
                {noticia.autor && <List.Item><i>Autor: {noticia.autor}</i></List.Item>}
                {noticia.fotograf && <List.Item><i>Fotògraf: {noticia.fotograf}</i></List.Item>}
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      }
    </>
  )
}
