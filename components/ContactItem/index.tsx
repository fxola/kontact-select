import React, { FC, memo } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Contact } from "../ContactList";

interface Props {
  item: Contact;
  handleContactSelect: (contact: string) => void;
}

const ContactItem: FC<Props> = ({ item, handleContactSelect }) => {
  const handleSelect = () => {
    handleContactSelect(item.number);
  };

  return (
    <TouchableOpacity
      onPress={handleSelect}
      style={styles.contactWrapper}
      testID={"contact"}
    >
      <View style={styles.imageWrapper}>
        <Image
          testID={"image"}
          source={
            item.image
              ? { uri: item.image }
              : require("../../assets/favicon.png")
          }
          style={styles.image}
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.contactText} testID={"user-detail"}>
          {`${item.name}  (${item.label})`}
        </Text>
        <Text style={styles.contactText} testID={"user-number"}>
          {item.number}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageWrapper: { flex: 0.2 },
  image: {
    borderRadius: 25,
    width: 50,
    height: 50
  },
  textWrapper: { flex: 0.8 },
  contactWrapper: {
    flexDirection: "row",
    padding: 5
  },
  contactText: {
    fontSize: 17,
    padding: 3
  }
});

export default memo(ContactItem);
