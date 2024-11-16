import { Text, View } from "react-native"

export function FormGroup({label, children}: any) {
    return (
        <View className="w-full" style={{flex: 1}}>
            {label && <Text className='color-light font-semibold tracking-wide' style={{ marginBottom: 8 }}>{label}</Text>}
            <View className="flex-row gap-4 items-center w-full">
                {children}
            </View>
        </View>
    )
}