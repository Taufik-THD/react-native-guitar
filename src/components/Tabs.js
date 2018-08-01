import React, { Component } from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import Orientation from 'react-native-orientation';
import { Table, TableWrapper, Cell } from 'react-native-table-component';
import Promise from 'bluebird';
import Icon from 'react-native-vector-icons/Ionicons';
import Recording from 'react-native-recording';
import Tuner from './TuningProcess/Tuner';
import board from '../helpers/fretboard';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {
        name: ' ',
        octave: 0,
        frequency: 440,
      },
      fretData: [],
      musics: {
        title: '',
        chords: [],
        tempo: 0,
      },
      btnActive: false,
    };
    this.setStateAsync = Promise.promisify(this.setState);
    this.handleActionStart = this.handleActionStart.bind(this);
    this.handleActionStop = this.handleActionStop.bind(this);
    this.tuner = new Tuner();
  }

  componentDidMount() {
    Orientation.lockToLandscape();
    const chords = ['C3', 'E3', 'C3', 'E3', 'F3', 'G3', 'G3', 'B3', 'C4', 'B3', 'C4', 'B3', 'G3'];
    const tempo = 3600;
    const tempoMSec = (tempo / 3600) * 1000;
    this.setState({
      musics: {
        title: 'Gundul Pacul',
        chords: [...chords],
        tempo: tempoMSec,
      },
    });
    // const newArray = [];
    // for (let i = 0; i < board.fretBoard.length; i++) {
    //   const newCol = [];
    //   for (let j = 0; j < board.fretBoard[i].length; j++) {
    //     if (chords.indexOf(board.fretBoard[i][j]) !== -1 || j === 0) {
    //       newCol.push(board.fretBoard[i][j]);
    //     } else {
    //       newCol.push(' ');
    //     }
    //   }
    //   newArray.push(newCol);
    // }
    const newArray = this._initiateBoard();
    this.setState({
      fretData: [...newArray],
    });
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
  }

  _initiateBoard() {
    const newArray = [];
    for (let i = 0; i < board.fretBoard.length; i++) {
      const newCol = [];
      for (let j = 0; j < board.fretBoard[i].length; j++) {
        newCol.push(' ');
      }
      newArray.push(newCol);
    }
    return newArray;
  }

  _update(note) {
    // const { state } = this;
    this.setState({ note });
    // for (let i = 0; i < board.fretBoard.length; i++) {
    //   for (let j = 0; j < board.fretBoard[i].length; j++) {
    //     if (board.fretBoard[i][j] === state.note.name) {
    //       const play = {
    //         chord: board.fretBoard[i][j],
    //         index: [i, j],
    //       };
    //       this.setStateAsync({
    //         currChord: { ...play },
    //       });
    //     }
    //   }
    // }
  }

  handleActionStop() {
    const state = this;
    Recording.stop();
    state.setState(prevState => ({ btnActive: !prevState.btnActive }));
    state.setState({
      note: {
        ...{
          name: '',
          octave: 0,
          frequency: 440,
        },
      },
    });
  }

  handleActionStart() {
    const state = this;
    // let isActive = false;
    // if (state.btnActive) {
    //   isActive = false;
    // } else {
    //   isActive = true;
    // }
    this.displayCurrentChord();
    state.tuner.start();
    state.tuner.onNoteDetected = (note) => {
      if (this._lastNoteName !== note.name) {
        state._update(note);
      } else {
        state._lastNoteName = note.name;
      }
    };
    state.setState(prevState => ({ btnActive: !prevState.btnActive }));
  }

  async displayCurrentChord() {
    const { state } = this;
    const musicsChords = state.musics.chords;
    const newFretData = state.fretData;
    const chordsLength = musicsChords.length;
    const currTempo = state.musics.tempo;
    let counter = 0;
    this._interval = setInterval(async () => {
      if (counter >= chordsLength) {
        clearInterval(this._interval);
        this.handleActionStop();
      }
      for (let i = 0; i < board.fretBoard.length; i++) {
        for (let j = 0; j < board.fretBoard[i].length; j++) {
          if (board.fretBoard[i][j] === musicsChords[counter]) {
            newFretData[i][j] = musicsChords[counter];
          } else {
            newFretData[i][j] = ' ';
          }
        }
      }
      await this.setStateAsync({
        fretData: newFretData,
      });
      counter++;
    }, currTempo);
  }

  setDelay(currChord) {
    const { state } = this;
    const self = this;
    const newFretData = [...state.fretData];
    self._timeoutDetecting = setTimeout(async () => {
      for (let i = 0; i < board.fretBoard.length; i++) {
        for (let j = 0; j < board.fretBoard[i].length; j++) {
          if (board.fretBoard[i][j] === currChord) {
            newFretData[i][j] = currChord;
          }
        }
      }
      await self.setStateAsync({
        fretData: newFretData,
      });
      self._timeoutDetecting = null;
    }, 1000);
  }

  render() {
    const { state } = this;
    const element = (data, index, name) => (
      <TouchableOpacity style={name === data ? styles.btnHit : styles.btn}>
        <View>
          <Text style={name === data ? styles.btnTextHit : styles.btnText}>
            {data}
          </Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderColor: '#000000' }}>
          {state.fretData.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              {rowData.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  data={
                    cellData.trim() && cellIndex !== 0
                      ? element(cellData, index, state.note.name + state.note.octave)
                      : cellData
                  }
                  textStyle={styles.text}
                />
              ))}
            </TableWrapper>
          ))}
        </Table>
        <View style={styles.viewSong}>
          <TouchableOpacity
            onPress={state.btnActive ? this.handleActionStop : this.handleActionStart}
            style={styles.btnPlay}
          >
            <View>
              {state.btnActive ? (
                <Icon style={styles.actionButtonIcon} name="ios-pause" />
              ) : (
                <Icon style={styles.actionButtonIcon} name="ios-play" />
              )}
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.centerText}>
              {state.note.name && state.note.octave ? state.note.name + state.note.octave : ''}
            </Text>
            <Text style={styles.centerText}>
              {state.musics.title}
            </Text>
            <Text style={styles.centerText}>
              {state.musics.chords.join('-')}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 30,
    backgroundColor: '#263238',
  },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  hitChord: { backgroundColor: '#FF0000' },
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFF1C1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewSong: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 5,
    color: '#fff',
  },
  centerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  btn: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderColor: '#000',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPlay: {
    width: 50,
    height: 50,
    backgroundColor: '#ff6f00',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: { textAlign: 'center', color: '#000', fontSize: 12 },
  btnHit: {
    width: 30,
    height: 30,
    backgroundColor: '#78B7BB',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTextHit: { textAlign: 'center', color: '#fff', fontSize: 12 },
  actionButtonIcon: {
    fontSize: 45,
    height: 45,
    color: '#263238',
    textAlign: 'center',
  },
});
export default Tabs;
