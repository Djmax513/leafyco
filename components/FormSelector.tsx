import { Picker } from '@react-native-picker/picker';
import { useController } from 'react-hook-form';
import { View, Text } from 'react-native';

type FormSelectorProps = {
  label?: string;
  name: string;
  control: any;
  defaultValue?: string;
  options: (string | number)[];
  w?: string;
};

export default function FormSelector({
  name,
  label,
  options,
  control,
  w,
  defaultValue,
}: FormSelectorProps) {
  const { field } = useController({
    control,
    defaultValue: defaultValue ?? options[0],
    name,
  });

  return (
    // @ts-ignore
    <View className="w-full" style={{ flex: w ? `1 1 ${w}` : 1 }}>
      {label && (
        <Text className="font-semibold tracking-wide color-light" style={{ marginBottom: 8 }}>
          {label}
        </Text>
      )}
      <Picker
        selectedValue={field}
        mode="dialog"
        className="block h-10 w-full rounded-md border-2 border-darkGray bg-dark p-2 text-sm outline-none color-light"
        onValueChange={field.onChange}>
        {options.map((opt: string | number) => {
          return <Picker.Item key={opt} label={String(opt)} value={opt} />;
        })}
      </Picker>
    </View>
  );
}
