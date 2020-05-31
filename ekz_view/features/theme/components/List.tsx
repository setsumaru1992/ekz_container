import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withApollo } from '../../../lib/apollo';

export interface ThemeType {
  id: number;
  name: string;
  description: string;
}

export interface ThemesType {
  themes: ThemeType[];
}

interface Props {}

const Themes : React.FC = (props: Props) => {
  return(
    <View>
      <Text>theme list</Text>
    </View>
  )
}

export default withApollo({ ssr: true })(Themes)