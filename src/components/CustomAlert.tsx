import React, {useState, useCallback, useImperativeHandle, forwardRef} from 'react'

import {
    View,
    Text,
    Modal,
    StyleSheet
} from 'react-native'
import Button from './Button'

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
                    <Text>
                        Olá Mundo
                    </Text>
                    <Button
                        title='Fechar Modal'
                        transparent={false}
                        onPress={closeModal}
                    />
                </View>
            </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default forwardRef(CustomAlert)