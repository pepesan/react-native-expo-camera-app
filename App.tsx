import React, { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, Button, Image} from 'react-native';
import {Camera, CameraType} from 'expo-camera';

export default function App() {
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(null);
    const [camera, setCamera] = useState<any>(null);
    const [image, setImage] = useState<any>(null);
    const [type, setType] = useState<any>(CameraType.back);
    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, []);
    const takePicture = async () => {
        if(camera){
            const data = await camera.takePictureAsync(null)
            setImage(data.uri);
        }
    }
    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{ flex: 1}}>
            <View style={styles.cameraContainer}>
                <Camera
                    ref={ref => setCamera(ref)}
                    style={styles.fixedRatio}
                    type={type}
                    ratio={'16:9'}
                />
            </View>
            <Button
                title="Flip Image"
                onPress={() => {
                    setType(
                        type === CameraType.back
                            ? CameraType.front
                            : CameraType.back
                    );
                }}>
            </Button>
            <Button title="Take Picture" onPress={() => takePicture()} />
            {image && <Image source={{uri: image}} style={{flex:1}}/>}
        </View>
    );
}
const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio:{
        flex: 1,
        aspectRatio: 1
    }
})
