import React, { Component } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

import { setScales } from '../../store/actions';

import {
  G, A, B, C, D, E, F, F2, G2, A2, C2, D2, Initial,
} from './scales';
import {
  e, f, g, a, b, c, d, f2, g2, a2, c2, d2,
} from './elementScales';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardDisplay: [['E', 'F', 'G', 'A', 'B', 'C', 'D'], ['F#', 'G#', 'A#', 'C#', 'D#']],
    };

    this.coordinate = this.coordinate.bind(this);
  }

  componentDidMount() {
    this.props.generateBoard;
  }

  coordinate(board, index) {
    const { handleSetBoard, addScales } = this.props;
    let boardActived;

    switch (index) {
      case 0:
        if (board === 1) {
          boardActived = E;
          addScales(e);
        } else if (board === 2) {
          boardActived = F2;
          addScales(f2);
        }
        break;
      case 1:
        if (board == 1) {
          boardActived = F;
          addScales(f);
        } else if (board == 2) {
          boardActived = G2;
          addScales(g2);
        }
        break;
      case 2:
        if (board == 1) {
          boardActived = G;
          addScales(g);
        } else if (board == 2) {
          boardActived = A2;
          addScales(a2);
        }
        break;
      case 3:
        if (board == 1) {
          boardActived = A;
          addScales(a);
        } else if (board == 2) {
          boardActived = C2;
          addScales(c2);
        }
        break;
      case 4:
        if (board == 1) {
          boardActived = B;
          addScales(b);
        } else if (board == 2) {
          boardActived = D2;
          addScales(d2);
        }
        break;
      case 5:
        boardActived = C;
        addScales(c);
        break;
      case 6:
        boardActived = D;
        addScales(d);
        break;
      default:
        boardActived = Initial;
    }

    return handleSetBoard(boardActived);
  }

  board() {
    return this.props.board;
  }

  board_one() {
    return this.state.boardDisplay[0].map((col, i) => (
      <TouchableOpacity onPress={() => this.coordinate(1, i)} style={styles.newButton} key={i}>
        <Text style={{ color: 'white' }}>
          {col}
        </Text>
      </TouchableOpacity>
    ));
  }

  board_two() {
    return this.state.boardDisplay[1].map((col, i) => (
      <TouchableOpacity onPress={() => this.coordinate(2, i)} style={styles.newButton} key={i}>
        <Text style={{ color: 'white' }}>
          {col}
        </Text>
      </TouchableOpacity>
    ));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.state.touchrow}
        </Text>
        <View style={[styles.rowAlpha, styles.topOne]}>
          {this.board_one()}
        </View>
        <View style={[styles.rowAlpha, styles.topTwo]}>
          {this.board_two()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  newButton: {
    width: 80,
    height: 30,
    backgroundColor: '#37474f',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    margin: 2,
    bottom: 5,
  },
  flexContainer: {
    height: 200,
    width: 500,
  },
  btnFlex: {
    flex: 1,
    flexDirection: 'row',
  },
  btn: {
    width: 20,
    height: 20,
  },
  container: {
    flex: 1,
    top: 200,
  },
  gamestatus: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
  rowAlpha: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
  topOne: {
    bottom: 235,
  },
  topTwo: {
    bottom: 200,
  },
  instructions: {
    color: '#225344',
    marginLeft: 24,
    marginRight: 24,
    fontSize: 12,
    lineHeight: 18,
  },
  boardicon: {
    alignItems: 'center',
    marginTop: 20,
  },
});

const mapDispatchToProps = dispatch => ({
  addScales: scales => dispatch(setScales(scales)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Board);
