import { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, Button } from 'react-native'
import * as Location from 'expo-location'
// import * as Device from "expo-device";
import * as Google from 'expo-auth-session/providers/google'
import AsyncStorage from '@react-native-async-storage/async-storage'

// import ParallaxScrollView from "@/components/ParallaxScrollView";
import { makeRedirectUri } from 'expo-auth-session'

type UserInfo = {
    email: string
    family_name: string
    given_name: string
    id: string
    name: string
    picture: string
    verified_email: boolean
}

export default function Index() {
    const [location, setLocation] = useState<Location.LocationObject>()
    const [errorMsg, setErrorMsg] = useState<string>()
    const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined)
    const redirectUri = makeRedirectUri({
        scheme: 'com.lamplight.resqtest',
        preferLocalhost: true,
        isTripleSlashed: true
    })
    const [_req, res, promptAsync] = Google.useAuthRequest({
        androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
        redirectUri: redirectUri,
        scopes: ['profile', 'email']
    })

    const handleGoogleSignIn = async () => {
        const user = await AsyncStorage.getItem('@user')
        if (!user) {
            if (res?.type === 'success') {
                await getUserInfo(res.authentication?.accessToken as string)
            }
        } else {
            setUserInfo(JSON.parse(user))
        }
    }

    useEffect(() => {
        console.log({ res })
        console.log({ userInfo })
        handleGoogleSignIn()
    }, [res])

    const getUserInfo = async (token: string) => {
        try {
            const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log({ response })
            const userInfo = await response.json()
            await AsyncStorage.setItem('@user', JSON.stringify(userInfo))
            setUserInfo(userInfo)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        ;(async () => {
            // if (Platform.OS === "android" && !Device.isDevice) {
            // 	setErrorMsg(
            // 		"Oops, this will not work on Snack in an Android Emulator. Try it on your device!",
            // 	);
            //      console.log("Oops, this will not work on Snack in an Android Emulator. Try it on your device!");
            // 	return;
            // }
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied')
                console.log('Permission to access location was denied')
                return
            }

            let location = await Location.getCurrentPositionAsync({})
            setLocation(location)
        })()
    }, [res])

    let text = 'Waiting..'
    if (errorMsg) {
        text = errorMsg
    } else if (location) {
        text = JSON.stringify(location, null, 4)
    }
    return (
        <View>
            <Button title='Sign in with Google' onPress={async () => await promptAsync()} />
            <View style={styles.container}>
                <Text style={styles.paragraph}>{JSON.stringify(location, null, 4)}</Text>
                {userInfo && (
                    <View>
                        <Text>{userInfo.email}</Text>
                        <Text>{userInfo.family_name}</Text>
                        <Text>{userInfo.given_name}</Text>
                        <Text>{userInfo.name}</Text>
                        <Image source={{ uri: userInfo.picture }} style={{ width: 200, height: 200 }} />
                        <Text>{userInfo.verified_email}</Text>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    paragraph: {
        fontSize: 18,
        // textAlign: "center",
        color: 'white'
        // display: "block",
    }
})
