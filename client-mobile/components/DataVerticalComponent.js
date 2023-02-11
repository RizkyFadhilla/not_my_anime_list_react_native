import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const styles = StyleSheet.create({});
function DataVerticalComponent(params) {
  return (
    <TouchableOpacity
      style={{ backgroundColor: "black", borderWidth: 3, width: "50%" }}
      onPress={() =>
        params.navigation.navigate("Detail", {
          id: params.data.id,
        })
      }
    >
      <ImageBackground
        source={{ uri: params.data.imgUrl }}
        style={{ width: "100%", height: 250, flexDirection: "column-reverse" }}
        resizeMode="cover"
      >
        <View style={{ flexDirection: "row", lineHeight: 40, marginLeft: 10 }}>
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontWeight: "bold",
              marginBottom: 20,
              opacity: 0.9,
              backgroundColor: "#000000c0",
            }}
          >
            {params.data.rating}
          </Text>
          <FontAwesome
            name="star"
            size={24}
            color="yellow"
            style={{
              fontSize: 20,
              paddingTop: 3,
              fontWeight: "bold",
              marginBottom: 20,
              opacity: 0.9,
              backgroundColor: "#000000c0",
            }}
          />
        </View>
      </ImageBackground>
      <View style={{ marginBottom: 10, flex: 1 }}>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {params.data.title}
        </Text>
        <Text style={{ color: "white" }}>{params.data.Genre?.name}</Text>
      </View>
    </TouchableOpacity>
  );
}
export default DataVerticalComponent;
