import React from "react";
import {
  View,
  Text,
  Pressable,
} from "react-native";

//rerender pagination when the page changes
const Pagination = (item) => {
  const page = item.page;
  const resultsPerPage = item.resultsPerPage;
  const setPage = item.setPage;
  const totalItems = item.totalItems;
  const text = item.text;
  const filterData = item.filterData;
  const setIsLoading = item.setIsLoading;

  function togglePage(num) {
    setIsLoading(true);
    if(text === "") {
      setPage(num);
    } else {
      filterData(num);
    }
    setTimeout(() => {
      setIsLoading(false);
      console.log(page)
    }, 500);
  }

  return (
    <View className="bg-black space-x-8 justify-center flex flex-row w-full h-14 absolute bottom-16 left-0">
      {page > 2 && (
        <Pressable onPress={() => togglePage(page - 2)}>
          <Text className="text-white bg-red-500 font-bold border-white border-2 w-9 h-9 pt-1 text-center pagination text-lg mt-2">{page - 2}</Text>
        </Pressable>
      )}
      {page > 1 && (
        <Pressable onPress={() => togglePage(page - 1)}>
          <Text className="text-white bg-red-500 font-bold border-white border-2 w-9 h-9 pt-1 text-center pagination text-lg mt-2">
            {page - 1}
          </Text>
        </Pressable>
      )}
      <Pressable>
        <Text className="text-red-500 bg-white border-white border-2 w-9 h-9 pt-1 text-center pagination text-lg mt-2">
          {page}
        </Text>
      </Pressable>
      {page < Math.ceil(totalItems / resultsPerPage - 1) && (
        <Pressable onPress={() => togglePage(page + 1)}>
          <Text className="text-white bg-red-500 font-bold border-white border-2 w-9 h-9 pt-1 text-center pagination text-lg mt-2">
            {page + 1}
          </Text>
        </Pressable>
      )}
      {page < Math.ceil(totalItems / resultsPerPage - 2) && (
        <Pressable onPress={() => togglePage(page + 2)}>
          <Text className="text-white bg-red-500 font-bold border-white border-2 w-9 h-9 pt-1 text-center pagination text-lg mt-2">
            {page + 2}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default Pagination;
