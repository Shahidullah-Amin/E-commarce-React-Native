import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // You'll need to install '@expo/vector-icons'

const SignUpScreen = ({ navigation }) => {

  const Width = Dimensions.get('window').width;

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [containerWidth, setContainerWidth] = useState(Width > 768 ? '30%' : '100%');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isFullNameFocused, setIsFullNameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordRules, setPasswordRules] = useState([
    'Minimum 8 characters',
    'At least one uppercase letter',
    'At least one lowercase letter',
    'At least one number',
    'At least one special character'
  ]);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

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

  const checkPasswordStrength = (value) => {
    const regex = {
      minLength: 8,
      hasUppercase: /[A-Z]/,
      hasLowercase: /[a-z]/,
      hasNumbers: /\d/,
      hasSpecialChars: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
    };

    const strength =
      (value.length >= regex.minLength ? 1 : 0) +
      (regex.hasUppercase.test(value) ? 1 : 0) +
      (regex.hasLowercase.test(value) ? 1 : 0) +
      (regex.hasNumbers.test(value) ? 1 : 0) +
      (regex.hasSpecialChars.test(value) ? 1 : 0);

    return strength;
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    const strength = checkPasswordStrength(text);
    switch (strength) {
      case 0:
      case 1:
        setPasswordStrength('Weak');
        break;
      case 2:
      case 3:
        setPasswordStrength('Medium');
        break;
      case 4:
        setPasswordStrength('Strong');
        break;
      default:
        setPasswordStrength('');
        break;
    }
  };

  const handleSignUp = () => {
    validateEmail();
    validateName();
    validatePassword();
    validateConfirmPassword();

    // Proceed with sign-up logic if all fields are valid
    if (!emailError && !nameError && !passwordError && !confirmPasswordError) {
      console.log('Sign-up logic goes here');
    }
  };

  const validateEmail = () => {

    if (email == '') {

      setEmailError('Please enter your email');
    }

    else {

      const isValid = /\S+@\S+\.\S+/.test(email);
      if (!isValid) {

        setEmailError('Please enter a valid email address');

      } else {
        setEmailError('');
      }
    }
  };

  const validateName = () => {
    if (!fullName.trim()) {
      setNameError('Please enter your full name');
    } else {
      setNameError('');
    }
  };

  const validatePassword = () => {
    if (!password.trim()) {
      setPasswordError('Please enter a password');
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Please confirm your password');
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('SignIn');
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
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/CHAK.jpg')} style={styles.logo} />
      </View>
      <Text style={styles.title}>Create Account</Text>
      <View style={[styles.formContainer, { width: containerWidth }]}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, isEmailFocused && styles.inputFocused, emailError && styles.inputError]}
            placeholder="Email"
            placeholderTextColor="#999"
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
            onChangeText={(text) => setEmail(text)}
          />
          {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your Name</Text>
          <TextInput
            style={[styles.input, isFullNameFocused && styles.inputFocused, nameError && styles.inputError]}
            placeholderTextColor="#999"
            placeholder="Your first and last name"
            onFocus={() => setIsFullNameFocused(true)}
            onBlur={() => setIsFullNameFocused(false)}
            onChangeText={(text) => setFullName(text)}
          />
          {nameError ? <Text style={styles.errorMessage}>{nameError}</Text> : null}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, isPasswordFocused && styles.inputFocused, passwordError && styles.inputError]}
            placeholderTextColor="#999"
            placeholder="Password"
            secureTextEntry={true}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            onChangeText={handlePasswordChange}
          />
          {passwordError ? <Text style={styles.errorMessage}>{passwordError}</Text> : null}
          {/* Display password rules */}
          <View style={styles.passwordRulesContainer}>
            {passwordRules.map((rule, index) => (
              <Text key={index} style={styles.passwordRule}>{rule}</Text>
            ))}
          </View>
          {/* Visualize password strength */}
          <View style={styles.passwordStrengthIndicator}>
            <View
              style={[
                styles.strengthBar,
                passwordStrength === 'Weak' && styles.weakStrength,
                passwordStrength === 'Medium' && styles.mediumStrength,
                passwordStrength === 'Strong' && styles.strongStrength,
              ]}
            />
            <Text style={{ fontWeight: 'bold' }} >{passwordStrength}</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={[styles.input, isConfirmPasswordFocused && styles.inputFocused, confirmPasswordError && styles.inputError]}
            placeholderTextColor="#999"
            placeholder="Confirm Password"
            secureTextEntry={true}
            onFocus={() => setIsConfirmPasswordFocused(true)}
            onBlur={() => setIsConfirmPasswordFocused(false)}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          {confirmPasswordError ? <Text style={styles.errorMessage}>{confirmPasswordError}</Text> : null}
        </View>
        <TouchableOpacity style={styles.signUpBtn} onPress={handleSignUp}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={styles.createAccountText}>Already have an account? <Text style={[styles.loginText, {
            color: '#007bff',
            marginBottom: 20,
            fontSize: 16,
            fontWeight: 'bold'
          }]}>Sign In</Text></Text>
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
    paddingBottom: 50, // Add some padding to the bottom
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
  signUpBtn: {
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
  signUpText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
    color: '#333',
    fontWeight: 'bold',
  },
  createAccountText: {
    color: '#000',
    textDecorationLine: 'underline',
    marginBottom: 20,
    textAlign: 'center',
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
    position: 'absolute', // Position the footer absolutely
    bottom: 20, // Adjust the bottom position
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
  passwordRulesContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
  passwordRule: {
    color: '#333',
    fontSize: 12,
  },
  passwordStrengthIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  strengthBar: {
    height: 5,
    borderRadius: 5,
    backgroundColor: '#ccc',
    flex: 1,
    marginRight: 5,
  },
  weakStrength: {
    backgroundColor: 'red',
  },
  mediumStrength: {
    backgroundColor: 'yellow',
  },
  strongStrength: {
    backgroundColor: 'green',
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

export default SignUpScreen;






