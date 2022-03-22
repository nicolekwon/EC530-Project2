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

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Functional component for home page
const Home = ({navigation}) => {
    return (
        <View style={StyleSheet.container}>
            <Text>
                Hi
            </Text>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
})