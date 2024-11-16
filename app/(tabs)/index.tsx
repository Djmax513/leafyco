import { StyleSheet, Image, View, Pressable } from 'react-native'
import { router } from 'expo-router'

import { PageContainer } from '~/components/themed/PageContainer'
import { Title } from '~/components/themed/Heading'
import { COLORS } from '~/theme/themeColors'
import { WeatherDisplay } from '~/components/Weather/WeatherDisplay'
import { useEffect } from 'react'

export default function Home() {
    useEffect(() => {
        // setTimeout(() => {
        //     router.navigate('../profile')
        // }, 1000)
    }, [])

    return (
        <PageContainer>
            <CustomHeader />
            <Title>Oi</Title>
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
            <View className='absolute w-full block p-8 top-10 gap-4'>
                <View className='justify-center flex-row items-center'>
                    <View className='flex-row justify-center'>
                        <Image
                            source={require('assets/leafyco-reverse-logo.png')}
                            style={{ height: 30, width: 110, objectFit: 'contain'}}
                        />
                    </View>
                </View>

                <View className='justify-center flex-row items-center'>
                    <WeatherDisplay />
                </View>
            </View>

            <View style={{ backgroundColor: COLORS.dark, height: 24, borderTopEndRadius: 24, borderTopStartRadius: 24, top: -24 }}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerImage: {
        // @ts-ignore
        height: '35vh',
        width: '100%',
        padding: 2,
        // backgroundColor: 'red',
        shadowColor: "#fff",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 9,
    }
})