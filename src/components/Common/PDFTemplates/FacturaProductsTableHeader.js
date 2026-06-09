import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#f39420'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: borderColor,
        backgroundColor: borderColor,
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
        fontSize: 12,
    },
    description: {
        width: '50%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    amount: {
        width: '15%'
    },
  });

  const FacturaProductsTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.description}>Descripció</Text>
        <Text style={styles.qty}>Quantitat</Text>
        <Text style={styles.rate}>Unitat</Text>
        <Text style={styles.amount}>Preu</Text>
    </View>
  );
  
  export default FacturaProductsTableHeader