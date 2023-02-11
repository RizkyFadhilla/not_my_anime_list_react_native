import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

const styles = StyleSheet.create({
  Headers: {
    flex: 1,
    borderBottomWidth: 5,
    borderBottomColor: "black",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
function Headers() {
  return (
    <View style={styles.Headers}>
      <Image
        source={{
          uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.TTVFq45hlVqOzJIrF3JH_gAAAA%26pid%3DApi&f=1&ipt=e5d28f92891159dd156a7ba3c651f37f7bb1aa7323224652324a2659dd62b94d&ipo=images",
        }}
        style={{ width: 40, height: 40, flex: 1 }}
      />
      <View style={{ flex: 5, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "white" }}>Not My Anime List</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <AntDesign name="bells" size={24} color="white" />
      </View>
    </View>
  );
}

export default Headers;
