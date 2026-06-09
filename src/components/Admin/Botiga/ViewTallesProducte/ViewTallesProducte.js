import React from "react";
import "./ViewTallesProducte.scss";
import { Grid, Image, Segment } from "semantic-ui-react";
import { BASE_API } from "../../../../utils/constants";
export const ViewTallesProducte = (props) => {
  const { producte } = props;

  const imatge =
    producte.imatges_producte.length > 0
      ? `${BASE_API}${producte.imatges_producte[0].path_imatge}`
      : `${BASE_API}/uploads/User/avatar.png`;
  return (
    <Grid columns={2} divided className="viewtalles-producte">
      <Grid.Row>
        <Grid.Column>
          <Image src={imatge} />
        </Grid.Column>
        <Grid.Column>
          {producte.talles_producte.map((talla, index) => {
            return (
              <>
                <Grid columns={2} divided>
                  <Grid.Column>
                    <Segment>{talla.talla.nom}</Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment>{talla.quantitat}</Segment>
                  </Grid.Column>
                </Grid>
              </>
            );
          })}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
