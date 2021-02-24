import React, { FC } from "react";
import {
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";

interface Props {
  visible: boolean;
  toggleModal: () => void;
  children: React.ReactNode;
}

const CustomModal: FC<Props> = ({ visible, toggleModal, children }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={toggleModal}
      testID={"modal"}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={toggleModal}
        testID={"overlay"}
      >
        <TouchableWithoutFeedback>
          <View style={styles.banner} testID={"child-container"}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: -99
  },
  banner: {
    width: "100%",
    height: "90%",
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  }
});

export default CustomModal;
