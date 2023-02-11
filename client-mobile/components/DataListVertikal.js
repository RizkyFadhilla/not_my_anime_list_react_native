import { FlatList } from "react-native";
import DataVerticalComponent from "./DataVerticalComponent";

function DataVerticalList(params) {
  return (
    <>
      <FlatList
        numColumns={2}
        data={params.data}
        renderItem={({ item }) => (
          <DataVerticalComponent data={item} navigation={params.navigation} />
        )}
      />
    </>
  );
}

export default DataVerticalList;
