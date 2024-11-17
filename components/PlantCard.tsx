import React, { useEffect, useState } from 'react';
import { Text, Image, Pressable } from 'react-native';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const PlantCard = ({id, data, openBottomSheet}: any) => {
    const [imageSource, setImageSource] = useState<string | null>('');
    // console.log('@Item', id, data)

    useEffect(() => {
        async function getImageUrl() {
            const storage = getStorage();

            const response = await getDownloadURL(ref(storage, data.imageUrl));
            console.log('@url', response)
            setImageSource(response)
        }
        if (data.imageUrl !== null) {
            getImageUrl()
        }
    }, [])


    // Create a reference from a Google Cloud Storage URI

    return (
    <>
      <Pressable className='bg-gray rounded-xl' onPress={() => {openBottomSheet(data)}}>
        {imageSource && <Image source={{ uri: imageSource}} className='rounded-2xl' style={{width: 160, height: 160}} />}
        <Text className='text-center font-semibold text-base p-1 pt-0' style={{ color: '#ECEDEE' }}>{data.name}</Text>
      </Pressable>
    </>
    );
}

export default PlantCard