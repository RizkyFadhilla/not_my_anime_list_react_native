import DetailPage from "../components/DetailPage";
function Detail({ route, navigation }) {
  const { id } = route.params;
  return (
    <>
      <DetailPage id={id} navigation={navigation} />
    </>
  );
}

export default Detail;
