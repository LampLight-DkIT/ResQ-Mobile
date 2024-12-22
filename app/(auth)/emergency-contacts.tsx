import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function EmergencyContactScreen() {
    const [contactInfo, setContactInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: {
            street: '',
            city: '',
            state: '',
            eirCode: ''
        }
    })

    const [relationshipType, setRelationshipType] = useState('')
    const [isPrimaryContact, setIsPrimaryContact] = useState(false)

    const updateContactField = (field: string, value: string) => {
        setContactInfo((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    const updateAddressField = (field: string, value: string) => {
        setContactInfo((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [field]: value
            }
        }))
    }

    const handleSubmit = () => {
        // Basic validation
        const { firstName, lastName, phoneNumber } = contactInfo

        if (!firstName || !lastName || !phoneNumber) {
            Alert.alert('Incomplete Information', 'Please fill in at least first name, last name, and phone number.')
            return
        }

        // Prepare submission data
        const emergencyContactData = {
            ...contactInfo,
            relationshipType,
            isPrimaryContact
        }

        // TODO: Send data to backend or storage
        console.log('Emergency Contact Data:', emergencyContactData)
        Alert.alert('Contact Saved', 'Emergency contact has been successfully added.')
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>Emergency Contact</Text>

            {/* Name Inputs */}
            <View style={styles.inputRow}>
                <View style={styles.halfInput}>
                    <Text style={styles.label}>First Name*</Text>
                    <TextInput
                        style={styles.input}
                        value={contactInfo.firstName}
                        onChangeText={(value) => updateContactField('firstName', value)}
                        placeholder='John'
                    />
                </View>
                <View style={styles.halfInput}>
                    <Text style={styles.label}>Last Name*</Text>
                    <TextInput
                        style={styles.input}
                        value={contactInfo.lastName}
                        onChangeText={(value) => updateContactField('lastName', value)}
                        placeholder='Doe'
                    />
                </View>
            </View>

            {/* Relationship Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Relationship</Text>
                <TextInput
                    style={styles.input}
                    value={relationshipType}
                    onChangeText={setRelationshipType}
                    placeholder='e.g., Spouse, Parent, Sibling'
                />
            </View>

            {/* Contact Details */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={contactInfo.email}
                    onChangeText={(value) => updateContactField('email', value)}
                    placeholder='john.doe@example.com'
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number*</Text>
                <TextInput
                    style={styles.input}
                    value={contactInfo.phoneNumber}
                    onChangeText={(value) => updateContactField('phoneNumber', value)}
                    placeholder='(123) 456-7890'
                    keyboardType='phone-pad'
                />
            </View>

            {/* Address Inputs */}
            <View style={styles.inputContainer}>
                <Text style={styles.sectionTitle}>Address</Text>
                <TextInput
                    style={styles.input}
                    value={contactInfo.address.street}
                    onChangeText={(value) => updateAddressField('street', value)}
                    placeholder='Street Address'
                />

                <View style={styles.inputRow}>
                    <View style={styles.halfInput}>
                        <TextInput
                            style={styles.input}
                            value={contactInfo.address.city}
                            onChangeText={(value) => updateAddressField('city', value)}
                            placeholder='City'
                        />
                    </View>
                    <View style={styles.halfInput}>
                        <TextInput
                            style={styles.input}
                            value={contactInfo.address.state}
                            onChangeText={(value) => updateAddressField('state', value)}
                            placeholder='State'
                        />
                    </View>
                </View>

                <TextInput
                    style={styles.input}
                    value={contactInfo.address.eirCode}
                    onChangeText={(value) => updateAddressField('eirCode', value)}
                    placeholder='Eir Code'
                    keyboardType='numeric'
                />
            </View>

            {/* Primary Contact Toggle */}
            <View style={styles.toggleContainer}>
                <Text style={styles.toggleLabel}>Set as Primary Emergency Contact</Text>
                <Switch
                    value={isPrimaryContact}
                    onValueChange={setIsPrimaryContact}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isPrimaryContact ? '#f5dd4b' : '#f4f3f4'}
                />
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Save Emergency Contact</Text>
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
    inputContainer: {
        marginBottom: 15
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    halfInput: {
        width: '48%'
    },
    label: {
        marginBottom: 5,
        color: '#333',
        fontWeight: '600'
    },
    sectionTitle: {
        marginBottom: 10,
        color: '#666',
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E1E1E1',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15,
        paddingHorizontal: 10
    },
    toggleLabel: {
        fontSize: 16,
        flex: 1,
        marginRight: 10
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
