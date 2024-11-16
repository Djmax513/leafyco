import React, { useState, useEffect } from 'react'

import { ScrollView, View, Text, Pressable } from 'react-native'
import { useForm } from 'react-hook-form'
import { Stack } from 'expo-router'

import FormSelector from '~/components/FormSelector'

import { ALLMONTHDAYS } from '~/utils/constants'

import { PageContainer } from '~/components/themed/PageContainer'
import { TextField } from '~/components/TextField'
import { FormGroup } from '~/components/FormGroup'
import ImagePicker from '~/components/ImagePicker'

export default function Plants() {
  const { register, setValue, handleSubmit, control } = useForm()
  const [image, onChangeImage] = useState<any>('');

  useEffect(() => {
    setValue('plantImageSrc', image)
  }, [image])

  const onSubmit = (data: any) => {
    console.log('data', data)
    // addPlant(data)
  }

  return (
    <>
      <ScrollView>
        <PageContainer>
          <View className='p-4 gap-4 items-center'>
            <ImagePicker name="plantImage" control={control} imgSrc={image} setImgSrc={onChangeImage} />

            <TextField label='Nome da planta' name='plantName' control={control} />
            <TextField label='Descrição' name='plantDescription' control={control} />

            <TextField label='Nome da Coleção de plantas' name='plantGroup' control={control} />

            <FormGroup label="Ciclo de irrigação">
              <FormSelector
                name={'irrigationPeriod'}
                control={control}
                options={ALLMONTHDAYS}
                w={'30%'}
              />
              <FormSelector
                name={'irrigationTime'}
                control={control}
                options={[
                  'hora(s)',
                  'dia(s)',
                  'semana(s)',
                  'mês(es)'
                ]}
                w={'70%'}
              />
            </FormGroup>

            <FormSelector
                name={'solarIncidence'}
                label='Nível de incidência solar'
                control={control}
                options={[
                  'baixo', 'médio', 'alto'
                ]}
              />

            <Pressable onPress={handleSubmit(onSubmit)} className='w-1/2 mx-auto'>
              <Text className='color-light text-center font-bold text-lg py-3 bg-primary rounded-md'>Adicionar planta</Text>
            </Pressable>
          </View>
        </PageContainer>
      </ScrollView>
    </>
  );
}
