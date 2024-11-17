import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from 'expo-router'


export const saveUserID = async (user: string) => {
  let message;
  try {
    await AsyncStorage.setItem('userId', user);
    message = 'Sucesso ao salvar a chave do usuário!';
  } catch (e) {
    console.log(e);
    message = 'Erro ao salvar o id do usuário';
  }
  return message;
};

export const getUserID = async () => {
  let message;
  try {
    const value = await AsyncStorage.getItem('userId');
    if(value == null) {
      router.navigate('/login')
    }
    return value;
  } catch (e) {
    console.log(e);
    message = 'Erro ao salvar o id do usuário';
  }
  return message;
};
