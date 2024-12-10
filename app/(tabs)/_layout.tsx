import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Redirect, Tabs } from 'expo-router'
import { Image, Pressable, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const TabLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: '#FFA001',
                    tabBarInactiveTintColor: '#CDCDE0',
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: 'white',
                        borderTopWidth: 1,
                        borderTopColor: '#232533',
                        height: 80,
                        paddingBottom: 30,
                        // paddingVertical: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }
                }}
            >
                <Tabs.Screen
                    name='index'
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <Pressable>
                                <Ionicons name='home' size={25} color={'#007AFF'} />
                            </Pressable>
                        )
                    }}
                />
                <Tabs.Screen
                    name='history'
                    options={{
                        title: 'History',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => <Ionicons name='list-outline' size={25} />
                    }}
                />

                <Tabs.Screen
                    name='settings'
                    options={{
                        title: 'Settings',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <Pressable>
                                <Ionicons name='settings' size={25} />
                            </Pressable>
                        )
                    }}
                />
            </Tabs>

            <StatusBar backgroundColor='#161622' style='light' />
        </>
    )
}

export default TabLayout
