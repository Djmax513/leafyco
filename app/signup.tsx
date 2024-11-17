/* eslint-disable no-throw-literal */
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View, Text, Pressable } from 'react-native';

import { FormGroup } from '~/components/FormGroup';
import FormSelector from '~/components/FormSelector';
import { TextField } from '~/components/TextField';
import { PageContainer } from '~/components/themed/PageContainer';
import { FIREBASE_AUTH, FIRESTORE_DB } from '~/database/firebase';
import { saveUserID } from '~/lib/saveUserId';

export default function Signup() {
  const { handleSubmit, control } = useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      const singUpResponse = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        data.email,
        data.password
      )
        .then((userCredential) => {
          return userCredential;
        })
        .catch((error) => {
          console.log(error);
          return { error: error.code, user: {uid: null} }
        });
      console.log('singUpResponse', singUpResponse);

      if (singUpResponse?.user.uid) {
        
        const userData = {
          firstName: data.firstName,
          lastName: data.lastName || null,
          email: data.email,
          phone: data.phone || null,
          gender: data.gender || null,
          civilState: data.civilStatus || null,
          birthDate: data.birthDay || null,
        };
        
        await setDoc(doc(FIRESTORE_DB, 'users', singUpResponse.user.uid), userData);
        
        router.navigate('/login');
      }
    } catch (err) {
      console.log('Failed to signUp', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView>
        <PageContainer>
          <View className="items-center gap-4 p-4">
            {/* <ImagePicker name="userProfilePhoto2" control={control} imgSrc={image} setImgSrc={onChangeImage} rounded /> */}

            <View className="flex w-full flex-row gap-4" style={{ flex: 1 }}>
              <TextField label="Nome" name="firstName" control={control} w="48%" />
              <TextField label="Sobrenome" name="lastName" control={control} w="48%" />
            </View>
            <TextField
              label="Email"
              name="email"
              control={control}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              mode="outlined"
              // defaultValue="gabrielmacedo95191@gmail.com"
            />
            <TextField
              label="Senha123"
              name="password"
              control={control}
              secureTextEntry
              autoCorrect={false}
              // defaultValue="Minhasenha123"
            />
            <TextField label="Telefone" name="phone" control={control} mask="(99) 99999-9999" />

            <FormGroup>
              <FormSelector
                label="Estado civil"
                name="civilStatus"
                control={control}
                options={[
                  'Solteiro(a)',
                  'Casado(a)',
                  'Divorciado(a)',
                  'Viúvo(a)',
                  'Separado(a) judicialmente',
                ]}
                w="50%"
              />
              <FormSelector
                label="Sexo"
                name="gender"
                control={control}
                options={['Masculino', 'Feminino', 'Não binário']}
                w="50%"
              />
            </FormGroup>

            <TextField
              type="date"
              label="Data de nascimento"
              name="birthDay"
              control={control}
              mask="99/99/9999"
              options={{
                dateFormat: 'DD/MM/YYYY',
              }}
            />

            <Pressable onPress={handleSubmit(onSubmit)} className="mx-auto w-1/2">
              <Text className="rounded-md bg-primary py-3 text-center text-lg font-bold color-light">
                Cadastrar-se
              </Text>
            </Pressable>
          </View>
        </PageContainer>
      </ScrollView>
    </>
  );
}
