import {Text, TextInput, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

function IconButton(props: {
  onPress: () => void
  icon: string
  size: number
  color: string
}) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Icon
        name={props.icon}
        size={props.size}
        style={{color: props.color}}></Icon>
    </TouchableOpacity>
  )
}

export {IconButton}
