import React, { Component } from 'react';
import playername from '../../assets/player.png';
import teamname from '../../assets/team.png';
import CreatePlayer from '../createPlayer';
import CreateTeam from '../createTeam';
import DeletePlayer from '../deletePlayer';
import DeleteTeam from '../deleteTeam';
import ShowPlayer from '../viewPlayer';
import ShowTeam from '../viewTeam'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';

class Demo extends Component {
    render() {
        return (
            <View >
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("TeamSignUp")}>
                        <View style={styles.column} >
                            <Image style={styles.logo} source={teamname} />
                            <Text style={styles.text}>Create Team</Text>
                        </View>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("PlayerSignUp")}>
                        <View style={styles.column}>
                            <Image style={styles.logo} source={playername} />
                            <Text style={styles.text}>Create Player</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("TeamDelete")}>
                        <View style={styles.column}>
                            <Image style={styles.logo} source={teamname} />
                            <Text style={styles.text}>Delete Team</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("PlayerDelete")}>
                        <View style={styles.column}>
                            <Image style={styles.logo} source={playername} />
                            <Text style={styles.text}>Delete Player</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ViewTeam")}>
                        <View style={styles.column}>
                            <Image style={styles.logo} source={teamname} />
                            <Text style={styles.text}>View Team</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ViewPlayer")}>
                        <View style={styles.column}>
                            <Image style={styles.logo} source={playername} />
                            <Text style={styles.text}>View Player</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const Welcome = createSwitchNavigator(
    {
        home: { screen: Demo },
        PlayerSignUp: { screen: CreatePlayer },
        TeamSignUp: { screen: CreateTeam },
        PlayerDelete: { screen: DeletePlayer },
        TeamDelete: { screen: DeleteTeam },
        ViewPlayer: { screen: ShowPlayer },
        ViewTeam: { screen: ShowTeam }
    }
)
export default Welcome

const styles = StyleSheet.create({
    logo: {
        width: 180,
        height: 180,
        marginTop: 10
    },
    text: {
        fontWeight: "bold",
        marginTop: 10,
        fontSize: 18
    },
    row: {
        flexDirection: "row",
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 30
    },
})