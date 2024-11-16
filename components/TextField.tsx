import { StyleSheet, TextInput, View, Text } from 'react-native';
import { useController }  from 'react-hook-form'
import { MaskedTextInput } from "react-native-mask-text";

export function TextField({ label, name, control, mask, defaultValue = "", ...inputProps }: any) {
  const { field } = useController({
    control,
    defaultValue,
    name
  })

  return (
    <View style={{ marginVertical: 4 }} className='w-full'>
      <Text className='color-light font-semibold tracking-wide' style={{ marginBottom: 8 }}>{label}</Text>
      <TextInput
          mask={mask}
          className='w-full border-2 rounded-md border-darkGray h-10 block color-light outline-none p-2'
          value={field.value}
          onChangeText={(text) => field.onChange(text)}
          {...inputProps}
      />
    </View>
  );
}
