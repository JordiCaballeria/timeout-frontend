import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        padding: '10px',
        border: "1px solid #f39420",
        borderRadius: "10px",
    },
    billTo: {
        paddingBottom: 5,
        fontFamily: 'Helvetica-Oblique',
        fontSize: 14,
    },
    data: {
        fontSize: 12,
        fontStyle: 'bold',
        padding: '2px 0px',
    },
});


const ClientInformation = ({ user }) => (
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Comprat per:</Text>
        <Text style={styles.data}>{user?.first_name} {user?.last_name}</Text>
        <Text style={styles.data}>{user?.address}</Text>
        <Text style={styles.data}>{user?.email}</Text>
    </View>
);

export default ClientInformation