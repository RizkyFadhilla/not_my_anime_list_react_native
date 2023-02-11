import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";

const styles = StyleSheet.create({});
function DataComponent(params) {
  return (
    <TouchableOpacity
      style={{ flex: 2, flexDirection: "column", marginRight: 5 }}
      onPress={() =>
        params.navigation.navigate("Detail", {
          id: params.data?.id,
        })
      }
    >
      <Image
        source={{ uri: params.data?.imgUrl }}
        style={{ width: 150, height: 200 }}
      />
    </TouchableOpacity>
  );
}
export default DataComponent;
