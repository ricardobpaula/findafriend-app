import React, {useState, useImperativeHandle, forwardRef} from 'react'

import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native'

import Button from './Button'

import coffee from '../assets/coffee.png'
import { colors } from 'react-native-elements'

export interface AlertHandles {
    openModal: ()=> void
}

const CustomAlert:React.ForwardRefRenderFunction<AlertHandles> = (props,ref) => {
    const [visible, setVisible] = useState(true)
    
    function openModal() {
        setVisible(true)
    }

    function closeModal() {
        setVisible(false)
    }

    useImperativeHandle(ref, () => {
        return {
            openModal
        }
    })

    return (
        <Modal
            animationType='slide'
            visible={visible}
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text>
                        Titulo
                    </Text>
                    <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan, mauris quis ullamcorper condimentum, neque nibh dictum nisl, sed pretium nisl sem nec neque. Integer congue pulvinar velit, ut euismod leo commodo a. Nulla et elit eget sem hendrerit gravida ut eu urna. Nullam gravida ligula a sagittis laoreet. Ut interdum porta odio, pellentesque maximus mauris blandit non. Suspendisse mollis malesuada felis, ut laoreet justo elementum in. Sed sit amet posuere nisl.
                    </Text>
                    <Image 
                        source={coffee}
                        style={styles.image}
                        resizeMode='contain'
                    />
                    <View style={styles.footer}>
                        <Button
                            title='Cancelar'
                            transparent={false}
                            onPress={closeModal}
                        />
                        {/* <Button
                            title='Confirmar'
                            transparent={false}
                            onPress={closeModal}
                        /> */}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        minHeight: 400,
        maxHeight: '80%',
        width: Dimensions.get('window').width - 80,
        backgroundColor: colors.white,
        borderRadius: 10,
        justifyContent: 'space-around'
    },
    image: {
        margin: 10,
        height: Dimensions.get('window').width * 0.7
    },
    footer: {
        padding: 10,
        flexDirection: 'row',
        width: '100%',
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'red'
    }
})

export default forwardRef(CustomAlert)