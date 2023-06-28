import {Text, TextInput, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {ds, icons} from '../ux/design'
import {Entry} from '../data/entry'
import {formatDate} from '../util/util'

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
          <IconButton
            onPress={props.handleSave}
            icon={props.icon}
            size={ds.icons.size}
            color={ds.colors.primary}></IconButton>
          {/* <TouchableOpacity onPress={props.handleSave}>
            <Icon
              name={props.icon}
              size={ds.icons.size}
              style={{color: ds.colors.primary}}></Icon>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  )
}

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

function EntryRow(props: {entry: Entry; handleRemove: () => void}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingLeft: ds.spacing.sideMargins,
        marginVertical: ds.spacing.verticalPadding,
      }}>
      <View style={{flexDirection: 'column', flex: 1}}>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              color: ds.colors.primary,
              flexWrap: 'wrap',
              fontSize: ds.font.sizes.major,
            }}>
            {props.entry.text}
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: ds.colors.secondary,
                fontSize: ds.font.sizes.minor,
              }}>
              {formatDate(props.entry.date, true)}
            </Text>
            <Text
              style={{
                color: ds.colors.primary,
                fontSize: ds.font.sizes.minor,
              }}>
              {props.entry.tags != null
                ? props.entry.tags.map(tag => `#${tag}`).join(' ')
                : '<No tags>'}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 0,
          justifyContent: 'center',
          paddingRight: ds.spacing.sideMargins,
        }}>
        <TouchableOpacity
          onPress={() =>
            // Temporary fix to get the right entry
            // Should be using index-based system
            props.handleRemove()
          }>
          <Icon
            name={icons.trash}
            size={ds.icons.size}
            style={{color: ds.colors.primary}}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export {InputRow, EntryRow, IconButton}
