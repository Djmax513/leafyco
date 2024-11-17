import { useRef } from 'react'
import { router } from 'expo-router';
import { SetStateAction, useEffect, useState, useMemo } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { StyleSheet, Image, View, Pressable, Text, FlatList, ScrollView, Button } from 'react-native';

import { WeatherDisplay } from '~/components/Weather/WeatherDisplay';
import { PageContainer } from '~/components/themed/PageContainer';
import { getUserID } from '~/lib/saveUserId';
import { COLORS } from '~/theme/themeColors';
import { FIRESTORE_DB } from '~/database/firebase';
import PlantCard from '~/components/PlantCard';
import BottomSheet from '@gorhom/bottom-sheet'

export default function Home() {
  const [plantList, setPlantList] = useState<any[]>([])
  const [userInfo, setUserInfo] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getUserID()
    getUserInfo()
    getAllPlantsList()
  }, []);

  const getAllPlantsList = async () => {
    const userID = await getUserID()
    const querySnapshot = await getDocs(collection(FIRESTORE_DB, `users/${userID}/plants`));
    const newArray: SetStateAction<any[]> = []
    await querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      newArray.push({ id: doc.id, fields: doc.data() })
    });
    setPlantList(newArray)
  }

  const getUserInfo = async () => {
    const userID = await getUserID()
    const docRef = doc(FIRESTORE_DB, `users/${userID}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserInfo(docSnap.data())
    }
  }

  const openBottomSheet = (item: any) => {
    console.log('@item', item)
    bottomSheetRef?.current?.expand()
  }

  const snapsPoints = useMemo(() => ['25%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null)
  const handleClosePress = () => bottomSheetRef?.current?.close()

  return (
    <ScrollView>
    <PageContainer>
      <CustomHeader />

      <View className="flex-1 px-3 mb-4">
        {userInfo && <Text className="text-2xl font-bold text-center capitalize mb-3" style={{ color: '#ECEDEE' }}>Bem vindo, {userInfo?.firstName}</Text>}

        <Text className="text-xl font-semibold mb-2" style={{ color: '#ECEDEE' }}>Minhas plantas</Text>
        <FlatList
          data={plantList}
          className='flex-row gap-4'
          horizontal
          contentContainerStyle={{
              flexWrap: 'wrap',
              gap: 16
          }}
          renderItem={({item}) => <PlantCard id={item.id} data={item.fields} openBottomSheet={openBottomSheet} />}
          keyExtractor={item => item.id}
        />
      </View>

      <Pressable onPress={() => router.navigate('../addPlant')} className="mx-auto w-1/2">
        <Text className="rounded-md bg-primary py-3 text-center text-lg font-bold color-light">
          Adicionar planta
        </Text>
      </Pressable>
    </PageContainer>

    {/* <BottomSheet snapPoints={snapsPoints} ref={bottomSheetRef} style={{ zIndex: 2, }}>
        <View>
          <Button title="Close Sheet" onPress={handleClosePress} />
          <Text>Bottom Sheet!!!</Text>
        </View>
    </BottomSheet> */}
    </ScrollView>
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
      <View className="absolute top-6 block w-full gap-4 p-8" style={{ top: 48 }}>
        <View className="flex-row items-center justify-center mb-3">
          <WeatherDisplay />
        </View>

        <View className="flex-row items-center justify-center">
          <View className="flex-row justify-center">
            <Image
              source={require('assets/leafyco-reverse-logo.png')}
              style={{ height: 30, width: 110, objectFit: 'contain' }}
            />
          </View>
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
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});