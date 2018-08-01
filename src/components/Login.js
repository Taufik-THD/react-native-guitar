import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  AsyncStorage,
  TextInput,
  SafeAreaView,
  Image,
} from 'react-native';
import {
  FormValidationMessage,
} from 'react-native-elements';
import Button from 'react-native-button';

// import styles from '../styles/styles';
import { userLogin, userRegister } from '../store/actions';

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22262d',
    flexDirection: 'column',
  },
  formContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 200,
    padding: 20,
  },
  button: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 130,
    margin: 25,
    marginHorizontal: 40,
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
    backgroundColor: 'red',
  },
  input: {
    height: 50,
    width: 340,
    backgroundColor: '#757575',
    color: 'white',
    paddingHorizontal: 15,
    margin: 2,
    borderRadius: 5,
  },
});

// const placeholderTextColor = '#757575';
const initialFormState = {
  password: '',
  email: '',
  fullname: '',
  confirmPass: '',
};
class Login extends Component {
  static navigationOptions = {
    header: null,
    footer: null,
  };

  constructor() {
    super();
    this.state = {
      ...initialFormState,
      userAction: 'login',
      formValidation: {
        fullname: {
          status: false,
          message: '',
        },
        email: {
          status: false,
          message: '',
        },
        password: {
          status: false,
          message: '',
        },
        confirmPass: {
          status: false,
          message: '',
        },
      },
      formRules: {
        email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        password: [
          { re: /(?=.*[a-z])/, message: 'password must contain lowercase' },
          { re: /(?=.*[A-Z])/, message: 'password must contain uppercase' },
          { re: /(?=.*[0-9])/, message: 'password must contain numeric' },
          { re: /(?=.{6,})/, message: 'password must be at least 6 characters' },
        ],
      },
      warnForm: false,
      keyboardIsShown: false,
    };
  }

  componentDidMount() {
    const { navigation, user } = this.props;

    if (!user.fullname) {
      navigation.setParams({ showTabBar: false });
    }
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUpdate() {
    clearTimeout(this._timeout);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({ keyboardIsShown: true });
  }

  _keyboardDidHide = () => {
    this.setState({ keyboardIsShown: false });
  }

  handleChange = name => (val) => {
    switch (name) {
      case 'fullname':
        this.checkFullname(val);
        break;
      case 'email':
        this.checkEmail(val);
        break;
      case 'password':
        this.checkPassword(val);
        break;
      case 'confirmPass':
        this.checkConfirmPass(val);
        break;
      default:
        break;
    }

    this.setState({
      [name]: val,
    });
  };

  checkFullname = (val) => {
    const { formValidation } = this.state;
    const validation = {
      status: !!val,
      message: val ? '' : "Fullname can't be empty",
    };
    if (!val) validation.message = '';
    const newFormValidation = { ...formValidation };
    newFormValidation.fullname = validation;
    this.setState({
      formValidation: newFormValidation,
    });
  };

  checkConfirmPass = (val) => {
    const { password, formValidation } = this.state;
    const status = val === password;
    const validation = {
      status,
      message: status ? '' : 'Password do not match',
    };
    if (!val) validation.message = '';
    const newFormValidation = { ...formValidation };
    newFormValidation.confirmPass = validation;
    this.setState({
      formValidation: newFormValidation,
    });
  };

  checkEmail = (val) => {
    const { formRules, formValidation } = this.state;
    const status = formRules.email.test(val);
    const validation = {
      status,
      message: status ? '' : 'This is not a valid email address',
    };
    if (!val) validation.message = '';
    const newFormValidation = { ...formValidation };
    newFormValidation.email = validation;
    this.setState({
      formValidation: newFormValidation,
    });
  };

  checkPassword = (val) => {
    const { formRules, formValidation } = this.state;
    const validation = {};
    const rules = formRules.password;
    for (let i = 0; i < rules.length; i++) {
      if (!rules[i].re.test(val)) {
        const { message } = rules[i];
        validation.message = message;
        validation.status = false;
        break;
      }
    }
    if (!val) validation.message = '';
    const newFormValidation = { ...formValidation };
    newFormValidation.password = validation;
    this.setState({
      formValidation: newFormValidation,
    });
  };

  changeUserAction = action => () => {
    this.setState({
      userAction: action,
    });
  };

  login = async () => {
    const { email, password, formValidation } = this.state;
    const { login, navigation } = this.props;

    if (formValidation.email && formValidation.password) {
      const result = await login({ email, password });
      await AsyncStorage.setItem('token', result.token);
      Keyboard.dismiss();
      navigation.replace('Profile');
    } else {
      await this.setState({
        ...initialFormState, warnForm: true,
      });
      this._timeout = setTimeout(() => {
        this.setState({ warnForm: false });
      }, 2000);
    }
  };

  register = async () => {
    const {
      email, password, fullname, formValidation,
    } = this.state;
    const { register } = this.props;

    const isValid = !!Object.keys(formValidation)
      .filter(key => formValidation[key].status === true)[0];

    if (isValid) {
      await register({ email, password, fullname });
      await this.setState({ userAction: 'login', ...initialFormState });
    } else {
      await this.setState({ ...initialFormState, warnForm: true });
      this._timeout = setTimeout(() => {
        this.setState({ warnForm: false });
      }, 2000);
    }
  }

  submit = () => {
    const { userAction } = this.state;
    if (userAction === 'login') {
      this.login();
    } else {
      this.register();
    }
  };

  renderLoginProperties = () => {
    const { password, email, formValidation } = this.state;
    return (
      <SafeAreaView style={localStyles.container}>
        <View style={localStyles.container}>
          <View style={localStyles.logoContainer}>
            <TextInput
              style={localStyles.input}
              onChangeText={this.handleChange('email')}
              value={email}
              placeholder="Enter email"
              placeholderTextColor="white"
              keyboardType="email-address"
              returnKeyType="next"
              autoCorrect={false}
            />
            {formValidation.email.message ? (
              <FormValidationMessage>
                {formValidation.email.message}
              </FormValidationMessage>
            ) : null}
            <TextInput
              placeholder="Enter Password"
              style={localStyles.input}
              onChangeText={this.handleChange('password')}
              value={password}
              placeholderTextColor="white"
              secureTextEntry
            />
            {formValidation.password.message ? (
              <FormValidationMessage>
                {formValidation.password.message}
              </FormValidationMessage>
            ) : null}
          </View>
        </View>
      </SafeAreaView>

    );
  };

  renderRegisterProperties = () => {
    const {
      fullname, password, confirmPass, email, formValidation,
    } = this.state;

    return (
      <SafeAreaView style={localStyles.container}>
        <View style={localStyles.container}>
          <View style={localStyles.logoContainer}>
            <TextInput
              style={localStyles.input}
              onChangeText={this.handleChange('fullname')}
              value={fullname}
              placeholder="Fullname"
              placeholderTextColor="white"
              autoCorrect={false}
            />
            {formValidation.fullname.message ? (
              <FormValidationMessage>
                {formValidation.fullname.message}
              </FormValidationMessage>
            ) : null}
            <TextInput
              style={localStyles.input}
              onChangeText={this.handleChange('email')}
              value={email}
              placeholder="E-mail"
              placeholderTextColor="white"
              keyboardType="email-address"
            />
            {formValidation.email.message ? (
              <FormValidationMessage>
                {formValidation.email.message}
              </FormValidationMessage>
            ) : null}
            <TextInput
              style={localStyles.input}
              onChangeText={this.handleChange('password')}
              value={password}
              placeholder="Password"
              placeholderTextColor="white"
              secureTextEntry
            />
            {formValidation.password.message ? (
              <FormValidationMessage>
                {formValidation.password.message}
              </FormValidationMessage>
            ) : null}
            <TextInput
              style={localStyles.input}
              onChangeText={this.handleChange('confirmPass')}
              value={confirmPass}
              placeholder="Confirm Password"
              placeholderTextColor="white"
              secureTextEntry
            />
            {formValidation.confirmPass.message ? (
              <FormValidationMessage>
                {formValidation.confirmPass.message}
              </FormValidationMessage>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    );
  };

  render() {
    const { userAction, warnForm, keyboardIsShown } = this.state;

    return (
      <View style={localStyles.container}>
        <KeyboardAvoidingView behavior="padding" style={localStyles.container}>

          <TouchableWithoutFeedback style={localStyles.container} onPress={Keyboard.dismiss}>


            <View style={localStyles.formContainer}>
              <View style={{
                flex: 1,
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}
              >
              <Image
                style={{ height: 100, width: 120 }}
                source={{ uri: 'https://www.dropbox.com/s/ad7vso3lxrmbcg6/POCKETTABS3%404x.png?raw=1' }}
                resizeMode="center"
              />
              </View>
              <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
                <Button
                  style={{ fontSize: 20, color: 'white' }}
                  styleDisabled={{ color: 'white' }}
                  containerStyle={{
                    margin: 1, flex: 1, padding: 10, height: 45, overflow: 'hidden', borderRadius: 4,
                  }}
                  backgroundColor={userAction === 'login' ? 'black' : '#ff6f00'}
                  onPress={this.changeUserAction('login')}
                >
                  Sign In
                </Button>

                <Button
                  style={{ fontSize: 20, color: 'white' }}
                  styleDisabled={{ color: 'white' }}
                  containerStyle={{
                    margin: 1, flex: 1, padding: 10, height: 45, overflow: 'hidden', borderRadius: 4,
                  }}
                  backgroundColor={userAction === 'login' ? 'black' : '#ff6f00'}
                  onPress={this.changeUserAction('register')}
                >
                  Sign Up
                </Button>

              </View>
              <View className="form">
                {userAction === 'login'
                  ? this.renderLoginProperties()
                  : this.renderRegisterProperties()
                }
                {warnForm
                  ? (
                    <FormValidationMessage>
                      Please check your input
                    </FormValidationMessage>
                  )
                  : null
                }
                <Button
                  style={{ fontSize: 20, color: 'white' }}
                  styleDisabled={{ color: 'white' }}
                  containerStyle={{
                    marginVertical: 5,
                    marginHorizontal: 5,
                    marginBottom: 0,
                    padding: 10,
                    height: 50,
                    overflow: 'hidden',
                    borderRadius: 5,
                    backgroundColor: '#ff6f00',
                  }}
                  onPress={this.submit}
                >
                  { userAction === 'login' ? 'Sign In' : 'Sign Up' }
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(userLogin(user)),
  register: user => dispatch(userRegister(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
