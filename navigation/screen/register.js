import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import { Input, Button } from 'react-native-elements';
import { authentication } from '../firebaseConfig'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const Register = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    
    const register = async () => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(authentication, email, password);
            const userUID = userCredentials.user.uid;
            const docRef = doc(getFirestore(), 'users', userUID);

            await setDoc(docRef, {
                avatarUrl: imageUrl ? imageUrl : 'https://thumbs.dreamstime.com/b/businessman-avatar-line-icon-vector-illustration-design-79327237.jpg',
                name,
                password,
                userUID,
                email
            });
            await updateProfile(user, {
                photoURL: imageUrl ? imageUrl : 'https://thumbs.dreamstime.com/b/businessman-avatar-line-icon-vector-illustration-design-79327237.jpg',
            });

            
            alert('Đăng kí thành công');
        } catch (error) {
            // alert('Vui lòng điền đầy đủ thông tin đăng kí')
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoBlock}><Image style={styles.logo} source={require('../image/logo.jpg')} /></View>
            <Input
                placeholder='Nhập tên của bạn'
                label='Tên'
                leftIcon={{ name: 'people', type: 'material' }}
                value={name}
                onChangeText={text => setName(text)}
            />

            <Input
                placeholder='Nhập email của bạn'
                label='Email'
                leftIcon={{ name: 'email', type: 'material' }}
                value={email}
                onChangeText={text => setEmail(text)}
            />

            <Input
                placeholder='Nhập mật khẩu '
                label='Mật khẩu'
                leftIcon={{ name: 'lock', type: 'material' }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />

            <Input
                placeholder='Enter your Image URL'
                label='Image'
                leftIcon={{ name: 'face', type: 'material' }}
                value={imageUrl}
                onChangeText={text => setImageUrl(text)}
            />

            <Button title='Đăng kí' buttonStyle={styles.button} onPress={register} />
            <Button title='Đã có tài khoản' buttonStyle={styles.button} onPress={()=>{navigation.navigate("login")}}  />

        </View>
    )
}

export default Register
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
    logoBlock:{
        marginTop:'20%',
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
