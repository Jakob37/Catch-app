import {TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

function IconButton(props: {
  onPress: () => void
  icon: string
  size: number
  color: string
  style: {}
}) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Icon
        name={props.icon}
        size={props.size}
        style={{color: props.color, ...props.style}}></Icon>
    </TouchableOpacity>
  )
}

export {IconButton}
