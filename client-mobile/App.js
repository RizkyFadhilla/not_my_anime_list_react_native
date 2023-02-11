import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "./pages/Dashboard";
import TabNavigation from "./routes/TabNavigation";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import client from "./config/appoloConfig";

export default function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      </ApolloProvider>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
