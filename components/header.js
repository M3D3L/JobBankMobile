import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";

const Header = (item) => {
  const setPage = item.setPage;
  const filterData = item.filterData;
  const setIsLoading = item.setIsLoading;
  const text = item.text;
  const setText = item.setText;

  const textRef = useRef();

  //resets the page to the original data
  async function resetPage() {
    setIsLoading(true);
    setPage(1);
    setText("");
    textRef.current.clear();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  function updateData() {
    setIsLoading(true);
    if (text === "") {
      resetPage();
    } else {
      filterData(1);
    }
  }

  //helps persist the text input value
  useEffect(() => {
    textRef.current.setNativeProps({ text: text });
  }, []);

  return (
    <View className="w-full absolute left-0 top-0 px-4 h-20 flex justify-center flex-row content-center bg-slate-700">
      <TouchableOpacity className="mt-2">
        {/*LOGO*/}
        <Pressable onPress={resetPage} className="mt-7 w-24">
          <Text className="text-2xl text-white">🇨🇦 Jobs</Text>
        </Pressable>
      </TouchableOpacity>
      <View className="ml-auto h-8 mt-9 rounded-md overflow-hidden flex w-48 flex-row">
        {/*SEARCH BAR*/}
        <TextInput
          ref={textRef}
          onChangeText={(newText) => setText(newText)}
          className="px-2 h-8 text-base bg-white w-32 text-slate-900"
          placeholder="🔍 Search"
        />
        {/*SEARCH BUTTON*/}
        <Pressable onPress={updateData} className="h-full w-16 bg-red-500">
          <Text className="text-base pt-1 focus:bg-red-400 text-center text-white">Search</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
