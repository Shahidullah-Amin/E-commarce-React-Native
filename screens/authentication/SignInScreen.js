import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, Alert, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomPopup from '../../components/popups/CustomPopup';

const SignInScreen = ({ navigation }) => {
  const Width = Dimensions.get('window').width;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [containerWidth, setContainerWidth] = useState(Width > 768 ? '30%' : '100%');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    const updateContainerWidth = () => {
      const screenWidth = Dimensions.get('window').width;
      if (screenWidth > 768) {
        setContainerWidth('30%');
      } else {
        setContainerWidth('100%');
      }
    };

    updateContainerWidth();

    Dimensions.addEventListener('change', updateContainerWidth);

    return () => {
      Dimensions.removeEventListener('change', updateContainerWidth);
    };
  }, []);

  const validateEmail = () => {
    if (!email) {
      setEmailError('Please enter your email');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Please enter your password');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleSignIn = async () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      setLoading(true);
      try {
        const response = await axios.post('http://127.0.0.1:8000/chak/api/login/', {
          email: email,
          password: password,
        });

        if (response.data.access) {
          await AsyncStorage.setItem('authToken', response.data.access);
          setLoading(false);
          navigation.navigate('Dashboard');
        } else {
          setLoading(false);
          setShowPopup(true);
          setPopupMessage('Login Failed: User email or password is incorrect!');
        }
      } catch (error) {
        setLoading(false);

        if (error.response.data.type === 'validation' && error.response.status === 400) {
          setPopupMessage('Login Failed: User email or password is incorrect!');
          setShowPopup(true);
        } else {
          Alert.alert('Error', 'Something went wrong. Please try again later.');
        }
      }
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleCreateAccount = () => {
    navigation.navigate('SignUp');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook Login clicked');
  };

  const handleGoogleLogin = () => {
    console.log('Google Login clicked');
  };

  const handleAppleLogin = () => {
    console.log('Apple Login clicked');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <CustomPopup
        visible={showPopup}
        message={popupMessage}
        onClose={() => setShowPopup(false)}
      />
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/CHAK.jpg')} style={styles.logo} />
      </View>
      <Text style={styles.title}>Sign In</Text>
      <View style={[styles.formContainer, { width: containerWidth }]}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, isEmailFocused && styles.inputFocused, emailError && styles.inputError]}
            placeholder="Email"
            testID='emailInputId'
            placeholderTextColor="#999"
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, isPasswordFocused && styles.inputFocused, passwordError && styles.inputError]}
            placeholder="Password"
            placeholderTextColor="#999"
            testID="passwordInputId"
            secureTextEntry
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          {passwordError ? <Text style={styles.errorMessage}>{passwordError}</Text> : null}
        </View>
        <TouchableOpacity testID="loginButtonId" style={styles.signInBtn} onPress={handleSignIn} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.signInText}>Sign In</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={styles.createAccountText}>Don't have an account? <Text style={[styles.loginText, { color: '#007bff', fontWeight: 'bold' }]}>Create one</Text></Text>
        </TouchableOpacity>
        <View style={styles.continueWithSocial}>
          <View style={styles.line}></View>
          <Text style={styles.continueText}>Continue with</Text>
          <View style={styles.line}></View>
        </View>
      </View>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={[styles.socialBtn, { backgroundColor: 'white' }]} onPress={handleFacebookLogin}>
          <FontAwesome5 name="facebook-f" size={20} color="#2f0070" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialBtn, { backgroundColor: 'white' }]} onPress={handleGoogleLogin}>
          <FontAwesome5 name="google" size={20} color="#2f0070" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialBtn, { backgroundColor: 'white' }]} onPress={handleAppleLogin}>
          <FontAwesome5 name="apple" size={20} color="#2f0070" />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Need Help?</Text>
        <Text style={styles.footerLink}>Contact Support</Text>
        <Text style={styles.footerText}> | </Text>
        <Text style={styles.footerLink}>Privacy Policy</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  logoContainer: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2f0070',
  },
  formContainer: {
    maxWidth: '100%',
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    color: '#2f0070',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'rgba(200, 210, 250, 0.3)',
    color: 'black',
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2f0070',
  },
  signInBtn: {
    marginTop: 30,
    backgroundColor: '#2f0070',
    borderColor: '#2f0070',
    borderWidth: 2,
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#007bff',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  createAccountText: {
    color: '#000',
    textAlign: 'center',
  },
  continueWithSocial: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  continueText: {
    marginHorizontal: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialBtn: {
    backgroundColor: 'transparent',
    borderColor: '#2f0070',
    borderWidth: 2,
    borderRadius: 10,
    height: 50,
    width: 50,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  footerText: {
    color: '#333',
    marginRight: 5,
  },
  footerLink: {
    color: '#000',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
  },
  inputError: {
    borderColor: 'red',
  },
  inputFocused: {
    backgroundColor: 'white',
  },
});

export default SignInScreen;
