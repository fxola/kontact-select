import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState
} from "react";
import { View, FlatList, StyleSheet, Text, Linking } from "react-native";
import * as Contacts from "expo-contacts";

//components
import ContactItem from "../ContactItem";

//utils
import { formatContacts, getContacts } from "../../utils";

interface Props {
  setPhone: Dispatch<SetStateAction<string>>;
  toggleModal: () => void;
}

export interface Contact {
  name: string;
  label: string;
  number: string;
  image: string | undefined;
  id: string;
}

const ContactList: FC<Props> = ({ setPhone, toggleModal }) => {
  const [denied, setDenied] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [nextPage, setNextpage] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        denied && setDenied(false);
        const { data, hasNextPage } = await getContacts({
          pageOffset: 0,
          pageSize: 50
        });
        setNextpage(hasNextPage);
        if (data.length) {
          const results = formatContacts(data);
          setContacts(results);
        }
      } else {
        setDenied(true);
      }
    })();
  }, []);

  const openSettings = () => Linking.openSettings();

  if (denied) {
    return (
      <View style={styles.denialContainer}>
        <Text style={styles.denialText}>
          Go to
          <Text onPress={openSettings} style={styles.settingText}>
            {" "}
            Settings{" "}
          </Text>
          to enable access to your contacts
        </Text>
      </View>
    );
  }

  if (!contacts.length) {
    return (
      <View style={styles.denialContainer} testID={"no-contact"}>
        <Text style={styles.denialText}>No contacts</Text>
      </View>
    );
  }

  const handleContactSelect = (contact: string) => {
    setPhone(contact);
    toggleModal();
  };

  const renderContact = ({ item }: { item: Contact }) => {
    return (
      <ContactItem item={item} handleContactSelect={handleContactSelect} />
    );
  };

  const onEndReached = () => {
    if (nextPage) {
      getContacts({
        pageOffset: contacts.length,
        pageSize: 50
      }).then(({ data, hasNextPage }) => {
        setNextpage(hasNextPage);
        if (data.length) {
          const results = formatContacts(data);
          setContacts(prev => [...prev, ...results]);
        }
      });
    }
  };

  return (
    <FlatList
      keyExtractor={({ number }, index) => number + index}
      data={contacts}
      renderItem={renderContact}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={() => <View style={styles.divider} />}
      onEndReachedThreshold={1}
      onEndReached={onEndReached}
    />
  );
};

const styles = StyleSheet.create({
  denialContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  denialText: {
    fontSize: 17
  },
  settingText: {
    color: "blue"
  },
  listContainer: {
    flexGrow: 1,
    padding: 20
  },
  divider: {
    borderBottomColor: "#f3f3f3",
    borderBottomWidth: 2
  }
});

export default ContactList;
