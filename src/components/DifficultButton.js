import React from 'react'
import { 
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'

export default props => {
    let label = ""
    let stylesByDifficult = [styles.button]
    if(props.easy) {
        stylesByDifficult.push(styles.bgEasy)
        label = "Fácil"
    }
    if(props.normal) {
        stylesByDifficult.push(styles.bgNormal)
        label = "Intermediário"
    }
    if(props.hard) {
        stylesByDifficult.push(styles.bgHard)
        label = "Dificíl"
    }
    return (
        <TouchableOpacity 
            style={stylesByDifficult} 
            onPress={() => props.onLevelSelected(0.1)}
        >
            <Text style={styles.buttonLabel}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonLabel: {
        fontSize: 20,
        color: "#EEE",
        fontWeight: 'bold',
    },
    bgEasy: {
        backgroundColor: '#49b65d'
    },
    bgNormal: {
        backgroundColor: '#2765F7',
    },
    bgHard: {
        backgroundColor: '#F26337',
    } 
})