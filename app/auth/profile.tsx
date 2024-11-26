import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import DateTimePicker from '@react-native-community/datetimepicker'

export default function ProfileCreationScreen() {
    const [profileImage, setProfileImage] = useState<string | null>(null)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: ''
    })

    const pickImage = async () => {
        // Request permission
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!')
                return
            }
        }

        // Launch image picker
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        })

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri)
        }
    }

    const handleDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || dateOfBirth
        setShowDatePicker(Platform.OS === 'ios')
        setDateOfBirth(currentDate)
    }

    const handleSubmit = () => {
        // Validate form
        if (!firstName || !lastName || !email) {
            alert('Please fill in all required fields')
            return
        }

        // Collect form data
        const profileData = {
            profileImage,
            firstName,
            lastName,
            email,
            dateOfBirth,
            address
        }

        // TODO: Send data to backend or storage
        console.log('Profile Data:', profileData)
        alert('Profile Created Successfully!')
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>Create Your Profile</Text>

            {/* Profile Image Picker */}
            <View style={styles.imagePickerContainer}>
                <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                    {profileImage ? (
                        <Image source={{ uri: profileImage }} style={styles.profileImage} />
                    ) : (
                        <>
                            <Ionicons name='camera' size={30} color='#888' />
                            <Text style={styles.imagePickerText}>Add Profile Photo</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>

            {/* Name Inputs */}
            <View style={styles.inputRow}>
                <View style={styles.halfInput}>
                    <Text style={styles.label}>First Name*</Text>
                    <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder='John' />
                </View>
                <View style={styles.halfInput}>
                    <Text style={styles.label}>Last Name*</Text>
                    <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder='Doe' />
                </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email*</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder='john.doe@example.com'
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
            </View>

            {/* Date of Birth */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Date of Birth*</Text>
                <TouchableOpacity style={styles.datePickerContainer} onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.dateText}>{dateOfBirth.toLocaleDateString()}</Text>
                    <Ionicons name='calendar' size={20} color='#888' />
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        testID='dateTimePicker'
                        value={dateOfBirth}
                        mode='date'
                        is24Hour={true}
                        display='default'
                        onChange={handleDateChange}
                    />
                )}
            </View>

            {/* Address Inputs */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                    style={styles.input}
                    value={address.street}
                    onChangeText={(text) => setAddress({ ...address, street: text })}
                    placeholder='Street Address'
                />
                <View style={styles.inputRow}>
                    <View style={styles.halfInput}>
                        <TextInput
                            style={styles.input}
                            value={address.city}
                            onChangeText={(text) => setAddress({ ...address, city: text })}
                            placeholder='City'
                        />
                    </View>
                    <View style={styles.halfInput}>
                        <TextInput
                            style={styles.input}
                            value={address.state}
                            onChangeText={(text) => setAddress({ ...address, state: text })}
                            placeholder='State'
                        />
                    </View>
                </View>
                <TextInput
                    style={styles.input}
                    value={address.zipCode}
                    onChangeText={(text) => setAddress({ ...address, zipCode: text })}
                    placeholder='Zip Code'
                    keyboardType='numeric'
                />
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Create Profile</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7'
    },
    contentContainer: {
        padding: 20,
        paddingTop: 50
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    imagePickerContainer: {
        alignItems: 'center',
        marginBottom: 20
    },
    imagePicker: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#E1E1E1',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    profileImage: {
        width: '100%',
        height: '100%'
    },
    imagePickerText: {
        marginTop: 10,
        color: '#888'
    },
    inputContainer: {
        marginBottom: 15
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    halfInput: {
        width: '48%'
    },
    label: {
        marginBottom: 5,
        color: '#333',
        fontWeight: '600'
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E1E1E1',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10
    },
    datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E1E1E1',
        borderRadius: 8,
        padding: 10
    },
    dateText: {
        color: '#333'
    },
    submitButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
})
