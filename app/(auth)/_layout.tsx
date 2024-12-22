import { Stack } from 'expo-router'

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name='app-permissions' options={{ headerTitle: 'App Permissions' }} />
            <Stack.Screen name='phone' options={{ headerTitle: 'Phone Number' }} />
            <Stack.Screen name='emergency-profile' options={{ headerTitle: 'Setup Emergency Profile' }} />
            <Stack.Screen name='emergency-contacts' options={{ headerTitle: 'Setup Emergency Contacts' }} />
            <Stack.Screen name='coded-messages' options={{ headerTitle: 'Coded Messages' }} />
        </Stack>
    )
}
