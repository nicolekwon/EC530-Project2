import React, { useState, useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput,
    ScrollView,
    Platform,
    Keyboard,
    KeyboardAvoidingView,
    Alert
} from "react-native";

const SignIn = ({navigation}) => {
    const [passwordVisible, setPasswordVisible] = useState(true);

    return (
        <View style={StyleSheet.container}>
            <SafeAreaView>
                <KeyboardAwareScrollView
                    onKeyboardWillShow={(frames: Object) => {
                    console.log('Keyboard event', frames)
                    }}>
                {/* Header */}
                <View style={styles.headerWrapper}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/icons/back.png')}
                        style={styles.back}
                        />
                    </TouchableOpacity>
                </View>
                {/* Sign-In Logo and Image */}
                <Text style={styles.headerTitle}>
                        <Text>
                            SIGN IN
                        </Text>
                    </Text>
                    <Image source={require('../assets/images/login.png')}
                            style={styles.logoImage}
                    />
                    {/* Sign-In Functionality */}
                    <View style={styles.signinWrapper}>
                        <View style={styles.usernameWrapper}>
                            <View style={styles.username}>
                                <TextInput 
                                  style={styles.usernameText}
                                  placeholder="Email"
                                  placeholderTextColor="gray" 
                                />
                            </View>
                        </View>
                        <View style={styles.passwordWrapper}>
                            <View style={styles.password}>
                                <TextInput 
                                    style={styles.passwordText}
                                    placeholder="Password"
                                    placeholderTextColor="gray"
                                    secureTextEntry={passwordVisible}
                                />
                            </View>
                            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                <Image source={passwordVisible ? require('../assets/icons/passwordon.png') : require('../assets/icons/passwordoff.png')}
                                style={styles.passwordIcon}
                                /> 
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.buttonWrapper}
                        onPress={() => {navigation.navigate('Home')}}
                        >
                            <Text style={styles.buttonTitle}>
                                <Text>
                                    Sign In
                                </Text>
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.signupWrapper}>
                            <Text style={styles.signuptext}>
                                <Text>
                                    Don't have an account?
                                </Text>
                            </Text>
                            <TouchableOpacity
                            onPress={() => navigation.navigate('SignUp')}
                            >
                                <Text style={styles.signupnav}>
                                    <Text>
                                        Sign Up
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </View>
    )
}

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      headerWrapper: {
        flexDirection: 'row',
        alignItems: 'stretch',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 50 : 15,
      },
      back: {
        top: 5,
        width: 30,
        height: 30,
        tintColor: 'black',
      },
      headerTitle: {
        textAlign: 'center',
        color: 'black',
        fontFamily: 'DamascusBold',
        fontSize: Platform.OS === 'android' ? Dimensions.get("window").height/20 : Dimensions.get("screen").height/20,
        top: Platform.OS === 'android' ? Dimensions.get("window").height/30 : Dimensions.get("screen").height/30,
      },
      logoImage: {
        alignSelf: 'center',
        width: Platform.OS === 'android' ? Dimensions.get("window").width/1.4 : Dimensions.get("screen").width/1.4,
        height: Platform.OS === 'android' ? Dimensions.get("window").width/1.4 : Dimensions.get("screen").width/1.4,
        top: Platform.OS === 'android' ? Dimensions.get("window").height/20 : Dimensions.get("screen").height/20,
        resizeMode: 'contain',
      },
      signinWrapper:
      {
        height: Platform.OS === 'android' ? Dimensions.get("window").height/2 : Dimensions.get("screen").height/2,
      },
      usernameWrapper:
      {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get("window").width-40,
        height: Dimensions.get("window").height/15,
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: 'black',
        borderWidth: 1.5,
        top: Dimensions.get("window").height/13,
        borderRadius: 5,
      },
      username:
      {
        flex: 1,
        marginLeft: 15,
        marginRight: 15
      },
      usernameText:
      {
        fontFamily: 'Arial',
        fontSize: 16,
        color: '#535461',
      },
      passwordWrapper:
      {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get("window").width-40,
        height: Dimensions.get("window").height/15,
        marginHorizontal: 20,
        borderColor: 'black',
        borderWidth: 1.5,
        top: Dimensions.get("window").height/13,
        borderRadius: 5,
      },
      passwordIcon: {
        width: 25,
        height: 25,
        borderRadius: 20,
        right: 10,
        tintColor: 'gray'
      },
      password:
      {
        flex: 1,
        marginLeft: 15,
        marginRight: 20
      },
      passwordText:
      {
        fontFamily: 'Arial',
        fontSize: 16,
        color: '#535461',
      },
      buttonWrapper:
      {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get("window").width-40,
        height: Dimensions.get("window").height/15,
        marginHorizontal: 20,
        backgroundColor: '#EC5863',
        borderColor: '#EC5863',
        borderWidth: 2,
        top: (Dimensions.get("window").height/9),
        borderRadius: 5,
      },
      buttonTitle:
      {
        fontFamily: 'Damascus',
        fontSize: 16,
        color: 'white',
      },
      signupWrapper:
      {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get("window").width-40,
        height: Dimensions.get("window").height/12,
        marginHorizontal: 20,
        top: Dimensions.get("window").height/8.8,
        borderRadius: 5,
      },
      signuptext:
      {
        fontFamily: 'Damascus',
        fontSize: 16,
        color: 'gray',
        right: 3,
      },
      signupnav:
      {
        fontFamily: 'DamascusBold',
        fontSize: 16,
        color: '#EC5863',
        left: 2,
      },
})