import { FlatList } from "react-native";
import DataComponent from "./DataComponent";

function DataList(params) {
  return (
    <>
      <FlatList
        horizontal
        data={params.data}
        renderItem={({ item }) => (
          <DataComponent
            key={item.id}
            data={item}
            navigation={params.navigation}
          />
        )}
      />
    </>
  );
}

export default DataList;
