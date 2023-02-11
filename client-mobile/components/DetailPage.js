import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import { FetchOneAnime } from "../config/queries";
import { useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";

function DetailPage(params) {
  // const [detail, setDetail] = useState({});
  const AnimeId = params.id;
  let { loading, error, data } = useQuery(FetchOneAnime, {
    variables: {
      getOneDataId: AnimeId,
    },
  });
  if (loading) {
    return (
      <View>
        <ActivityIndicator />
        <ActivityIndicator size="large" />
      </View>
    );
  } else if (error) {
    <View>
      <Text> Something Error</Text>
    </View>;
  } else {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            borderBottomColor: "white",
            borderBottomWidth: 2,
          }}
        >
          <View
            style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}
          >
            <View style={{ flex: 1, justifyContent: "center", marginLeft: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  params.navigation.navigate("Home");
                }}
              >
                <Ionicons name="arrow-back" size={28} color="white" />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 5 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 28, color: "white" }}
              >
                {data.getOneData.title}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 10, padding: 5, backgroundColor: "black" }}>
          <ScrollView>
            <View style={{ flex: 1, flexDirection: "row", marginTop: 5 }}>
              {/* ini component image */}
              <View style={{ flex: 2, backgroundColor: "black" }}>
                <View>
                  <Image
                    source={{ uri: data.getOneData.imgUrl }}
                    style={{
                      width: 200,
                      height: 300,
                      marginLeft: 30,
                    }}
                  />
                </View>
              </View>
              {/* ini component rate dan */}
              <View
                style={{
                  alignItems: "flex-end",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 28, fontWeight: "bold" }}
                >
                  Score
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "white", fontSize: 26 }}>
                    {data.getOneData.rating}
                  </Text>
                  <FontAwesome
                    name="star"
                    size={26}
                    color="yellow"
                    style={{ marginTop: 5 }}
                  />
                </View>
                <View>
                  <Text></Text>
                </View>
                <Text
                  style={{ color: "white", fontSize: 28, fontWeight: "bold" }}
                >
                  Genre
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "white", fontSize: 26 }}>
                    {data.getOneData.Genre?.name}
                  </Text>
                </View>
                <Text></Text>
                <Text
                  style={{ color: "white", fontSize: 28, fontWeight: "bold" }}
                >
                  Author
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "white", fontSize: 26 }}>
                    {data.getOneData.user?.username}
                  </Text>
                </View>
                {/* ini component rate dan */}
              </View>
            </View>
            <View style={{ flex: 10 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  textAlign: "justify",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                {data.getOneData.synopsis}
              </Text>
              <View>
                <YoutubePlayer
                  height={200}
                  play={false}
                  videoId={data.getOneData.trailerUrl?.slice(30)}
                />
              </View>
              <Text style={{ color: "white", fontSize: 20, marginTop: 0 }}>
                Character :
              </Text>
              <FlatList
                horizontal
                style={{ marginTop: 10 }}
                data={data.getOneData.Casts}
                renderItem={({ item }) => (
                  <>
                    <ImageBackground
                      source={{ uri: item.profilePict }}
                      style={{
                        width: 200,
                        height: 300,
                        flexDirection: "column-reverse",
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 18,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                    </ImageBackground>
                  </>
                )}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
export default DetailPage;
