import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    invoiceConatiner: {
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: "10px",
        border: "1px solid #0f903e",
        padding: '10px',
    },
    invoiceNoContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: '5px',
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
    },
    label: {
        fontSize: 12,
        width: 70
    }

});


const FacturaNo = ({ tipusPagament }) => (
    <Fragment>
        <View style={styles.invoiceConatiner}>
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.label}>Data: </Text>
                <Text style={styles.invoiceDate}>{new Date().toLocaleDateString()}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.label}>Pagament: </Text>
                <Text style={styles.invoiceDate}>Stripe</Text>
            </View >
        </View>
    </Fragment>
);

export default FacturaNo