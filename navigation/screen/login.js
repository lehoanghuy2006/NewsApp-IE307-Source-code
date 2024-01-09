import { View, Text, StyleSheet, SafeAreaView,Image, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Input, Button } from 'react-native-elements';
import { authentication } from '../firebaseConfig'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";


const Login = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = ({navigation}) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMeerrorMessagessage = error.message;
                alert('Tài khoản hoặc mật khẩu không đúng.');
            });
    }

    useEffect(() => {
        const auth = getAuth();
        const unsubcribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace('HomeTabs');
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
        return unsubcribe;
    })

    return (
        <SafeAreaView style={styles.safeView}>
        <View style={styles.logoBlock}><Image style={styles.logo} source={require('../image/logo.jpg')} /></View>
            <View style={styles.container}>

                <Input style={styles.input}
                    placeholder='Nhập email của bạn'
                    label='Email'
                    leftIcon={{ name: 'email', type: 'material' }}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />

                <Input style={styles.input}
                    placeholder='Nhập mật khẩu của bạn'
                    label='Mật khẩu'
                    leftIcon={{ name: 'lock', type: 'material' }}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />

                    <Button title='Đăng nhập' buttonStyle={styles.button} onPress={signIn} />
                    <Button title='Đăng kí' buttonStyle={styles.button}
                        onPress={() => navigation.navigate('sign-up')}
                />

            </View>
        </SafeAreaView>
    )
}

export default Login
const styles = StyleSheet.create({
    button: {
        width: 250,
        height:50,
        marginTop: 20,
    },
    container: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
    },
    safeView: {
        flex:1,
        
    },
    logoBlock:{
        marginTop:'30%',
        justifyContent:'center',
        alignItems:'center',
    },
    logo:{
        width:146,
        height:150,
        resizeMode:'contain',
        borderRadius:100,
        justifyContent:'center'
    },
})