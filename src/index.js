import React, { useRef, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../config';
import firebase from 'firebase/compat/app';

const Otp = () => {
const [phoneNumber, setPhoneNumber] = useState('');
const [code, setCode] = useState('');
const [verificationId, setVerificationId] = useState(null);
const recaptchaVerifier = useRef(null);

const sendVerification = async () => {
try {
const phoneProvider = new firebase.auth.PhoneAuthProvider();
const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current);
setVerificationId(verificationId);
setPhoneNumber('');
} catch (error) {
alert(error);
}
};

const confirmCode = async () => {
try {
const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
await firebase.auth().signInWithCredential(credential);
setCode('');
Alert.alert('Login is successful');
} catch (error) {
alert(error);
}
};

return (
<View style={styles.container}>
<FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
<Text style={styles.otpText}>Login with phone number</Text>
<TextInput
     placeholder="PhoneNumber with country code"
     onChangeText={setPhoneNumber}
     keyboardType="phone-pad"
     autoCompleteType="tel"
     style={styles.textInput}
   />
<TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
<Text style={styles.buttonText}>Send Verification Code</Text>
</TouchableOpacity>
<TextInput
     placeholder="Confirm Code"
     onChangeText={setCode}
     keyboardType="number-pad"
     style={styles.textInput}
   />
<TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
<Text style={styles.buttonText}>Confirm Verification Code</Text>
</TouchableOpacity>
</View>
);
};

export default Otp;

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#000',
alignItems: 'center',
justifyContent: 'center',
},
textInput: {
paddingTop: 40,
paddingBottom: 20,
paddingHorizontal: 20,
fontSize: 24,
borderBottomColor: '#fff',
borderBottomWidth: 2,
marginBottom: 20,
textAlign: 'center',
color: '#fff',
},
sendVerification: {
padding: 20,
backgroundColor: '#3498db',
borderRadius: 10,
},
sendCode: {
padding: 20,
backgroundColor: '#9b59b6',
borderRadius: 10,
},
buttonText: {
textAlign: 'center',
color: '#fff',
fontWeight: 'bold',
},
otpText: {
fontSize: 24,
fontWeight: 'bold',
color: '#fff',
margin: 20,
},
});