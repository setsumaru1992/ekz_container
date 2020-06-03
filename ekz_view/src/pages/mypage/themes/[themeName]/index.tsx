import { Text, View } from 'react-native';
import { withApollo } from '../../../../../lib/apollo';

const ChoiceList = () => (
  <View>
    <Text>ChoiceList</Text>
  </View>
)
export default withApollo()(ChoiceList)
