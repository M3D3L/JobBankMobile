import React from "react";
import { View, TouchableOpacity, Text, Linking } from "react-native";

const BottomNav = (item) => {
  const setDataArray = item.setDataArray;
  const favorites = item.favorites;
  const setPage = item.setPage;
  const setText = item.setText;
  const setLookForChanges = item.setLookForChanges;

  const arrayToFavorites = () => {
    setDataArray(favorites);
  };

  const resetArray = () => {
    setLookForChanges(true);
    setText("");
    setPage(1);
  };

  const goToPage = () => {
    //got to website
    Linking.openURL(
      "https://www.canada.ca/en/services/immigration-citizenship.html"
    );
  };

  const goToPageTwo = () => {
    //got to website
    Linking.openURL("https://www.buymeacoffee.com/GuillermoMedel?new=1");
  };

  return (
    <View className="w-full absolute left-0 bottom-0 px-4 h-16 flex justify-evenly pt-4 flex-row content-center bg-slate-700">
      <TouchableOpacity>
        <Text onPress={resetArray} className="text-2xl">
          🏠
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text onPress={arrayToFavorites} className="text-2xl">
          ❤️
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text onPress={goToPage} className="text-2xl">
          ✈️
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text onPress={goToPageTwo} className="text-2xl">
          ☕️
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;
