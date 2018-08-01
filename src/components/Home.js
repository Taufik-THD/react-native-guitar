import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, Image,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/styles';
import { generateChords } from '../store/actions';

class Home extends Component {
  state = {
    navigations: ['ChordPractice', 'Scale', 'Quiz', 'Tuning'],
  };

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.props.getChords();
  }

  navigateTo = destination => () => {
    const { navigation } = this.props;
    navigation.navigate(destination);
  };

  render() {
    const { navigations } = this.state;
    return (
      <View style={style.container}>
        <TouchableOpacity style={style.menuBox} onPress={this.navigateTo('ChordPractice')}>
          <Icon style={style.actionButtonIcon} name="md-keypad" />
          <Text style={style.info}>
            {'Chords'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.menuBox} onPress={this.navigateTo('Scale')}>
          <Icon style={style.actionButtonIcon} name="ios-git-merge" />
          <Text style={style.info}>
Scales
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.menuBox} onPress={this.navigateTo('Quiz')}>
          <Icon style={style.actionButtonIcon} name="ios-play" />
          <Text style={style.info}>
Quiz
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.menuBox} onPress={this.navigateTo('Tuning')}>
          <Icon style={style.actionButtonIcon} name="ios-radio" />
          <Text style={style.info}>
            {'Tunner'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  viewMenu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#383f4c',
  },
  descMenu: {
    color: 'white',
    width: 100,
    textAlign: 'center',
    paddingTop: 5,
  },
  touchBtn: {
    width: 60,
    height: 60,
    borderRadius: 60,
    borderColor: '#ff6f00',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonIcon: {
    fontSize: 70,
    height: 100,
    color: '#ff6f00',
    textAlign: 'center',
  },
  container: {
    padding: 15,
    paddingTop: 50,
    paddingBottom: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#22262d',
  },
  menuBox: {
    backgroundColor: '#263238',
    width: 120,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
    marginVertical: 65,
    borderRadius: 15,
  },
  icon: {
    width: 100,
    height: 100,
  },
  info: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

const mapDispatchToProps = dispatch => ({
  getChords: () => dispatch(generateChords()),
});

export default connect(
  null,
  mapDispatchToProps,
)(Home);
