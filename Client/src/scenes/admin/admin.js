import React from "react";
import { Text, View , TouchableOpacity, StyleSheet } from 'react-native';

const startDate = new Date(2022, 2, 30);
const endDate = new Date(2022, 2, 30);

const competitionStatus = () => {
    const date = new Date();
    let compText;
    let compButton = null;
    if(date > startDate && date < endDate) {
        compText = <Text style={styles.font}>Competition Currently Active</Text>;
    }
    else if(date < startDate && date < endDate) {
        compText = <Text style={styles.font}>Competition starting soon</Text>;
    }
    else if(startDate == null || endDate == null) {
        compText = <Text style={styles.font}>No Competition Set</Text>;
    }
    else if(date > startDate && date > endDate) {
        compText = <Text style={styles.font}>Previous Competition Ended</Text>;
        compButton = (
            <TouchableOpacity style={styles.resultsBtn}>
                <Text style={styles.btnFont}>View Results</Text>
            </TouchableOpacity>
        );
    }
    else {
        compText = <Text style={styles.font}>No Competition Set</Text>;
    }
    return (
        <View style={{padding: 5, width: "80%", justifyContent: 'space-around', height: '100%'}}>
            {compText}
            {compButton}
        </View>
    );
}

const Admin = () => {
    return (
        <View style={{backgroundColor: '#0155A4', flex: 1, alignItems: "center"}}>
            <Text style={{fontSize: 30, fontWeight: "800", padding: 5, color: 'white'}}>Admin Page</Text>
            <View style={styles.compPage}>
                {competitionStatus()}
            </View>
            <View style={{padding: 10}} />
            <View style={styles.btnPage}>
                    <View style={{padding: 5, width: "80%"}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                            <Text>Start Date: {startDate.toLocaleDateString()}</Text>
                            <Text>End Date: {endDate.toLocaleDateString()}</Text>
                        </View>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btnFont}>Set Competition Dates</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{padding: 5, width: "80%"}}>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btnFont}>Edit Users</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{padding: 5, width: "80%"}}>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btnFont}>Edit Milestones</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{padding: 5, width: "80%"}}>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btnFont}>Edit Activities</Text>
                        </TouchableOpacity>
                    </View>
            </View>
            <View style={{padding: 5}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    page:{
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 10,
        flex: 1, 
        alignItems: "center"
    },
    btnPage:{
        flex: 6,
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center', 
        justifyContent: 'space-around',
    },
    compPage:{
        flex: 1,
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center'
    },
    btn:{
        backgroundColor: '#0155A4',
        width: "100%",
        height: 35,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    resultsBtn:{
        backgroundColor: 'green',
        width: "100%",
        height: 35,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    btnFont:{
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: '600', // i.e semi-bold
        fontSize: 18
    },
    font:{
        height: 35,
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: '600', // i.e semi-bold
        fontSize: 18
    },
});

export default Admin;