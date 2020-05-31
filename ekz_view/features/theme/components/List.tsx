import React from 'react';
import Link from 'next/link';
import { StyleSheet, Text, View } from 'react-native';
import { withApollo } from '../../../lib/apollo';

export interface ThemeType {
  id: number;
  name: string;
  description: string;
}

export interface ListType {
  themes: ThemeType[];
}

type Props = ListType;

const Themes : React.FC<Props> = (props: Props) => {
  const { themes } = props;
  return(
    <View>
      {themes && themes.map((theme) => {return (
        <View key={theme.id}>
          <Link 
            href="/mypage/themes/[themeName]"
            as={`/mypage/themes/${theme.name}`}
          >
            <a>{theme.name}</a>
          </Link>
        </View>
      )})}
    </View>
  )
}

export default withApollo({ ssr: true })(Themes)