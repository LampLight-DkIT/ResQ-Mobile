import { Button, View, StyleSheet } from 'react-native'
import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'

const LOCATION_TASK_NAME = 'background-location-task'

const requestLocationPermissions = async () => {
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync()
    if (foregroundStatus === 'granted') {
        const req = await Location.requestBackgroundPermissionsAsync()
        console.log(req)
        // if (backgroundStatus === 'granted') {
        //    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        //       accuracy: Location.Accuracy.Balanced
        //    })
        // }
    }
}

const PermissionsButton = () => (
    <View style={styles.container}>
        <Button onPress={requestLocationPermissions} title='Enable background location' />
    </View>
)

// @ts-ignore
TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    console.log(data, error)
    if (error) {
        // Error occurred - check `error.message` for more details.
        console.log(error)
        return
    }
    if (data) {
        console.log(data)
        // do something with the locations captured in the background
    }
})
export default function AppPermissions() {
    return (
        <View>
            <PermissionsButton />
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
