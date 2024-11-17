/* eslint-disable no-throw-literal */
import { router } from 'expo-router'
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View, Text, Pressable } from 'react-native';

import { TextField } from '~/components/TextField';
import { PageContainer } from '~/components/themed/PageContainer';
import { FIREBASE_AUTH } from '~/database/firebase';
import { saveUserID } from '~/lib/saveUserId';

export default function Login() {
  const { handleSubmit, control } = useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        data.email,
        data.password
      )
        .then(async (response) => {
					if (response?.user.uid) {
						await saveUserID(response.user.uid);
					}
          router.navigate('/');
        })
        .catch((error) => {
          console.log(error);
          return { error: error.code, user: {uid: null} }
        });
    } catch (err) {
      console.log('Failed to signIn', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} className="justify-center">
      <PageContainer style={{ flex: 1 }}>
        <View
          className="bg-red-500 items-center justify-center gap-4 p-4"
          // @ts-ignore
          style={{ flex: 1, minHeight: 'calc(100vh - 164px)' }}>
          <TextField
            label="Email"
            name="email"
            control={control}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            mode="outlined"
            defaultValue="teste"
          />
          <TextField
            label="Senha123"
            name="password"
            control={control}
            secureTextEntry
            autoCorrect={false}
            defaultValue="testevalue"
          />

          <Pressable onPress={handleSubmit(onSubmit)} className="mx-auto w-1/2">
            <Text className="rounded-md bg-primary py-3 text-center text-lg font-bold color-light">
              Entrar
            </Text>
          </Pressable>
        </View>
      </PageContainer>
    </ScrollView>
  );
}
