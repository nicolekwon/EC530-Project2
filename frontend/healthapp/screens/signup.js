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

import axios from 'axios';

const SignUp = ({navigation}) => {
    const [email, emailText] = React.useState(null);
    const [check, setCheck] = useState(null);

    const getCheck = () => {
        axios
          .get('https://django-env.eba-n73828us.us-east-1.elasticbeanstalk.com/')
          .then(function (response) {
            // handle success
            console.log("Hello");
            Alert.alert("Log message");
          })
          .catch(function (error) {
            // handle error
            console.log("Hello");
            Alert.alert("Error");
          })
          .finally(function () {
            // always executed
            console.log("Hello");
            Alert.alert("Finally called");
          });
      };

    /* const getCheck = () => {
        try {
          const response = fetch(
            'https://reactnative.dev/movies.json'
          );
          const json = response.json();
          Alert.alert("hello");
          return json.movies;
        } catch (error) {
          Alert.alert("uh oh");
          console.error(error);
        }; 
      } */ 

    /* const checkEmail = async () => {
        const resp = await fetch("https://ec530-project2-nicolekwon.azurewebsites.net/checkuser/" + email);
        setCheck(resp);
        try {
         const response = await fetch('https://reactnative.dev/movies.json');
         const json = await response.json();
         setData(json.movies);
       } catch (error) {
         console.error(error);
       }
     }; */ 

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
                    {/* Sign-Up Logo and Image */}
                    <Text style={styles.headerTitle}>
                        <Text>
                            SIGN UP
                        </Text>
                    </Text>
                    <Image source={require('../assets/images/login.png')}
                        style={styles.logoImage}
                    />
                    {/* Sign-Up Functionality */}
                    <View style={styles.signupWrapper}>
                        <Text style={styles.verifyText}>
                            <Text>
                                To verify you are a registered user, please enter your email below:
                            </Text>
                        </Text>
                        <View style={styles.usernameWrapper}>
                            <View style={styles.username}>
                                <TextInput 
                                    style={styles.usernameText}
                                    placeholder="Email"
                                    placeholderTextColor="gray" 
                                    onChangeText={emailText}
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.buttonWrapper}
                        onPress={() => {getCheck();
                        }
                        //{navigation.navigate('SignUp2')}
                        }
                        >
                            <Text style={styles.buttonTitle}>
                                <Text>
                                    Check
                                </Text>
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.signinWrapper}>
                            <Text style={styles.signintext}>
                                <Text>
                                    Have an account?
                                </Text>
                            </Text>
                            <TouchableOpacity
                            onPress={() => Alert.alert(check)
                                //navigation.navigate('SignIn')
                            }
                            >
                                <Text style={styles.signinnav}>
                                    <Text>
                                        Sign In
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

export default SignUp;

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
      signupWrapper:
      {
        height: Platform.OS === 'android' ? Dimensions.get("window").height/2 : Dimensions.get("screen").height/2,
      },
      verifyText: {
        textAlign: 'center',
        color: 'black',
        fontFamily: 'Damascus',
        fontSize: 20,
        marginLeft: 20,
        marginRight: 20,
        top: Platform.OS === 'android' ? Dimensions.get("window").height/14 : Dimensions.get("screen").height/14,
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
        top: (Dimensions.get("window").height/11),
        borderRadius: 5,
      },
      buttonTitle:
      {
        fontFamily: 'Damascus',
        fontSize: 16,
        color: 'white',
      },
      signinWrapper:
      {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get("window").width-40,
        height: Dimensions.get("window").height/12,
        marginHorizontal: 20,
        top: Dimensions.get("window").height/10.5,
        borderRadius: 5,
      },
      signintext:
      {
        fontFamily: 'Damascus',
        fontSize: 16,
        color: 'gray',
        right: 3,
      },
      signinnav:
      {
        fontFamily: 'DamascusBold',
        fontSize: 16,
        color: '#EC5863',
        left: 2,
      },
})