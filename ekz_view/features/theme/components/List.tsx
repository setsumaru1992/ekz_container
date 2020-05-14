import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withApollo } from '../../../lib/apollo';

interface Props {}

const Themes : React.FC = (props: Props) => {
  return(
    <View>
      theme list
    </View>
  )
}

export default withApollo({ ssr: true })(Themes)