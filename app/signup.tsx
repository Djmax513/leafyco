import React, { useState, useEffect } from 'react';

import { ScrollView, View, Text, Pressable } from 'react-native';
import { useForm } from 'react-hook-form'

import FormSelector from '~/components/FormSelector';

import { PageContainer } from '~/components/themed/PageContainer';
import { TextField } from '~/components/TextField';
import { FormGroup } from '~/components/FormGroup';
import ImagePicker from '~/components/ImagePicker';

import { FIREBASE_AUTH } from '~/database/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Plants() {
  const { register, setValue, handleSubmit, control } = useForm()
  const [image, onChangeImage] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);

  const auth = FIREBASE_AUTH

  useEffect(() => {
    setValue('userProfilePhoto', image)
  }, [image])

  const onSubmit = async (data: any) => {
    console.log('data', data)
    try {
        setLoading(true)
         const response = await createUserWithEmailAndPassword(auth, data.email, data.password)
         console.log(response)
    } catch (err) {
        console.log(err)
    } finally {
        setLoading(false)
    }
  }

  return (
    <>
      <ScrollView>
        <PageContainer>
          <View className='p-4 gap-4 items-center'>
            {/* <ImagePicker name="userProfilePhoto2" control={control} imgSrc={image} setImgSrc={onChangeImage} rounded /> */}

            {/* <TextField label='Nome' name='userName' control={control} />
            <TextField label='Sobrenome' name='lastName' control={control} /> */}
            <TextField
                label='Email'
                name='email'
                control={control}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                mode="outlined"
                defaultValue="gabrielmacedo95191@gmail.com"
            />
            <TextField
                label='Senha123'
                name='password'
                control={control}
                secureTextEntry={true}
                autoCorrect={false}
                defaultValue="Minhasenha123"
            />
            <TextField label='Telefone' name='phone' control={control} mask="(99) 99999-9999" />

            <FormGroup>
              <FormSelector
                label='Estado civil'
                name={'civilStatus'}
                control={control}
                options={[
                    'Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)'
                ]}
                w={'50%'}
              />
              <FormSelector
                label='Sexo'
                name={'irrigationTime'}
                control={control}
                options={[
                  'Masculino', 'Feminino', 'Não binário',
                ]}
                w={'50%'}
              />
            </FormGroup>

            <TextField
                type="date"
                label='Data de nascimento'
                name='birthDay'
                control={control}
                mask={'99/99/9999'}
                options={{
                    dateFormat: 'DD/MM/YYYY',
                }} />

            <Pressable onPress={handleSubmit(onSubmit)} className='w-1/2 mx-auto'>
              <Text className='color-light text-center font-bold text-lg py-3 bg-primary rounded-md'>Cadastrar-se</Text>
            </Pressable>
          </View>
        </PageContainer>
      </ScrollView>
    </>
  );
}
