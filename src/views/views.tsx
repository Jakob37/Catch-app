import {TextInput, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {ds} from '../ux/design'

function InputRow(props: {
  placeholder: string
  icon: string
  textInputValue: string
  handleSave: () => void
  handleChangeText: (newText: string) => void
}): any {
  return (
    <View style={{flexDirection: 'row', alignItems: 'stretch'}}>
      <View style={{flex: 1}}>
        <TextInput
          value={props.textInputValue}
          onChangeText={props.handleChangeText}
          // numberOfLines={ds.textInput.numberOfLines}
          multiline={false}
          placeholder={props.placeholder}
          blurOnSubmit={false}
          onSubmitEditing={_event => {
            props.handleSave()
          }}></TextInput>
      </View>

      <View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingRight: ds.spacing.sideMargins,
          }}>
          <TouchableOpacity onPress={props.handleSave}>
            <Icon
              name={props.icon}
              size={ds.icons.size}
              style={{color: ds.colors.primary}}></Icon>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export {InputRow}
