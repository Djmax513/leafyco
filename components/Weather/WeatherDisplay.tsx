import React from 'react'
import { useEffect, useState } from 'react'
import { StyleSheet, Image, View } from 'react-native'

import { COLORS } from '~/theme/themeColors'

import { Emphasis, SubTitle } from '../themed/Heading'

function WheatherIconsSwitcher ({ type }: any) {
    const [icon, setIcon] = useState()

    useEffect(() => {
        switch (type) {
            case 'clouds':
                setIcon(require(`assets/weather-raining.png`))
            case 'raining':
                setIcon(require(`assets/weather-raining.png`))
            case 'lightning':
                setIcon(require(`assets/weather-lightning.png`))
            case 'sunny':
                setIcon(require(`assets/weather-sunny.png`))
            case 'foggy':
                setIcon(require(`assets/weather-foggy.png`))
            default:
                setIcon(require(`assets/weather-sunny.png`))
        }
    }, [type])
    return <Image source={icon} style={styles.weatherIcon} />
}

export function WeatherDisplay() {
    const [wheatherInfo, setWeatherInfo] = useState<any>()
    // site dos icones
    // https://www.iconfinder.com/icons/5729377/weather_windy_climate_forecast_storm_icon

    const getWeatherInfo = async () => {
        // const result = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI('osasco')}&units=metric&lang=pt_br&appid=d8cf799aba1e8fcc7453981ac60bbdf6`)
        const data = {
            "coord": {
                "lon": -46.7917,
                "lat": -23.5325
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "nublado",
                    "icon": "04d"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 18.75,
                "feels_like": 18.95,
                "temp_min": 16.29,
                "temp_max": 19.02,
                "pressure": 1017,
                "humidity": 87,
                "sea_level": 1017,
                "grnd_level": 926
            },
            "visibility": 10000,
            "wind": {
                "speed": 6.17,
                "deg": 160
            },
            "clouds": {
                "all": 100
            },
            "dt": 1727553598,
            "sys": {
                "type": 2,
                "id": 2041565,
                "country": "BR",
                "sunrise": 1727513406,
                "sunset": 1727557509
            },
            "timezone": -10800,
            "id": 3455775,
            "name": "Osasco",
            "cod": 200
        }

        setWeatherInfo(data)
    }

    useEffect(() => {
        setTimeout(() => {
            getWeatherInfo()
        }, 1000);
    }, [wheatherInfo])

    if(wheatherInfo) {
        return (
            <View className='flex-row items-center justify-center gap-3'>
                <Emphasis color={COLORS.primaryDarker}>
                    {Math.floor(wheatherInfo?.main.temp)} C°
                </Emphasis>
                <WheatherIconsSwitcher type={wheatherInfo?.weather[0].main} />
            </View>
        )
    }

    return <></>

}

const styles = StyleSheet.create({
    weatherIcon: {
        width: 35,
        height: 35
    }
})