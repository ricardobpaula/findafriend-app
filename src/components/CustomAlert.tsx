import React from 'react'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Modal
} from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface CustomAlertProps {
    title: string,
    message: string,
    type:'alert'|'confirm',
    changeModalVisible?: boolean
}

const CustomAlert: React.FC<CustomAlertProps> = ({title, message, type,changeModalVisible}) => {
    
    function closeModal(response:boolean){
        changeModalVisible = false
    }
    return (
        <TouchableOpacity
            disabled={true}
            style={styles.container}
        >
            <Modal
                visible={true}
                style={styles.content}
                transparent={true}
            >   
                <View style={styles.content}>
                
                    <View style={styles.modal}>
                        <View style={styles.textView}>
                            <Text style={styles.header}>
                                {title}
                            </Text>

                            <Text style={styles.text}>
                                {message}
                            </Text>
                        </View>
                        <View style={styles.buttonsView}>
                            { type==='confirm' &&    
                                <TouchableOpacity 
                                    style={styles.button}
                                    onPress={() => closeModal(false)}
                                >
                                    <Text style={styles.textButton}>
                                        Cancelar
                                    </Text>
                                </TouchableOpacity>
                            }
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.textButton}>
                                    {type ==='confirm' ? 'Confirmar' : 'OK'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    )   
}

export default CustomAlert

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        width: '100%',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        minHeight: 100,
        maxHeight: '60%',
        width: Dimensions.get('window').width-80,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 10,
    },
    textView: {
        padding: 10,
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 0.5,
    },
    header: {
        fontSize: 18,
        margin: 5,
        fontFamily: fonts.heading,
        color: colors.black
    },
    text: {
        // flex: 1,
        fontSize: 14,
        fontFamily: fonts.text,
        color: colors.black
    },
    buttonsView: {
        width: '100%',
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center'
    },
    textButton: {
        margin: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.blue
    }

})