import { View } from 'react-native';

import { COLORS } from '~/theme/themeColors';

export function PageContainer({ children }: any) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.dark,
        paddingBottom: 100,
      }}>
      {children}
    </View>
  );
}
