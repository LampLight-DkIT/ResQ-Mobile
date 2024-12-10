import React from 'react'
import type { CameraViewProps } from 'expo-camera'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useState, useEffect, useRef } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Camera() {
    // @ts-ignore: just being lazy with types here
    const cameraRef = useRef<CameraView>(undefined)
    const [facing, setFacing] = useState<CameraViewProps['facing']>('back')
    const [permission, requestPermission] = useCameraPermissions()
    const [pictureSizes, setPictureSizes] = useState<string[]>([])
    const [selectedSize, setSelectedSize] = useState(undefined)

    useEffect(() => {
        async function getSizes() {
            console.log('hi!')
            console.log(permission)
            if (permission?.granted && cameraRef.current) {
                console.log('sized!')
                const sizes = await cameraRef.current.getAvailablePictureSizesAsync()
                setPictureSizes(sizes)
                console.log(sizes)
            }
        }

        getSizes()
    }, [permission, cameraRef])

    if (!permission) {
        // Camera permissions are still loading.
        return <View />
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title='grant permission' />
            </View>
        )
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === 'back' ? 'front' : 'back'))
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <CameraView style={styles.camera} facing={facing} ref={cameraRef} pictureSize={selectedSize}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                            <Text style={styles.text}>Flip Camera</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ width: 70, height: 70, borderRadius: 50, backgroundColor: 'white'}}
                            onPress={async () => {
                                const photo = await cameraRef.current?.takePictureAsync()
                                alert(`photo captured with dimensions: ${photo!.width} x ${photo!.height}`)
                                console.log(JSON.stringify(photo))
                                
                                // const video = await cameraRef.current?.recordAsync()
                                // alert(`video captured with dimensions: ${video!.uri}`)
                                // console.log(JSON.stringify(video))
                            }}
                        />
                    </View>
                </CameraView>
            </View>

            {/* <View style={{ flex: 1 }}> */}
            {/*     <Button */}
            {/*         title='Take Picture' */}
            {/*         onPress={async () => { */}
            {/*             const photo = await cameraRef.current?.takePictureAsync() */}
            {/*             alert(`photo captured with dimensions: ${photo!.width} x ${photo!.height}`) */}
            {/*             console.log(JSON.stringify(photo)) */}
            {/*         }} */}
            {/*     /> */}
            {/*     <View */}
            {/*         style={{ */}
            {/*             height: 1, */}
            {/*             backgroundColor: '#eee', */}
            {/*             marginVertical: 20 */}
            {/*         }} */}
            {/*     /> */}
            {/*     {pictureSizes.map((size) => ( */}
            {/*         <Button */}
            {/*             key={size} */}
            {/*             title={size} */}
            {/*             onPress={() => { */}
            {/*                 // @ts-ignore */}
            {/*                 setSelectedSize(size) */}
            {/*             }} */}
            {/*         /> */}
            {/*     ))} */}
            {/* </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
        bottom: 0,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center'
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    }
})
