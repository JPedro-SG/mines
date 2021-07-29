import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Alert
} from 'react-native';

import params from './src/params'
import MineField from './src/components/MineField'
import Header from './src/components/Header'
import LevelSelection from './src/screens/LevelSelection'
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed
 } from './src/functions'

const App = () => {

  const minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }
 
  const createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(rows, cols, minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false 
    }
  }

  const [states, setStates] = useState(createState())

  const onOpenField = (row, column) => {
    const board = cloneBoard(states.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if(lost) {
      showMines(board)
      Alert.alert('Perdeuuuuu!', 'Que buuuuro!')
    }
    if (won) {
      Alert.alert('Parabéns', 'Você Venceu!')
    }

    setStates({...states, board: board, lost: lost, won: won, showLevelSelection: false,})
    // console.log(board)
  }

  const onSelectField = (row, column) => {
    const board = cloneBoard(states.board)
    invertFlag(board, row, column)
    const won = wonGame(board)

    if(won) Alert.alert('Parabéns', "Você Venceu!")

    setStates({...states, board: board, won: won})
  }

  const onLevelSelected = (level) => {
    params.difficultLevel = level
    setStates({...createState()})
  }
  
  return ( 
    <View style={styles.container}>
      <LevelSelection isVisible={states.showLevelSelection}
        onLevelSelected={onLevelSelected}
        onCancel={() => setStates({...states, showLevelSelection: false})}
      />
      <Header flagsLeft={minesAmount() - flagsUsed(states.board)} 
        onNewGame={() => setStates({...createState()})}
        onFlagPress={() => setStates({...states, showLevelSelection: true})}
      />
      <View style={styles.board} >
        <MineField onSelectField={onSelectField} board={states.board} 
          onOpenField={onOpenField}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});
 
export default App;
 