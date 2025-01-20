import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    TextInput,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

// Define the type for a chat item
type ChatItem = {
    id: string;
    name: string;
    lastMessage: string;
    timestamp: string;
    avatar: string;
    unreadCount: number;
};

// Dummy data for chat list
const DUMMY_CHATS: ChatItem[] = [
    {
        id: "1",
        name: "Alice Johnson",
        lastMessage: "Hey, how are you doing?",
        timestamp: "2:30 PM",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        unreadCount: 2,
    },
    {
        id: "2",
        name: "Bob Smith",
        lastMessage: "Meeting at 4 PM today",
        timestamp: "1:45 PM",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        unreadCount: 1,
    },
    // Add more chat items...
];

export default function HomeScreen() {
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Define the type for the renderChatItem function
    const renderChatItem = ({ item }: { item: ChatItem }) => (
        <TouchableOpacity
            style={styles.chatItem}
            accessibilityLabel={`Chat with ${item.name}`}
        >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                    <Text style={styles.chatName}>{item.name}</Text>
                    <Text style={styles.timestamp}>{item.timestamp}</Text>
                </View>
                <View style={styles.chatPreview}>
                    <Text
                        style={[
                            styles.lastMessage,
                            item.unreadCount > 0 && styles.unreadMessage,
                        ]}
                        numberOfLines={1}
                    >
                        {item.lastMessage}
                    </Text>
                    {item.unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadText}>
                                {item.unreadCount}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Chats</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity>
                        <Ionicons
                            name="settings"
                            size={24}
                            style={styles.headerIcon}
                            accessibilityLabel="Settings"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons
                            name="camera-outline"
                            size={24}
                            style={styles.headerIcon}
                            accessibilityLabel="Camera"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons
                            name="add"
                            size={24}
                            style={styles.headerIcon}
                            accessibilityLabel="Add"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search chats"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    accessibilityLabel="Search input"
                />
            </View>

            {/* Chat List */}
            <FlatList
                data={DUMMY_CHATS}
                keyExtractor={(item) => item.id}
                renderItem={renderChatItem}
                contentContainerStyle={styles.chatList}
            />

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <Link href="/settings" asChild>
                    <Pressable
                        style={styles.navItem}
                        accessibilityLabel="Chats"
                    >
                        <Ionicons
                            name="chatbubbles"
                            size={24}
                            color="#ffb703"
                        />
                        <Text style={styles.navItemText}>Chats</Text>
                    </Pressable>
                </Link>
                <TouchableOpacity
                    style={styles.navItem}
                    accessibilityLabel="History"
                >
                    <Ionicons name="list-outline" size={24} color="gray" />
                    <Text style={styles.navItemText}>History</Text>
                </TouchableOpacity>
                <Link href="/settings" asChild>
                    <Pressable
                        style={styles.navItem}
                        accessibilityLabel="Settings"
                    >
                        <Ionicons name="settings" size={24} color="gray" />
                        <Text style={styles.navItemText}>Settings</Text>
                    </Pressable>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F7",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 50,
        paddingBottom: 10,
        backgroundColor: "white",
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: "bold",
    },
    headerIcons: {
        flexDirection: "row",
    },
    headerIcon: {
        marginLeft: 15,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5EA",
    },
    searchIcon: {
        marginRight: 10,
        color: "gray",
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    chatList: {
        paddingTop: 10,
    },
    chatItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5EA",
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    chatInfo: {
        flex: 1,
    },
    chatHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    chatName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    timestamp: {
        fontSize: 12,
        color: "gray",
    },
    chatPreview: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 4,
    },
    lastMessage: {
        fontSize: 14,
        color: "gray",
        flex: 1,
    },
    unreadMessage: {
        fontWeight: "bold",
        color: "black",
    },
    unreadBadge: {
        backgroundColor: "#007AFF",
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginLeft: 10,
    },
    unreadText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "#E5E5EA",
    },
    navItem: {
        alignItems: "center",
    },
    navItemText: {
        fontSize: 10,
        marginTop: 4,
    },
});
