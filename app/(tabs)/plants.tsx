import { router } from 'expo-router';
import { setDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadString } from 'firebase/storage';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View, Text, Pressable } from 'react-native';
import uuid from 'react-native-uuid';

import { FormGroup } from '~/components/FormGroup';
import FormSelector from '~/components/FormSelector';
import ImagePicker from '~/components/ImagePicker';
import { TextField } from '~/components/TextField';
import { PageContainer } from '~/components/themed/PageContainer';
import { FIREBASE_APP, FIRESTORE_DB } from '~/database/firebase';
import { getUserID } from '~/lib/saveUserId';
import { ALLMONTHDAYS } from '~/utils/constants';
import convertImageToBase64 from '~/utils/convertImageToBase64';

export default function AddPlant() {
  const { setValue, handleSubmit, control } = useForm();
  const [image, onChangeImage] = useState<any>('');

  const storage = getStorage(FIREBASE_APP);

  useEffect(() => {
    setValue('plantImageSrc', image);
  }, [image]);

  const onSubmit = async (data: any) => {
    console.log('data', data);

    const userId = await getUserID()
    const newPlantID = uuid.v4();
    
    if (userId == null) return;
  
    const filePath = `plants/${newPlantID + data.plantImageSrc.fileName}`;
    const storageRef = ref(storage, filePath);

    convertImageToBase64(data.plantImageSrc.uri, function (myBase64: any) {
      uploadString(storageRef, myBase64, 'data_url').then((snapshot: any) => {
        console.log('Uploaded a base64url string!');
      });
    });

    await setDoc(doc(FIRESTORE_DB, `users/${userId}`, 'plants/' + newPlantID), {
      name: data.plantName,
      irrigationPeriod: data.irrigationPeriod,
      irrigationTime: data.irrigationTime,
      description: data.plantDescription || '',
      collection: data.plantGroup || 'geral',
      solarIncidence: data.solarIncidence,
      imageUrl: filePath,
    }).then(() => {
      router.navigate('/');
    }).catch(err => console.error('Failed to upload the image', err));
  };

  return (
    <>
      <ScrollView>
        <PageContainer>
          <View className="items-center gap-4 p-4">
            <ImagePicker
              name="plantImage"
              control={control}
              imgSrc={image}
              setImgSrc={onChangeImage}
            />

            <TextField label="Nome da planta" name="plantName" control={control} />
            <TextField label="Descrição (opcional)" name="plantDescription" control={control} />
            <TextField label="Nome da Coleção de plantas" name="plantGroup" control={control} />
            <FormGroup label="Ciclo de irrigação">
              <FormSelector
                name="irrigationPeriod"
                control={control}
                options={ALLMONTHDAYS}
                w="30%"
              />
              <FormSelector
                name="irrigationTime"
                control={control}
                options={['hora(s)', 'dia(s)', 'semana(s)', 'mês(es)']}
                w="70%"
              />
            </FormGroup>
            <FormSelector
              name="solarIncidence"
              label="Nível de incidência solar"
              control={control}
              options={['baixo', 'médio', 'alto']}
            />

            <Pressable onPress={handleSubmit(onSubmit)} className="mx-auto w-1/2">
              <Text className="rounded-md bg-primary py-3 text-center text-lg font-bold color-light">
                Adicionar planta
              </Text>
            </Pressable>
          </View>
        </PageContainer>
      </ScrollView>
    </>
  );
}
