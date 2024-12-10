import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'
import { useEffect } from 'react'
import Camera from '@/components/camera'

const LOCATION_TASK_NAME = 'background-location-task'

const requestLocationPermissions = async () => {
   const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync()
   if (foregroundStatus === 'granted') {
      const req = await Location.requestBackgroundPermissionsAsync()
      if (req.status === 'granted') {
         console.log('Location permissions granted')
      }
   }
}

// @ts-ignore
TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
   console.log(JSON.stringify({ data, error }, null, 2))
})

const ChatInterface = () => {
   const [message, setMessage] = useState('')
   const [showCamera, setShowCamera] = useState(false)

   const [isRunning, setIsRunning] = useState(false)
   const startBackgroundTask = async () => {
      //
      // try {
      const { status } = await Location.requestBackgroundPermissionsAsync()
      console.log(status)
      // } catch (error) {
      //     console.log(error)
      // }
      console.log(status)
      if (status !== 'granted') {
         alert('Permission to access location was denied.')
         return
      }

      await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME).then(async (isRegistered) => {
         if (!isRegistered) {
            await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
               accuracy: Location.Accuracy.BestForNavigation,
               timeInterval: 1000,
               deferredUpdatesInterval: 1,
               deferredUpdatesTimeout: 0,
               deferredUpdatesDistance: 0,
               pausesUpdatesAutomatically: false,
               foregroundService: {
                  notificationTitle: 'ResQ',
                  notificationBody: 'Location tracking started',
                  notificationColor: '#AA1111'
               }
            })
         }
      })

      setIsRunning(true)
   }

   const stopBackgroundTask = async () => {
      const isRegistered = await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME)
      if (isRegistered) {
         await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
      }
      setIsRunning(false)
   }

   const handleSendMessage = async () => {
      if (message.trim()) {
         // Implement message sending logic
         console.log('Sending message:', message)
         setMessage('')
      }
      await requestLocationPermissions()
      await startBackgroundTask()

      const isRegistered = await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME)
      if (isRegistered) {
         const task = await TaskManager.getRegisteredTasksAsync()
         const locationTask = Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME)
         console.log(JSON.stringify({ task, locationTask }, null, 2))
      }
   }

   const handleCameraPress = () => {
      // Implement camera functionality
      console.log('Open camera')
      setShowCamera((prev) => !prev)
   }

   const handleAudioRecord = () => {
      // Implement audio recording
      console.log('Start audio recording')
   }

   const handleFileUpload = () => {
      // Implement file upload
      console.log('Upload file')
   }

   return (
      <SafeAreaView style={styles.container}>
         {showCamera ? (
            <Camera />
         ) : (
            <>
               <View style={styles.header}>
                  <Link href='/' style={styles.backButton}>
                     <Ionicons name='arrow-back' color='black' size={24} />
                  </Link>
                  <Text style={styles.contactName}>Chat</Text>
               </View>

               <View style={styles.messagesContainer}>{/* Implement message list here */}</View>

               <View style={styles.inputContainer}>
                  <TouchableOpacity onPress={handleCameraPress} style={styles.iconButton}>
                     <Ionicons name='camera' color='gray' size={24} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleAudioRecord} style={styles.iconButton}>
                     <Ionicons name='mic' color='gray' size={24} />
                  </TouchableOpacity>

                  <TextInput
                     style={styles.input}
                     value={message}
                     onChangeText={setMessage}
                     placeholder='Type a message'
                     multiline
                  />

                  <TouchableOpacity onPress={handleFileUpload} style={styles.iconButton}>
                     <Ionicons name='clipboard' color='gray' size={24} />
                  </TouchableOpacity>

                  <TouchableOpacity
                     onPress={handleSendMessage}
                     style={[styles.iconButton, { opacity: message.trim() ? 1 : 0.5 }]}
                     disabled={!message.trim()}
                  >
                     <Text style={styles.sendText}>Send</Text>
                  </TouchableOpacity>
               </View>
            </>
         )}
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white'
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0'
   },
   backButton: {
      marginRight: 15
   },
   contactName: {
      fontSize: 18,
      fontWeight: 'bold'
   },
   messagesContainer: {
      flex: 1
   },
   inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0'
   },
   input: {
      flex: 1,
      minHeight: 40,
      maxHeight: 100,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 20,
      paddingHorizontal: 15,
      marginHorizontal: 10
   },
   iconButton: {
      padding: 10
   },
   sendText: {
      color: 'blue',
      fontWeight: 'bold'
   }
})

export default ChatInterface
