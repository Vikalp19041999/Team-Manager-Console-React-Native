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
        fetch('http://192.168.0.123:3000/playerList',
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
                        if(l===0){
                            alert("No players created")
                            return
                        }
                        var r = responsejson.data;
                        console.log(r)
                        var row = [];
                        for (let i = 0; i < l; i++) {
                            let js = { Player: r[i].name, Team: r[i].team_id, Skill: r[i].skill }
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
                <Text style={styles.whiteText}>Player: {d[i].Player}</Text>
                <Text style={styles.whiteText}>Team: {d[i].Team}</Text>
                <Text style={styles.whiteText}>Skill: {d[i].Skill}</Text>
            </View>)
        return (
            <ScrollView>
                {row}
            </ScrollView>
        )
    }
}
const ShowPlayer = createSwitchNavigator(
    {
        home: { screen: Demo }
    }
)
export default ShowPlayer;

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
