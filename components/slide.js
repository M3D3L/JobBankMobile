//create a slides component that will be used in the App.js file
import React from "react";
import { View, Text, TouchableOpacity, Linking, Pressable } from "react-native";
import FavoriteBtn from "./favoriteBtn";

const navTo = (item) => {
  Linking.openURL(item);
};

const Slide = (item) => {
  const items = {
    jobTitle: item.jobTitle,
    business: item.business,
    location: item.location,
    salary: item.salary,
    jobUrl: item.jobUrl,
    email: item.email,
    date: item.date
  };

  const sendMail = () => {
    Linking.openURL(`mailto:${item.email}`);
  };

  return (
    <TouchableOpacity
      key={item.email}
      className="px-4  relative"
      onPress={() => {
        navTo(item.jobUrl);
      }}
    >
      <View className="bg-white px-4 relative shadow-md rounded-sm h-40 w-full cursor-pointer mb-4">
        <Text
          numberOfLines={1}
          className="text-lg flex uppercase pt-2 text-red-500 font-semibold"
        >
          🍁{item.jobTitle}
        </Text>
        <Text numberOfLines={1} className="text-base text-slate-900">
          {item.business}
        </Text>
        <Text numberOfLines={1} className="text-base text-slate-900">
          {item.location}
        </Text>
        <Text onPress={sendMail} numberOfLines={1} className="text-base underline text-blue-500">
          {item.email}
        </Text>
        <Text numberOfLines={1} className="text-base text-slate-900">
          {item.salary}
        </Text>
        <View className="text-sm flex justify-between flex-row text-slate-700 w-full">
          <Text>{item.date}</Text>

          <Pressable className="-top-4">
            <FavoriteBtn
              emoji="❤️"
              items={items}
              favorites={item.favorites}
              setFavorites={item.setFavorites}
            />
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Slide;
