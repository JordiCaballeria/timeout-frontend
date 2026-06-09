import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Font,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import FacturaNo from './FacturaNo'
import ClientInformation from "./ClientInformation";
import FacturaProductsTable from "./FacturaProductsTable";

const styles = StyleSheet.create({
  logo: {
    width: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 15,
    paddingLeft: 5
  },
  logoContainer: {
    flexDirection: 'row',
    verticalAlign: "baseline",
},
});

Font.register({
  family: "Open Sans",
  src: "https://fonts.gstatic.com/s/opensans/v23/mem8YaGs126MiZpBA-UFW50e.ttf",
});

export const FacturaProductesPdf = (props) => {
  const { detalls, user, tipusPagament, preuTotal } = props;
  
  return (
    <Document>
      <Page size="A4">
        <View style={{ padding: 20 }}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} src="https://i.postimg.cc/BvGvnW6J/SRCtr.png" />
            <Text style={styles.title}>Sabadell Rugby Club</Text>
          </View>
          <FacturaNo tipusPagament={tipusPagament} />
          <ClientInformation user={user} />
          <FacturaProductsTable user={user} detalls={detalls} preuTotal={preuTotal} />
        </View>
      </Page>
    </Document>
  );
};
