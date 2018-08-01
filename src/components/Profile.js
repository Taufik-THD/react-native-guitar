import React, { Component } from 'react';
import {
  View, Text, StyleSheet, StatusBar, AsyncStorage,
} from 'react-native';
import { Avatar, Badge } from 'react-native-elements';
import { connect } from 'react-redux';
import { Circle } from 'react-native-progress';

import { setUser } from '../store/actions';
import styles from '../styles/styles';

class Profile extends Component {
  state = {
    percentage: 0,
  };

  componentDidMount = async () => {
    const { navigation } = this.props;
    this.navigationListener = navigation.addListener('willFocus', this._willFocusListener);
  };

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (user.fullname) {
      this.countProgress(user.courses.practice);
    }
  }

  componentWillUnmount() {
    this.navigationListener.remove();
  }

  _willFocusListener = () => {
    const { navigation, user } = this.props;
    if (!user.fullname) {
      navigation.replace('Login');
    } else {
      this.countProgress(user.courses.practice);
    }
  };

  countProgress = (course) => {
    const coursePractice = course;
    const initialProgress = Array(10).fill({ isCompleted: false });

    let completedCourseCount;
    let newPercentage;

    if (coursePractice && coursePractice.length > 0) {
      completedCourseCount = coursePractice.reduce((sum, note) => sum + note.score, 0);
      newPercentage = (completedCourseCount / (coursePractice.length * 100)) * 100;
    }

    if (newPercentage) {
      initialProgress.forEach((el, i) => {
        if (i <= newPercentage / 10) {
          initialProgress[i] = { isCompleted: true };
        }
      });
    }

    this.setState({
      percentage: newPercentage ? Math.round(newPercentage) : 0,
    });
  };

  logout = async () => {
    const { logout, navigation } = this.props;
    const initialUser = {
      fullname: '',
      email: '',
      courses: {
        practice: [],
      },
    };
    logout(initialUser);
    navigation.replace('Login');
    await AsyncStorage.removeItem('token');
  };

  render() {
    const { user } = this.props;
    const { percentage } = this.state;
    const avatarUri = 'https://t3.ftcdn.net/jpg/00/64/67/80/240_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg';

    return (
      <View style={styles.container}>
        <StatusBar />
        <View style={localStyles.userProfileContainer}>
          <View style={{ flex: 1 }}>
            <Avatar
              source={{ uri: avatarUri }}
              containerStyle={localStyles.avatarContainer}
              rounded
              medium
            />
            <Badge
              value={user.fullname}
              textStyle={{ ...localStyles.text, textAlign: 'left' }}
              containerStyle={{ ...localStyles.textContainer, marginTop: 10 }}
            />
            {user.email ? (
              <Text style={{ ...localStyles.textCaption, textAlign: 'left', marginLeft: 10 }}>
                {user.email.toLowerCase()}
              </Text>
            ) : null}
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Badge
              value="Logout"
              textStyle={{ ...localStyles.text, textAlign: 'right', fontSize: 14 }}
              containerStyle={{
                backgroundColor: '#C70039',
                marginRight: 10,
                marginTop: 10,
                width: 80,
                height: 20,
              }}
              onPress={this.logout}
            />
          </View>
        </View>
        <View style={localStyles.userProgressContainer}>
          <View style={{ flex: 1 }}>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ff6f00' }}>
              <Text style={{ ...localStyles.textCaption, marginLeft: 10 }}>
                Practice Course
              </Text>
            </View>
            <View style={localStyles.progressBarContainer}>
              <View style={localStyles.progressInnerContainer}>
                <Circle
                  progress={percentage / 100}
                  size={200}
                  thickness={5}
                  borderWidth={4}
                  textStyle={{ color: 'white' }}
                  borderColor="rgba(255, 111, 0, 0.5)"
                  color="#ff6f00"
                  showsText
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  userProfileContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  },
  userProgressContainer: {
    flex: 2,
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  progressInnerContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 18,
  },
  headline: {
    color: 'white',
    textAlign: 'left',
  },
  textContainer: {
    marginTop: 10,
    marginRight: 10,
    backgroundColor: '#ff6f00',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  textCaption: {
    color: 'white',
    fontSize: 14,
    fontStyle: 'italic',
  },
  avatarContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  progressBarContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  progressTextContainer: {},
});

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  logout: user => dispatch(setUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
