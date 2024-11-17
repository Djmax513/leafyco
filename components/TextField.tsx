import { useController } from 'react-hook-form';
import { TextInput, View, Text } from 'react-native';
// import { MaskedTextInput } from 'react-native-mask-text';

export function TextField({
  label,
  name,
  control,
  mask,
  defaultValue = '',
  w = '100%',
  ...inputProps
}: any) {
  const { field } = useController({
    control,
    defaultValue,
    name,
  });

  return (
    <View style={{ marginVertical: 4, width: w }} className="w-full">
      <Text className="font-semibold tracking-wide color-light" style={{ marginBottom: 8 }}>
        {label}
      </Text>
      <TextInput
        mask={mask}
        className="block h-10 w-full rounded-md border-2 border-darkGray p-2 outline-none color-light"
        value={field.value}
        onChangeText={(text) => field.onChange(text)}
        {...inputProps}
      />
    </View>
  );
}
