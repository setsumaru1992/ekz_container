import { StyleSheet, Text, View } from 'react-native';
import { withApollo } from '../../lib/apollo';

const IndexPage = () => (
  <View style={styles.container}>
    <Text accessibilityRole="header" style={styles.text}>
      React Native for Web & Next.js
    </Text>

    {/* <Text style={styles.link} accessibilityRole="link" href="https://google.com"> */}
    <Text style={styles.link} >
      A universal link
    </Text>

    <View style={styles.textContainer}>
      <Text accessibilityRole="header" aria-level="2" style={styles.text}>
        Subheader
      </Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  link: {
    color: 'blue',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  text: {
    alignItems: 'center',
    fontSize: 24,
    marginBottom: 24,
  },
})

export default withApollo({ ssr: true })(IndexPage)
