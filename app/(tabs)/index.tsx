import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { collection, doc, getDocs, where, query } from 'firebase/firestore';
import { StyleSheet, Image, View, Pressable, Text } from 'react-native';

import { WeatherDisplay } from '~/components/Weather/WeatherDisplay';
import { Title } from '~/components/themed/Heading';
import { PageContainer } from '~/components/themed/PageContainer';
import { getUserID } from '~/lib/saveUserId';
import { COLORS } from '~/theme/themeColors';
import { FIRESTORE_DB } from '~/database/firebase';

export default function Home() {
  const [plantList, setPlantList] = useState<any>()
  useEffect(() => {
    getUserID()
    // getAllPlantsList()
  }, []);

  // const getAllPlantsList = async () => {
  //   const userID = await getUserID()
  //   const q = query(collection(FIRESTORE_DB, `users/${userID}/plants`), where("collection", "!=", ''));

  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //     setPlantList(doc.data())
  //   });
  // }


  return (
    <PageContainer>
      <CustomHeader />

      <Pressable onPress={() => router.navigate('../addPlant')} className="mx-auto w-1/2">
        <Text className="rounded-md bg-primary py-3 text-center text-lg font-bold color-light">
          Adicionar planta
        </Text>
      </Pressable>
    </PageContainer>
  );
}

function CustomHeader() {
  return (
    <View>
      <Image
        source={require('assets/garden-ilustration.jpg')}
        // @ts-ignore
        style={styles.headerImage}
        blurRadius={2}
      />
      <View className="absolute top-10 block w-full gap-4 p-8">
        <View className="flex-row items-center justify-center">
          <View className="flex-row justify-center">
            <Image
              source={require('assets/leafyco-reverse-logo.png')}
              style={{ height: 30, width: 110, objectFit: 'contain' }}
            />
          </View>
        </View>

        <View className="flex-row items-center justify-center">
          <WeatherDisplay />
        </View>
      </View>

      <View
        style={{
          backgroundColor: COLORS.dark,
          height: 24,
          borderTopEndRadius: 24,
          borderTopStartRadius: 24,
          top: -24,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    // @ts-ignore
    height: '35vh',
    width: '100%',
    padding: 2,
    // backgroundColor: 'red',
    shadowColor: '#fff',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 9,
  },
});
