import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slide from "./components/slide";
import Header from "./components/header";
import BottomNav from "./components/bottomNav";
import Pagination from "./components/pagination";
import Spinner from "react-native-loading-spinner-overlay";

export default function App() {
  //displays the total results
  const [totalItems, setTotalItems] = useState([]);
  //displays the current page
  const [page, setPage] = useState(1);
  //displays the favorites
  const [favorites, setFavorites] = useState([]);
  //displays the data for the current page
  const [dataArray, setDataArray] = useState([]);
  //displays the loading spinner
  const [isLoading, setIsLoading] = useState(true);
  //allows to disable the useEffect when filtering
  const [lookForChanges, setLookForChanges] = useState(true);
  //displays the search text
  const [text, setText] = useState("");

  const resultsPerPage = 25;

  //returns the results for the current page
  function spliceData(json) {
    let clone = [...json];
    setTotalItems(clone.length);
    setDataArray(
      //splice only 25 items from the array from the current page number
      clone.splice((page - 1) * resultsPerPage, resultsPerPage)
    );
    setIsLoading(false);
    scrollToTop();
  }

  //fetches the data from the api and cleans it
  async function fetchDataApi() {
    await fetch(`https://guillermomedel.com/assets/data.json`)
      .then((response) => response.json())
      .then((json) => {
        setIsLoading(true);
        return spliceData(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchDataApi();
  }, []);

  async function filterData(num) {
    await fetch(`https://guillermomedel.com/assets/data.json`)
      .then((response) => response.json())
      .then((json) => {
        //disable the useEffect that updates the data when the page changes
        setLookForChanges(false);
        setIsLoading(true);
        return json;
      })
      .then((json) => {
        setPage(num);
        console.log(page)
        return json;
      })
      .then((json) => {
        let newText = text;
        let clone = [...json];
        let filtered = clone.filter(
          (item) =>
            item.jobTitle.toLowerCase().includes(newText.toLowerCase()) ||
            item.location.toLowerCase().includes(newText.toLowerCase())
        );
        spliceData(filtered);
      })
      .then(() => {
        setLookForChanges(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //useEffect to update the data when the page changes
  useEffect(() => {
    if (lookForChanges) {
      fetchDataApi();
    } else {
      return;
    }
  }, [page]);

  //on favorite change, save to AsyncStorage
  useEffect(() => {
    AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  //on load, get favorites from AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem("favorites").then((value) => {
      if (value !== null) {
        setFavorites(JSON.parse(value));
      }
    });
  }, []);

  const flatListRef = React.useRef(null);

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
  };

  const renderSlide = ({ item }) => (
    <Slide
      key={item.id}
      jobTitle={item.jobTitle}
      business={item.business}
      location={item.location}
      date={item.date}
      jobUrl={item.jobUrl}
      salary={item.salary}
      email={item.email}
      favorites={favorites}
      setFavorites={setFavorites}
    />
  );

  return (
    <View className="w-full h-full bg-slate-200 pt-24">
      <StatusBar style="light" />
      {!isLoading && (
        <Header
          setPage={setPage}
          filterData={filterData}
          setIsLoading={setIsLoading}
          text={text}
          setText={setText}
        />
      )}

      <Spinner
        visible={isLoading}
        textContent={"Loading Jobs 🍁"}
        textStyle={styles.spinnerTextStyle}
      />

      {dataArray.length != null && !isLoading && (
        <View>
          <FlatList
            ref={flatListRef}
            data={dataArray}
            renderItem={renderSlide}
            keyExtractor={(item) => item.email.toString()}
            pagingEnabled={false}
            showDefaultLoadingIndicators={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={true}
            decelerationRate="fast"
            contentContainerStyle={{ paddingBottom: 140 }}
            maxToRenderPerBatch={5}
            initialNumToRender={5}
            getItemLayout={(data, index) => ({
              length: 100,
              offset: 100 * index,
              index,
            })}
          />
        </View>
      )}

      {!isLoading && (
        <Pagination
          page={page}
          resultsPerPage={resultsPerPage}
          setPage={setPage}
          totalItems={totalItems}
          text={text}
          filterData={filterData}
          setIsLoading={setIsLoading}
        />
      )}

      {!isLoading && (
        <BottomNav
          setDataArray={setDataArray}
          favorites={favorites}
          setPage={setPage}
          fetchDataApi={fetchDataApi}
          setText={setText}
          setLookForChanges={setLookForChanges}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  }
});
