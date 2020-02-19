import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { createSwitchNavigator } from 'react-navigation'

class Demo extends Component {
    constructor() {
        super()
        this.state =
        {
            data: []
        }
    }
    componentDidMount = async () => {
        fetch('http://192.168.0.123:3000/teamList',
            {
                method: 'GET',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then((response) => response.json()).then((responsejson) => {
                switch (responsejson.Message) {
                    case 'FOUND':
                        var l = responsejson.value;
                        if (l === 0) {
                            alert("No team created")
                            return
                        }
                        var r = responsejson.data;
                        console.log(r)
                        var row = [];
                        for (let i = 0; i < l; i++) {
                            let js = { Name: r[i].name, Players: r[i].players, TagLine: r[i].tagline, Createdby: r[i].createdby }
                            row.push(js);
                        }
                        this.setState(
                            {
                                data: row
                            }
                        )
                        break;
                }
            })
    }
    render() {
        var d = this.state.data;
        var l = d.length;
        var row = [];
        for (let i = 0; i < l; i++)
            row.push(<View style={styles.container}>
                <Text style={styles.whiteText}>Name: {d[i].Name}</Text>
                <Text style={styles.whiteText}>Players: {d[i].Players}</Text>
                <Text style={styles.whiteText}>Tag Line: {d[i].TagLine}</Text>
                <Text style={styles.whiteText}>Created By: {d[i].Createdby}</Text>
            </View>)
        return (
            <ScrollView>
                {row}
            </ScrollView>
        )
    }
}
const ShowTeam = createSwitchNavigator(
    {
        home: { screen: Demo }
    }
)
export default ShowTeam;

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'snow',
        margin: 3
    },
    whiteText:
    {
        color: 'black',
        margin: 1
    },
}
)
