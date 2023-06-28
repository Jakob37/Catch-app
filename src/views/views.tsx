import {Text, TextInput, View} from 'react-native'
import {Entry} from '../data/entry'
import {formatDate} from '../util/util'
import {ds} from '../ux/design'
import {IconButton} from './iconbutton'
import {icons} from '../ux/icons'

// FIXME: Refactor
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

      {props.icon != '' ? (
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
          </View>
        </View>
      ) : (
        ''
      )}
    </View>
  )
}
InputRow.defaultProps = {
  icon: '',
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
        <IconButton
          onPress={() => props.handleRemove()}
          icon={icons.trash}
          size={ds.icons.size}
          color={ds.colors.primary}></IconButton>
      </View>
    </View>
  )
}

export {EntryRow, IconButton, InputRow}
