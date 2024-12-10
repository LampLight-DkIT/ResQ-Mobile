import { Text, Button, View, StyleSheet } from 'react-native'
import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'
import React, { useEffect, useState } from 'react'

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
export default function AppPermissions() {
    // useEffect(() => {
    //     ;(async () =>
    //         await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    //             accuracy: Location.Accuracy.High
    //         }))()
    // })
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
                    timeInterval: 500,
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
    return (
        <View style={styles.container}>
            <Button onPress={requestLocationPermissions} title='Enable background location' />
            <>
                <Text>Background Task is {isRunning ? 'Running' : 'Stopped'}</Text>
            </>
            <Button
                title={isRunning ? 'Stop Background Task' : 'Start Background Task'}
                onPress={isRunning ? stopBackgroundTask : startBackgroundTask}
            />
            <Button
                title={'Is it running?'}
                onPress={async () => {
                    const isRegistered = await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME)
                    if (isRegistered) {
                        const task = await TaskManager.getRegisteredTasksAsync()
                        const locationTask = Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME)
                        console.log(JSON.stringify({ task, locationTask }, null, 2))
                    }
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
