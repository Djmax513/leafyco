import { Text, View } from 'react-native';

export function FormGroup({ label, children }: any) {
  return (
    <View className="w-full" style={{ flex: 1 }}>
      {label && (
        <Text className="font-semibold tracking-wide color-light" style={{ marginBottom: 8 }}>
          {label}
        </Text>
      )}
      <View className="w-full flex-row items-center gap-4">{children}</View>
    </View>
  );
}
