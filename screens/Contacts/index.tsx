import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";

//components
import ContactList from "../../components/ContactList";
import CustomModal from "../../components/Modal";

const Contacts = () => {
  const [phone, setPhone] = useState("");
  const [visible, setIsvisible] = useState(false);

  const toggleModal = useCallback(() => {
    setIsvisible(!visible);
  }, [visible]);

  return (
    <View style={styles.container}>
      <TextInput
        defaultValue={phone}
        editable={!!phone}
        style={styles.inputStyle}
        accessibilityLabel="phone input"
      />
      <Pressable
        onPress={toggleModal}
        style={({ pressed }) => [
          { backgroundColor: pressed ? "rgba(0,0,0,0.5)" : "black" },
          styles.buttonStyle
        ]}
      >
        <Text style={styles.buttonText}>Select Contact</Text>
      </Pressable>

      {visible && (
        <CustomModal visible={visible} toggleModal={toggleModal}>
          <ContactList setPhone={setPhone} toggleModal={toggleModal} />
        </CustomModal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  inputStyle: {
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "black",
    width: "70%",
    padding: 7
  },
  buttonStyle: {
    width: "70%",
    padding: 10,
    alignItems: "center"
  },
  buttonText: { color: "white" }
});

export default Contacts;
