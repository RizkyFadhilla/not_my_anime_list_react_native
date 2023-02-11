import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Headers from "../components/Header";
import { useQuery } from "@apollo/client";
import { FetchAnime } from "../config/queries";
import DataVerticalList from "../components/DataListVertikal";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentOutside: {
    flex: 10,
    backgroundColor: "black",
  },
});

function Dashboard({ navigation }) {
  let { loading, error, data } = useQuery(FetchAnime);
  if (loading) {
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
  } 
  else {
    return (
      <SafeAreaView style={styles.container}>
        <Headers />
        <View style={styles.contentOutside}>
          <DataVerticalList
            page={"Dashboard"}
            data={data.getAllData}
            navigation={navigation}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default Dashboard;
