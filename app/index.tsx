import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, TextInput, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'

// Dummy data for chat list
const DUMMY_CHATS = [
    {
        id: '1',
        name: 'Alice Johnson',
        lastMessage: 'Hey, how are you doing?',
        timestamp: '2:30 PM',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        unreadCount: 2
    },
    {
        id: '2',
        name: 'Bob Smith',
        lastMessage: 'Meeting at 4 PM today',
        timestamp: '1:45 PM',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        unreadCount: 1
    },
    {
        id: '3',
        name: 'Charlie Brown',
        lastMessage: 'Thanks for the help!',
        timestamp: '11:20 AM',
        avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
        unreadCount: 0
    },
    {
        id: '4',
        name: 'Emily Rodriguez',
        lastMessage: 'Just finished the project report 📊',
        timestamp: 'Yesterday',
        avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
        unreadCount: 3
    },
    {
        id: '5',
        name: 'Michael Chen',
        lastMessage: 'Wanna grab coffee later?',
        timestamp: '3:15 PM',
        avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
        unreadCount: 1
    },
    {
        id: '6',
        name: 'Sarah Williams',
        lastMessage: 'Happy birthday! 🎂🎉',
        timestamp: 'Monday',
        avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
        unreadCount: 0
    },
    {
        id: '7',
        name: 'David Kim',
        lastMessage: 'Can you send me those design files?',
        timestamp: '10:45 AM',
        avatar: 'https://randomuser.me/api/portraits/men/61.jpg',
        unreadCount: 4
    },
    {
        id: '8',
        name: 'Olivia Patel',
        lastMessage: 'Just booked our tickets! ✈',
        timestamp: '9:22 PM',
        avatar: 'https://randomuser.me/api/portraits/women/58.jpg',
        unreadCount: 2
    },
    {
        id: '9',
        name: 'James Anderson',
        lastMessage: 'Did you see the game last night?',
        timestamp: 'Yesterday',
        avatar: 'https://randomuser.me/api/portraits/men/93.jpg',
        unreadCount: 0
    },
    {
        id: '10',
        name: 'Emma Thompson',
        lastMessage: 'Running late, be there in 20 mins',
        timestamp: '12:55 PM',
        avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
        unreadCount: 1
    }
]

export default function HomeScreen() {
    const [searchQuery, setSearchQuery] = useState('')

    // @ts-ignore
    const renderChatItem = ({ item }) => (
        <TouchableOpacity style={styles.chatItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                    <Text style={styles.chatName}>{item.name}</Text>
                    <Text style={styles.timestamp}>{item.timestamp}</Text>
                </View>
                <View style={styles.chatPreview}>
                    <Text style={[styles.lastMessage, item.unreadCount > 0 && styles.unreadMessage]} numberOfLines={1}>
                        {item.lastMessage}
                    </Text>
                    {item.unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadText}>{item.unreadCount}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Chats</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity>
                        <Ionicons name='camera-outline' size={24} style={styles.headerIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='add' size={24} style={styles.headerIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name='search' size={20} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder='Search chats'
                    value={searchQuery}
                    onChangeText={setSearchQuery}
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
                <Link
                    // href='/auth/phone'
                    // href='/auth/profile'
                    href='/auth/emergency-contacts'
                    asChild
                >
                    <Pressable style={styles.navItem}>
                        <Ionicons name='chatbubbles' size={24} color='#007AFF' />
                        <Text style={styles.navItemText}>Chats</Text>
                    </Pressable>
                </Link>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name='list-outline' size={24} color='gray' />
                    <Text style={styles.navItemText}>History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name='settings' size={24} color='gray' />
                    <Text style={styles.navItemText}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 50,
        paddingBottom: 10,
        backgroundColor: 'white'
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: 'bold'
    },
    headerIcons: {
        flexDirection: 'row'
    },
    headerIcon: {
        marginLeft: 15
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA'
    },
    searchIcon: {
        marginRight: 10,
        color: 'gray'
    },
    searchInput: {
        flex: 1,
        fontSize: 16
    },
    chatList: {
        paddingTop: 10
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12
    },
    chatInfo: {
        flex: 1
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    chatName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    timestamp: {
        fontSize: 12,
        color: 'gray'
    },
    chatPreview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4
    },
    lastMessage: {
        fontSize: 14,
        color: 'gray',
        flex: 1
    },
    unreadMessage: {
        fontWeight: 'bold',
        color: 'black'
    },
    unreadBadge: {
        backgroundColor: '#007AFF',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginLeft: 10
    },
    unreadText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold'
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E5E5EA'
    },
    navItem: {
        alignItems: 'center'
    },
    navItemText: {
        fontSize: 10,
        marginTop: 4
    }
})
