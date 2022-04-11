import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import HeaderModal from '../HeaderModal'
import api from '../../services/api'
import CustomModal, { CustomModalHandles } from '../modals/CustomModal'

export interface InputSpecieHandles {
  openModal: ()=>void
}

interface InputSpecieProps {
  title: string;
  specie?: Specie;
  onChange: (specie?: Specie)=>void
}

const InputSpecie:React.ForwardRefRenderFunction<InputSpecieHandles, InputSpecieProps> = ({ title, specie, onChange }, ref) => {
  const customModalRef = useRef<CustomModalHandles>(null)
  const [value, setValue] = useState(specie)
  const [species, setSpecies] = useState<Specie[]>()

  async function fetchSpecies () {
    try {
      const { data, status } = await api.get<Specie[]>('/species')

      if (status !== 200) {
        return console.log(data)
      }
      setSpecies(data)
      if (data) {
        setValue(data[0])
      }
    } catch (e) {
      console.log(e)
    }
  }
  function openModal () {
    customModalRef.current?.open()
  }

  function closeModal () {
    onChange(value)
    customModalRef.current?.close()
  }

  useEffect(() => {
    fetchSpecies()
  }, [])
  useImperativeHandle(ref,
    () => ({
      openModal: openModal
    })
  )

  return (
    <CustomModal
        height={Dimensions.get('screen').height * 0.6}
        Header={
          <HeaderModal
          title=''
          onClose={closeModal}
          onSave={closeModal}
          showSaveButton={true}
         />
          }
        ref={customModalRef}
      >
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {
          species?.map(item => (
            <TouchableOpacity
              style={styles.radioButton}
              activeOpacity={0.7}
              key={item.id}
              onPress={() => value === item ? setValue(undefined) : setValue(item)}
            >
              <Text style={styles.text}>{item.name}</Text>
              <MaterialIcons
              style={{ paddingHorizontal: 10 }}
                size={26}
                color={colors.orange_dark}
                name={item === value ? 'radio-button-on' : 'radio-button-off'}
              />
            </TouchableOpacity>
          ))
        }
      </View>
    </CustomModal>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  content: {
    padding: 20
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 26,
    color: colors.black
  },
  radioButton: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 25,
    borderWidth: 1,
    marginVertical: 10,
    borderColor: colors.heading
  },
  text: {
    fontFamily: fonts.complement,
    paddingHorizontal: 10,
    fontSize: 20,
    textTransform: 'capitalize'
  }
})
export default forwardRef(InputSpecie)
