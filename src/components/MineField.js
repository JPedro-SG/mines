import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Field from './Field'

export default props => {
    const rows = props.board.map((rows, r) => {
        
        const columns = rows.map((field, c) => {
            return <Field {...field} key={c} 
                onSelect={e => props.onSelectField(r, c)}
                onOpen={() => props.onOpenField(r,c)}
            />;
        })
        return (
            <View style={{flexDirection: 'row'}} key={r} >
                {columns}
            </View>
        )
    })

    return (
        <View style={styles.container} >{rows}</View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE',
    }
})