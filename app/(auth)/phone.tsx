import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// Country codes data
const COUNTRY_CODES = [
    { code: '+1', country: 'United States', flag: '🇺' },
    { code: '+44', country: 'United Kingdom', flag: '🇬' },
    { code: '+91', country: 'India', flag: '🇮' },
    { code: '+86', country: 'China', flag: '🇨' },
    { code: '+81', country: 'Japan', flag: '🇯' },
    { code: '+62', country: 'Indonesia', flag: '🇮' },
    { code: '+353', country: 'Ireland', flag: '🇮' },
    { code: '+55', country: 'Brazil', flag: '🇧' },
    { code: '+49', country: 'Germany', flag: '🇩' },
    { code: '+33', country: 'France', flag: '🇫' },
    { code: '+61', country: 'Australia', flag: '🇦' },
    { code: '+82', country: 'South Korea', flag: '🇰' },
    { code: '+234', country: 'Nigeria', flag: '🇳' },
    { code: '+7', country: 'Russia', flag: '🇷' },
    { code: '+52', country: 'Mexico', flag: '🇲' },
    { code: '+27', country: 'South Africa', flag: '🇿' }
].sort((a, b) => a.country.localeCompare(b.country))

export default function PhoneVerificationScreen() {
    const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0])
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
    const [isVerificationSent, setIsVerificationSent] = useState(false)
    const [verificationCode, setVerificationCode] = useState('')

    const handleSendVerification = () => {
        // Basic validation
        if (phoneNumber.length < 7) {
            alert('Please enter a valid phone number')
            return
        }

        // Simulate sending verification code
        setIsVerificationSent(true)
        // In a real app, you would call your verification service here
    }

    const handleVerifyCode = () => {
        // Simulate code verification
        if (verificationCode === '123456') {
            alert('Phone Number Verified Successfully!')
        } else {
            alert('Invalid Verification Code')
        }
    }

    const renderCountryDropdown = () => (
        <ScrollView style={styles.dropdownContainer} keyboardShouldPersistTaps='handled'>
            {COUNTRY_CODES.map((country) => (
                <TouchableOpacity
                    key={country.code}
                    style={styles.dropdownItem}
                    onPress={() => {
                        setSelectedCountry(country)
                        setIsCountryDropdownOpen(false)
                    }}
                >
                    <Text style={styles.flagText}>{country.flag}</Text>
                    <Text style={styles.countryText}>{country.country}</Text>
                    <Text style={styles.codeText}>{country.code}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify Phone Number</Text>

            {/* Country Code and Phone Number Input */}
            <View style={styles.phoneInputContainer}>
                {/* Country Code Dropdown */}
                <TouchableOpacity
                    style={styles.countryCodePicker}
                    onPress={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                >
                    <Text style={styles.flagText}>{selectedCountry.flag}</Text>
                    <Text style={styles.codeText}>{selectedCountry.code}</Text>
                    <Ionicons name={isCountryDropdownOpen ? 'chevron-up' : 'chevron-down'} size={20} color='gray' />
                </TouchableOpacity>

                {/* Phone Number Input */}
                <TextInput
                    style={styles.phoneInput}
                    placeholder='Phone Number'
                    keyboardType='phone-pad'
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    maxLength={15}
                />
            </View>

            {/* Country Dropdown (if open) */}
            {isCountryDropdownOpen && renderCountryDropdown()}

            {/* Send Verification Button */}
            {!isVerificationSent && (
                <TouchableOpacity style={styles.sendButton} onPress={handleSendVerification}>
                    <Text style={styles.sendButtonText}>Send Verification Code</Text>
                </TouchableOpacity>
            )}

            {/* Verification Code Input */}
            {isVerificationSent && (
                <View style={styles.verificationContainer}>
                    <Text style={styles.instructionText}>
                        Enter the 6-digit verification code sent to {selectedCountry.code} {phoneNumber}
                    </Text>

                    <TextInput
                        style={styles.verificationInput}
                        placeholder='Verification Code'
                        keyboardType='number-pad'
                        maxLength={6}
                        value={verificationCode}
                        onChangeText={setVerificationCode}
                    />

                    <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyCode}>
                        <Text style={styles.verifyButtonText}>Verify Code</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.resendButton} onPress={() => setIsVerificationSent(false)}>
                        <Text style={styles.resendButtonText}>Resend Code</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
        padding: 20,
        paddingTop: 50
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    phoneInputContainer: {
        flexDirection: 'row',
        marginBottom: 15
    },
    countryCodePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E1E1E1',
        borderRadius: 8,
        padding: 10,
        marginRight: 10,
        width: '30%'
    },
    phoneInput: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E1E1E1',
        borderRadius: 8,
        padding: 10
    },
    flagText: {
        fontSize: 20,
        marginRight: 5
    },
    codeText: {
        marginRight: 5
    },
    dropdownContainer: {
        maxHeight: 300,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E1E1E1',
        borderRadius: 8,
        marginTop: 10
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F7'
    },
    countryText: {
        marginLeft: 10,
        flex: 1
    },
    sendButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    verificationContainer: {
        marginTop: 20
    },
    instructionText: {
        textAlign: 'center',
        marginBottom: 15,
        color: '#666'
    },
    verificationInput: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E1E1E1',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18
    },
    verifyButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10
    },
    verifyButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    resendButton: {
        alignItems: 'center'
    },
    resendButtonText: {
        color: '#007AFF'
    }
})
