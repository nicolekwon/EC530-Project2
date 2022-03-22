import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform,
    StackNavigator,
    Linking
} from "react-native";

// Functional component for splash page
const Splash = ({navigation}) => {
    return (
        <View style={StyleSheet.container}>
            <SafeAreaView>
                {/* Logo, Photo, and Buttons */}
                <View style={styles.buttonsContainer}>
                    <View style={styles.logoWrapper}>
                        <Text style={styles.logoTitle1}>
                            Let's get
                        </Text>
                        <Text style={styles.logoTitle2}>
                            started!
                        </Text>
                    </View>
                    <Image source={require('../assets/images/splash.png')}
                            style={styles.splashImage}
                    />
                    <TouchableOpacity style={styles.subutton}
                    onPress={() => navigation.navigate('SignUp')}
                    >
                        <Text style={styles.subuttonTitle}>
                            <Text>
                                SIGN UP
                            </Text>
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sibutton}
                    onPress={() => navigation.navigate('SignIn')}
                    >
                        <Text style={styles.sibuttonTitle}>
                            <Text>
                                SIGN IN
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      buttonsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginVertical: 30,
      },
      logoWrapper:
      {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
      },
      logoTitle1: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        top: 30,
        fontFamily: 'DamascusBold',
        fontSize: 30,
        color: 'black'
      },
      logoTitle2: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        top: 27,
        left: 8,
        fontFamily: 'DamascusBold',
        fontSize: 30,
        color: '#4285F4'
      },
      splashImage: {
        alignSelf: 'center',
        width: Platform.OS === 'android' ? Dimensions.get("window").width/1.2 : Dimensions.get("screen").width/1.2,
        height: Platform.OS === 'android' ? Dimensions.get("window").width/1.2 : Dimensions.get("screen").width/1.2,
        top: 20,
        resizeMode: 'contain',
      },
      sibutton: {
        width: Dimensions.get("screen").width/1.7,
        height: Platform.OS === 'android' ? Dimensions.get("window").height/12 : Dimensions.get("screen").height/12,
        alignItems: 'stretch',
        borderRadius: 5,
        borderColor: '#EC5863',
        borderWidth: 2,
        justifyContent: 'center',
        top: Platform.OS === 'android' ? (Dimensions.get("window").height/35)+10 : (Dimensions.get("screen").height/35)+10,
      },
      subutton: {
        width: Dimensions.get("screen").width/1.7,
        height: Platform.OS === 'android' ? Dimensions.get("window").height/12 : Dimensions.get("screen").height/12,
        alignItems: 'stretch',
        backgroundColor: '#EC5863',
        borderRadius: 5,
        top: Platform.OS === 'android' ? (Dimensions.get("window").height/35) : (Dimensions.get("screen").height/35),
        marginVertical: 2,
        justifyContent: 'center',
      },
      sibuttonTitle: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#EC5863',
        fontFamily: 'DamascusBold',
        fontSize: 15, 
      },
      subuttonTitle: {
        textAlignVertical: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontFamily: 'DamascusBold',
        fontSize: 15, 
      },
})