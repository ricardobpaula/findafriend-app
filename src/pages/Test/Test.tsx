import React from 'react'

import {
  View,
  StyleSheet
} from 'react-native'
import Button from '../../components/buttons/Button'

const Test:React.FC = () => {
  async function test () {
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Button
          title='Testar'
          transparent={false}
          onPress={test}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    width: '100%',
    paddingHorizontal: 50
  }
})

export default Test
