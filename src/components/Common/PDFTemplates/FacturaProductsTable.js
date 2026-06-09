import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import FacturaProductsTableHeader from './FacturaProductsTableHeader';
import FacturaProductsTableRow from './FacturaProductsTableRow';
import FacturaProductsTableSpace from './FacturaProductsTableSpace';
import FacturaProductsTableFooter from './FacturaProductsTableFooter';

const tableRowsCount = 11;

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#f39420',
    },
});

  const FacturaProductsTable = ({detalls, preuTotal, user}) => (
    <View style={styles.tableContainer}>
        <FacturaProductsTableHeader />
        <FacturaProductsTableRow items={detalls} user={user} />
        <FacturaProductsTableSpace rowsCount={ tableRowsCount - detalls?.length} />
        <FacturaProductsTableFooter items={detalls} preuTotal={preuTotal} />
    </View>
  );

  export default FacturaProductsTable