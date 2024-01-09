import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, SafeAreaView, } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { signOut } from 'firebase/auth';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { updateProfile, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { Input, button } from 'react-native-elements';

const User = ({navigation}) => {
    const [newName, setNewName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');

//đổi tên
    const changeName = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
    
        await updateProfile(user, { displayName: newName });
        const userUID = user.uid;
        const docRef = doc(getFirestore(), 'users', userUID);
        await updateDoc(docRef, { name: newName });
    
        setUserDetails({ ...userDetails, name: newName });
        setIsEditingName(false);
    };
    
    const startEditingName = () => {
        setIsEditingName(true);
    };
    
//đổi mk
const changePassword = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);

    setIsEditingPassword(false);
};

const startEditingPassword = () => {
    setIsEditingPassword(true);
};
    


    const [userDetails, setUserDetails] = useState({});

    const logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigation.navigate('login');
        }).catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            const auth = getAuth();
            const userUID = auth.currentUser.uid;
            const docRef = doc(getFirestore(), 'users', userUID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUserDetails(docSnap.data());
            } else {
                console.log('No such document!');
            }
        };

        fetchUserDetails();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            
        });
    
        if (!result.cancelled && result.uri) {
            const auth = getAuth();
            const userUID = auth.currentUser.uid;
            const docRef = doc(getFirestore(), 'users', userUID);
    
            // Tải hình ảnh lên Firebase Storage
            const storage = getStorage();
            const imageRef = ref(storage, `avatars/${userUID}`);
            await uploadString(imageRef, result.uri, 'avatarUrl');
    
            // Lấy URL của hình ảnh đã tải lên
            const imageUrl = await getDownloadURL(imageRef);
    
            // Cập nhật URL hình ảnh trong Firestore
            await updateDoc(docRef, { avatarUrl: imageUrl });
            setUserDetails({ ...userDetails, avatarUrl: imageUrl });
        }
    };

    return (
        <SafeAreaView style={styles.safeView}>
        <Text style={styles.header}>Cá nhân </Text>
            <View style={styles.container}>
                <Image
                    style={styles.avatar}
                    source={{
                        uri: userDetails.avatarUrl,
                    }}
                />
            <View style={styles.avt}>
           
            <Text style={styles.text}>Name:{userDetails.name}</Text>
            <Text style={styles.text}>Email: {userDetails.email}</Text>
            </View>
                
              
          
        <View style={styles.btnContainer}>
            <View style={styles.btn}>
                <Button title="Đổi ảnh đại diện" onPress={pickImage} />
            </View>
                


                {isEditingName ? (
                    <View>
                        <Input
                            placeholder='Nhập tên mới của bạn'
                            label='Tên mới'
                            value={newName}
                            onChangeText={text => setNewName(text)}
                        />
            <Button title="Lưu" onPress={changeName} />
                    </View>
                ) : (
                    <View style={styles.btn}>
                <Button title="Đổi tên" onPress={startEditingName} />
                    </View>
                )}

                    {isEditingPassword ? (
            <View>
                <Input
                    placeholder='Nhập mật khẩu cũ của bạn'
                    label='Mật khẩu cũ'
                    value={currentPassword}
                    onChangeText={text => setCurrentPassword(text)}
                    secureTextEntry
                />
                <Input
                    placeholder='Nhập mật khẩu mới'
                    label='Mật khẩu mới'
                    value={newPassword}
                    onChangeText={text => setNewPassword(text)}
                    secureTextEntry
                />
                <Button title="Lưu" onPress={changePassword} />
            </View>
            ) : (
            <View  style={styles.btn}>
                <Button title="Đổi mật khẩu" onPress={startEditingPassword} />
            </View>
                    )}

                <View  style={styles.lgBtn} >
                    <Button title='Đăng xuất'  onPress={logout} />
                </View>
            </View>
            
        </View>
        
        </SafeAreaView>
        
    );
};

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
    },
    header:{
        alignItems:'center',
        textAlign:'center',
        justifyContent:'center',
        fontSize: 25,
        fontWeight:'bold',
    },
    avatar: {
        
        width: 100,
        height: 100,
        borderRadius:100,
        margin:30,

    },
    btn: {
        margin:10,
        width:'70%',
    },
    btnContainer:{
        marginTop:30,
        alignItems:'center',
        paddingLeft:70,
        paddingRight:70,
        justifyContent:'center',
        
    },
    text: {
        marginLeft:20,
        fontSize: 20,
        marginBottom: 10,
    },
    safeView:{
        flex:1,
        marginTop:40,
    },
    info:{

    },
    lgbtn:{
        backgroundColor:'red'
    },
    lgBtn:{
        margin:20,
        width:130,
    },
    avt:{
        marginLeft:20,
    }
});

export default User;
