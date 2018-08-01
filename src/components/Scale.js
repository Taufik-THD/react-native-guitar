import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import { connect } from 'react-redux';

import Orientation from 'react-native-orientation';
import Recording from 'react-native-recording';
import Tuner from './TuningProcess/Tuner';
import Button from './componentScale/Button';
import { Initial } from './componentScale/scales';
import { setTuning } from '../store/actions';
import {
  G, A, B, C, D, E, F, F2, G2, A2, C2, D2,
} from './componentScale/scales';
import {
  e, a, g, f, b, c, d, f2, g2, a2, c2, d2,
} from './componentScale/elementScales';

const remote = 'https://storage.googleapis.com/upload-portofolio/1532989580931.jpg!d';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardDisplay: Initial,
      note: true,
    };

    this._handleSetBoard = this._handleSetBoard.bind(this);
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    Orientation.lockToLandscape();
    const { checkSound } = this.props;
    const tuner = new Tuner();

    tuner.start();
    tuner.onNoteDetected = (note) => {
      if (this.state.boardDisplay !== Initial) {
        checkSound(note);
      }
    };
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
    Recording.stop();
  }

  _handleSetBoard = value => this.setState({ boardDisplay: value })

  _handleBoardDisplay = (boardName, index) => {
    const { getScales } = this.props;
    const { boardDisplay } = this.state;
    switch (boardDisplay) {
      case E:
        if (
          (boardName === 2 && ((index === 6 && getScales[0].hitted) || (index === 8 && getScales[1].hitted)))
          || (boardName === 3 && ((index === 5 && getScales[2].hitted) || (index === 6 && getScales[3].hitted) || (index === 8 && getScales[4].hitted)))
          || (boardName === 4 && ((index === 5 && getScales[5].hitted) || (index === 7 && getScales[6].hitted) || (index === 8 && getScales[7].hitted)))
        ) {
          return 'red';
        }
        return 'transparent';
      case G:
        if (
          (boardName === 1 && ((index === 2 && getScales[0].hitted) || (index === 4 && getScales[1].hitted)))
          || (boardName === 2 && ((index === 1 && getScales[2].hitted) || (index === 2 && getScales[3].hitted) || (index === 4 && getScales[4].hitted)))
          || (boardName === 3 && ((index === 1 && getScales[5].hitted) || (index === 3 && getScales[6].hitted) || (index === 4 && getScales[7].hitted)))
        ) {
          return 'red';
        }
        return 'transparent';
      case F:
        if (
          (boardName === 2 && ((index === 7 && getScales[0].hitted) || (index === 9 && getScales[1].hitted)))
          || (boardName === 3 && ((index === 6 && getScales[2].hitted) || (index === 7 && getScales[3].hitted) || (index === 9 && getScales[4].hitted)))
          || (boardName === 4 && ((index === 6 && getScales[5].hitted) || (index === 8 && getScales[6].hitted) || (index === 9 && getScales[7].hitted)))
        ) {
          return 'red';
        }
        return 'transparent';
      case A:
        if (
          (boardName === 1 && ((index === 4 && getScales[0].hitted) || (index === 6 && getScales[1].hitted)))
          || (boardName === 2 && ((index === 3 && getScales[2].hitted) || (index === 4 && getScales[3].hitted) || (index === 6 && getScales[4].hitted)))
          || (boardName === 3 && ((index === 3 && getScales[5].hitted) || (index === 5 && getScales[6].hitted) || (index === 6 && getScales[7].hitted)))
        ) {
          return 'red';
        }
        return 'transparent';
      case B:
        if (
          (boardName === 1 && ((index === 6 && getScales[0].hitted) || (index === 8 && getScales[1].hitted)))
          || (boardName === 2 && ((index === 5 && getScales[2].hitted) || (index === 6 && getScales[3].hitted) || (index === 8 && getScales[4].hitted)))
          || (boardName === 3 && ((index === 5 && getScales[5].hitted) || (index === 7 && getScales[6].hitted) || (index === 8 && getScales[7].hitted)))
        ) {
          return 'red';
        }
        return 'transparent';
      case C:
        if (
          (boardName === 2 && ((index === 2 && getScales[0].hitted) || (index === 4 && getScales[1].hitted)))
          || (boardName === 3 && ((index === 1 && getScales[2].hitted) || (index === 2 && getScales[3].hitted) || (index === 4 && getScales[4].hitted)))
          || (boardName === 4 && ((index === 1 && getScales[5].hitted) || (index === 3 && getScales[6].hitted) || (index === 4 && getScales[7].hitted)))
        ) {
          return 'red';
        }
        return 'transparent';
      case D:
        if (
          (boardName === 2 && ((index === 5 && getScales[0].hitted) || (index === 7 && getScales[1].hitted)))
          || (boardName === 3 && ((index === 4 && getScales[2].hitted) || (index === 5 && getScales[3].hitted) || (index === 7 && getScales[4].hitted)))
          || (boardName === 4 && ((index === 4 && getScales[5].hitted) || (index === 6 && getScales[6].hitted) || (index === 7 && getScales[7].hitted)))
        ) {
          return 'red';
        }
        return 'transparent';
      case F2:
        if (
          (boardName === 1 && ((index === 2 && getScales[0].hitted) || (index === 4 && getScales[1].hitted)))
          || (boardName === 2 && ((index === 1 && getScales[2].hitted) || (index === 2 && getScales[3].hitted) || (index === 4 && getScales[4].hitted)))
          || (boardName === 3 && ((index === 1 && getScales[5].hitted) || (index === 3 && getScales[6].hitted) || (index === 4 && getScales[7].hitted)))
        ) {
          return 'red';
        }
        return 'transparent';
      case G2:
        if (
          (boardName === 1 && ((index === 4 && getScales[0].hitted) || (index === 6 && getScales[1].hitted)))
          || (boardName === 2 && ((index === 3 && getScales[2].hitted) || (index === 4 && getScales[3].hitted) || (index === 6 && getScales[4].hitted)))
          || (boardName === 3 && ((index === 3 && getScales[5].hitted) || (index === 5 && getScales[6].hitted) || (index === 6 && getScales[7].hitted)))
        ) {
          return 'red';
        }
        return 'transparent';
      case A2:
        if (
          (boardName === 1 && ((index === 6 && getScales[0].hitted) || (index === 8 && getScales[1].hitted)))
          || (boardName === 2 && ((index === 5 && getScales[2].hitted) || (index === 6 && getScales[3].hitted) || (index === 8 && getScales[4].hitted)))
          || (boardName === 3 && ((index === 5 && getScales[5].hitted) || (index === 7 && getScales[6].hitted) || (index === 8 && getScales[7].hitted)))
        ) {
          return 'red';
        }
        return 'transparent';
      case C2:
        if (
          (boardName === 2 && ((index === 4 && getScales[0].hitted) || (index === 6 && getScales[1].hitted)))
          || (boardName === 3 && ((index === 3 && getScales[2].hitted) || (index === 4 && getScales[3].hitted) || (index === 6 && getScales[4].hitted)))
          || (boardName === 4 && ((index === 3 && getScales[5].hitted) || (index === 5 && getScales[6].hitted) || (index === 6 && getScales[7].hitted)))
        ) {
          return 'red';
        }
        return 'transparent';
      case D2:
        if (
          (boardName === 2 && ((index === 5 && getScales[0].hitted) || (index === 7 && getScales[1].hitted)))
          || (boardName === 3 && ((index === 4 && getScales[2].hitted) || (index === 5 && getScales[3].hitted) || (index === 7 && getScales[4].hitted)))
          || (boardName === 4 && ((index === 4 && getScales[5].hitted) || (index === 6 && getScales[6].hitted) || (index === 7 && getScales[7].hitted)))
        ) {
          return 'red';
        }
        return 'transparent';
      default:
        return 'transparent';
    }
  }

  board() {
    return this.props.board;
  }

  board_one() {
    const { note, boardDisplay } = this.state;

    return (
      boardDisplay[0].map((col, i) => (
        <View
          style={[styles.newButton, {
            backgroundColor: this._handleBoardDisplay(1, i),
          }]}
          key={i}
        >
          <Text style={{ color: 'red', fontSize: 28 }}>
            {col}
          </Text>
        </View>
      ))
    );
  }

  board_two() {
    const { note, boardDisplay } = this.state;

    return (
      boardDisplay[1].map((col, i) => (
        <View
          style={[styles.newButton, {
            backgroundColor: this._handleBoardDisplay(2, i),
          }]}
          key={i}
        >
          <Text style={{ color: 'red', fontSize: 28 }}>
            {col}
          </Text>
        </View>
      ))
    );
  }

  board_three() {
    const { getScales } = this.props;
    const { note, boardDisplay } = this.state;

    return (
      boardDisplay[2].map((col, i) => (
        <View
          style={[styles.newButton, {
            backgroundColor: this._handleBoardDisplay(3, i),
          }]}
          key={i}
        >
          <Text style={{ color: 'red', fontSize: 28 }}>
            {col}
          </Text>
        </View>
      ))
    );
  }

  board_four() {
    const { getScales } = this.props;
    const { note, boardDisplay } = this.state;

    return (
      boardDisplay[3].map((col, i) => (
        <View
          style={[styles.newButton, {
            backgroundColor: this._handleBoardDisplay(4, i),
          }]}
          key={i}
        >
          <Text style={{ color: 'red', fontSize: 28 }}>
            {col}
          </Text>
        </View>
      ))
    );
  }

  render() {
    return (
      <View style={styles.scale}>
        <Image
          style={styles.fixed}
          source={{ uri: remote }}
        />
        <View style={styles.container}>
          <View style={[styles.rowAlpha, styles.topOne]}>
            <Text style={{ fontWeight: 'bold', paddingRight: 15, color: 'transparent' }}>
              {' '}
_
              {' '}
            </Text>
            { this.board_one() }
          </View>
          <View style={[styles.rowAlpha, styles.topTwo]}>
            <Text style={{ fontWeight: 'bold', paddingRight: 15, color: 'transparent' }}>
              {' '}
_
              {' '}
            </Text>
            { this.board_two() }
          </View>
          <View style={[styles.rowAlpha, styles.topThree]}>
            <Text style={{ fontWeight: 'bold', paddingRight: 15, color: 'transparent' }}>
              {' '}
_
              {' '}
            </Text>
            { this.board_three() }
          </View>
          <View style={[styles.rowAlpha, styles.topFour]}>
            <Text style={{ fontWeight: 'bold', paddingRight: 15, color: 'transparent' }}>
              {' '}
_
              {' '}
            </Text>
            { this.board_four() }
          </View>
        </View>
        <View style={styles.button}>
          <Button handleSetBoard={value => this._handleSetBoard(value)} />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  newButton: {
    width: 53,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: 'transparent'
  },
  btnFlex: {
    flex: 1,
    flexDirection: 'row',
  },
  btn: {
    width: 40,
    height: 20,
  },
  rowAlpha: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    marginTop: 5,
    left: 60,
  },
  topOne: {
    top: -10,
  },
  topTwo: {
    top: 27,
  },
  topThree: {
    top: 67,
  },
  topFour: {
    top: 108,
  },
  topFive: {
    top: 145,
  },
  topSix: {
    top: 185,
  },
  scale: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#191717',
  },
  fixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginVertical: 10,
    marginHorizontal: 70,
    height: 220,
  },
  button: {
    bottom: 50,
  },
});

const mapStateToProps = state => ({
  getScales: state.scales,
});

const mapDispatchToProps = dispatch => ({
  checkSound: note => dispatch(setTuning(note)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
