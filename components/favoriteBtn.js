import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";

const FavoriteBtn = (item) => {
  //useState toggled
  const [toggled, setToggled] = useState(false);

  const toggledButton = toggled ? "opacity-100" : "opacity-50";

  //check if the item is in the favorites array
  const isFavorite = item.favorites.some(
    (favorite) => favorite.email === item.items.email
  );

  const viewOnLoad = () => {
    if (isFavorite) {
      setToggled(true);
    }
  };

  React.useEffect(() => {
    viewOnLoad();
  }, []);

  //toggle the button
  const toggleValue = () => {
    setToggled(!toggled);
    if (!toggled) {
      item.setFavorites([...item.favorites, item.items]);
    } else {
      item.setFavorites(
        item.favorites.filter((favorite) => favorite.email !== item.items.email)
      );
    }
  };

  return (
    <TouchableOpacity className={toggledButton} onPress={toggleValue}>
      <Text className="text-2xl">{item.emoji}</Text>
    </TouchableOpacity>
  );
};

export default FavoriteBtn;
