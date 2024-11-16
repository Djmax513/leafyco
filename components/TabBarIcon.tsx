import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

interface ITabBarIcon {
  name: string;
  variant: 'font-awesome'|'ion-icons'|'material-icons';
  color: string;
}

export const TabBarIcon = ({ name, color, variant='font-awesome' }: ITabBarIcon, ...props: any) => {
  switch (variant) {
    case 'font-awesome':
      return <FontAwesome size={28} name={name} color={color} style={styles.tabBarIcon} {...props} />;
    case 'ion-icons':
      return <Ionicons size={28} name={name} color={color} style={styles.tabBarIcon} {...props} />;
    case 'material-icons':
      return <MaterialCommunityIcons size={28} name={name} color={color} style={styles.tabBarIcon} {...props} />;
    default: 
      return <FontAwesome size={28} name={name} color={color} style={styles.tabBarIcon} {...props} />;
  }
};

export const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
