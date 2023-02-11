import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import DataList from "../components/DataList";
import Headers from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@apollo/client";
import { FetchAnime, GetAllGenre } from "../config/queries";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  contentOutside: {
    flex: 15,
    backgroundColor: "gray",
    justifyContent: "center",
    flexDirection: "column",
  },
  textComponent: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom:5
  },
});

function Seasonal({ navigation }) {
  let { loading, error, data } = useQuery(FetchAnime);
  let {
    loading: genreLoading,
    error: errorGenre,
    data: genreData,
  } = useQuery(GetAllGenre);
  if (loading) {
    return (
      <View>
        <ActivityIndicator />
        <ActivityIndicator size="large" />
      </View>
    );
  } else if (genreLoading) {
    return (
      <View>
        <ActivityIndicator />
        <ActivityIndicator size="large" />
      </View>
    );
  } else if(error){
    <View>
      <Text> Something Error</Text>
    </View>
  } else if(errorGenre){
    <View>
      <Text> Something Error</Text>
    </View>
  }  
  
  else {
    let animeData = data.getAllData;
    let filterData = (params) =>
      animeData.filter((el) => {
        return el.Genre?.name === params;
      });
    console.log(genreData);
    return (
      <SafeAreaView style={styles.container}>
        <Headers />
        <View style={{ flex: 10, backgroundColor: "black" }}>
          <ScrollView>
            <Text style={styles.textComponent}>All Data :</Text>
            <View style={{marginBottom:10}}>
            <DataList
              data={animeData}
              navigation={navigation}
            />
            </View>
            {genreData.getAllGenre.map((el) => {
              if (filterData(el.name).length === 0) {
                return(
                  <View key={el.id}></View>
                )
              } else {
                return (
                  <View style={{ marginBottom: 10 }} key={el.id}>
                    <Text style={styles.textComponent}>{el.name} :</Text>
                    <DataList
                      data={filterData(el.name)}
                      navigation={navigation}
                    />
                  </View>
                );
              }
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
export default Seasonal;
