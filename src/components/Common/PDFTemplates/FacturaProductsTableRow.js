import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#f39420'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        fontSize: 12,
    },
    description: {
        width: '50%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });


const FacturaProductsTableRow = ({items, user}) => {
    const rows = items?.map( item => 
        <View style={styles.row} key={item.producte.id.toString()}>
            <Text style={styles.description}>{item.producte.nom}</Text>
            <Text style={styles.qty}>{item.quantitat}</Text>
            <Text style={styles.rate}>{user.is_soci ? item.producte.preu_soci : item.producte.preu}</Text>
            <Text style={styles.amount}>{(item.quantitat * (user.is_soci ? item.producte.preu_soci : item.producte.preu)).toFixed(2)} €</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
export default FacturaProductsTableRow