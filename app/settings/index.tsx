import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            {/* Profile Section */}
            <TouchableOpacity style={styles.item}>
                <Image
                    source={{ uri: "https://via.placeholder.com/100" }} // Replace with the user's profile image URL
                    style={styles.profileImage}
                />
                <Text style={styles.text}>Profile</Text>
            </TouchableOpacity>

            {/* Settings Section */}
            <TouchableOpacity style={styles.item}>
                <Text style={styles.text}>Settings</Text>
            </TouchableOpacity>

            {/* Smart Notification */}
            <TouchableOpacity style={styles.item}>
                <Ionicons
                    name="notifications-outline"
                    size={24}
                    color="white"
                    style={styles.icon}
                />
                <Text style={styles.text}>Smart Notification</Text>
            </TouchableOpacity>

            {/* Chat With Support */}
            <TouchableOpacity style={styles.item}>
                <MaterialIcons
                    name="chat-bubble-outline"
                    size={24}
                    color="white"
                    style={styles.icon}
                />
                <Text style={styles.text}>Chat With Support</Text>
            </TouchableOpacity>

            {/* My Location */}
            <TouchableOpacity style={styles.item}>
                <Ionicons
                    name="location-outline"
                    size={24}
                    color="white"
                    style={styles.icon}
                />
                <Text style={styles.text}>My Location</Text>
            </TouchableOpacity>

            {/* Privacy and Security */}
            <TouchableOpacity style={styles.item}>
                <Ionicons
                    name="lock-closed-outline"
                    size={24}
                    color="white"
                    style={styles.icon}
                />
                <Text style={styles.text}>Privacy and Security</Text>
            </TouchableOpacity>

            {/* Footer Icons */}
            <View style={styles.footer}>
                <TouchableOpacity>
                    <Ionicons
                        name="chatbubble-outline"
                        size={28}
                        color="white"
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="settings-outline" size={28} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0C2647", // Dark Blue Background
        padding: 20,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
    },
    text: {
        color: "white",
        fontSize: 18,
        marginLeft: 15,
    },
    icon: {
        width: 24,
        height: 24,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    footer: {
        position: "absolute",
        bottom: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 40,
    },
});

export default SettingsScreen;
