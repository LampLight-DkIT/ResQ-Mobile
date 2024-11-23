import { Text, View } from 'react-native'

export default function Index() {
    console.log('hello world')
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Text>Edit app/index.tsx to edit this screen.</Text>
            <Text>Hello world</Text>
            <Text>Hello world</Text>
        </View>
    )
}
