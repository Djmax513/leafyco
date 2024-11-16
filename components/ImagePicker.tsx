import { useState } from 'react';
import { Button, Image, View, StyleSheet, Pressable, Text } from 'react-native';
import * as ImgPicker from 'expo-image-picker';
// import { useController }  from 'react-hook-form'

export default function ImagePicker({ name, imgSrc, setImgSrc, control, rounded }:any) {
    // const { field } = useController({
    //     control,
    //     defaultValue: '',
    //     name
    //   })

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImgPicker.launchImageLibraryAsync({
            mediaTypes: ImgPicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImgSrc(result.assets[0].uri);
        }
    };

    return (
        <View className='w-full'>
            <Pressable onPress={pickImage}>
                <View className='w-52 h-52 bg-gray rounded-lg overflow-hidden mx-auto' style={{ borderRadius: rounded && '9999px' }}>
                    {imgSrc ? (
                        <Image source={{ uri: imgSrc }} style={styles.image} />
                    ) : (
                        <Image source={require('assets/no-image.png')} style={styles.image} />
                    )}
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
});
