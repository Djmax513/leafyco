import * as ImgPicker from 'expo-image-picker';
import { Image, View, StyleSheet, Pressable } from 'react-native';
// import { useController }  from 'react-hook-form'

export default function ImagePicker({ name, imgSrc, setImgSrc, control, rounded }: any) {
  // const { field } = useController({
  //     control,
  //     defaultValue: '',
  //     name
  //   })

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImgPicker.launchImageLibraryAsync({
      mediaTypes: ImgPicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImgSrc(result.assets[0]);
    }
  };

  return (
    <View className="w-full">
      <Pressable onPress={pickImage}>
        <View
          className="mx-auto h-52 w-52 overflow-hidden rounded-lg bg-gray"
          style={{ borderRadius: rounded && '9999px' }}>
          {imgSrc ? (
            <Image source={{ uri: imgSrc.uri }} style={styles.image} />
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
    objectFit: 'cover',
  },
});
