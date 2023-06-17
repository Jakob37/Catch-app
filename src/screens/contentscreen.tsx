import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, View } from "react-native";
import { RootStackParamList } from "../../App";

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
type DetailsScreenProps = {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
};

function ContentScreen({route}: DetailsScreenProps) {
  return (
    <View>
      <Text>Content screen</Text>
    </View>
  );
}

export default ContentScreen;