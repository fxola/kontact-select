import * as Contacts from "expo-contacts";
import { Contact } from "../components/ContactList";
import uniqBy from "lodash.uniqby";
import { Alert, Platform, ToastAndroid } from "react-native";

export const getContacts = async ({ pageOffset = 0, pageSize = 50 }) => {
  return await Contacts.getContactsAsync({
    fields: [
      Contacts.Fields.PhoneNumbers,
      Contacts.Fields.PhoneNumbers,
      Contacts.Fields.Image
    ],
    pageOffset,
    pageSize
  });
};

export const formatContacts = (data: Array<Contacts.Contact>) => {
  const results = data.reduce((result, item) => {
    if (item.phoneNumbers) {
      let response = item.phoneNumbers.map(phone => ({
        name: item.name,
        label: phone.label,
        number: phone.number!.replace(/[^0-9a-zA-Z]/g, ""),
        image: item.image?.uri,
        id: phone.id
      }));

      result.push(response);
    }
    return result;
  }, [] as Contact[]);

  return uniqBy(results.flat(), "number");
};

export const Toast = (message: string) => {
  if (Platform.OS === "android") {
    return ToastAndroid.show(message, ToastAndroid.SHORT);
  }
  return Alert.alert(message);
};
