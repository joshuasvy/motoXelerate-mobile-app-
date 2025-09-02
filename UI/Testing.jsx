import React, { useState } from "react";
import { FlatList } from "react-native";
import { Checkbox } from "react-native-paper";

const initialItems = [
  { id: "1", label: "Option A", checked: false },
  { id: "2", label: "Option B", checked: false },
  { id: "3", label: "Option C", checked: false },
];

export default function Testing() {
  const [items, setItems] = useState(initialItems);

  const toggleCheckbox = (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updated);
  };

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Checkbox.Item
          label={item.label}
          status={item.checked ? "checked" : "unchecked"}
          onPress={() => toggleCheckbox(item.id)}
        />
      )}
    />
  );
}
