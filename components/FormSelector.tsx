import { View, Text } from "react-native"
import {Picker} from '@react-native-picker/picker';
import { useController }  from 'react-hook-form'

type FormSelectorProps = {
    label?: string;
    name: string;
    control: any;
    defaultValue?: string;
    options: Array<string | number>;
    w?: string
}

export default function FormSelector({name, label, options, control, w, defaultValue}:FormSelectorProps) {
  const { field } = useController({
    control,
    defaultValue: defaultValue ?? options[0],
    name
  })

    return(
        // @ts-ignore
        <View className='w-full' style={{ flex: w ? `1 1 ${w}` : 1}}>
            {label && <Text className='color-light font-semibold tracking-wide' style={{ marginBottom: 8 }}>{label}</Text>}
            <Picker
              selectedValue={field}
              mode="dialog"
              className='w-full text-sm bg-dark border-2 rounded-md border-darkGray h-10 block color-light outline-none p-2'
              onValueChange={field.onChange}>
              {options.map((opt: string | number) => {
                return(
                    <Picker.Item key={opt} label={String(opt)} value={opt} />
                )
              })}
              
            </Picker>
        </View>
    )
}