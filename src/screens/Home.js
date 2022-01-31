import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  StyleSheet,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../components/Colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const App = () => {
  let data = [
    {value: 'Milk'},
    {value: 'Coffee'},
    {value: 'Oranges'},
    {value: 'Bread'},
  ];

  const [masterData, setMasterData] = useState(data);
  const [inputText, setInputText] = useState('');
  const [filteredData, setFilteredData] = useState(masterData);

  useEffect(() => {
    setFilteredData(masterData);
  }, [masterData]);

  // Add button handler
  const addButtonHandler = () => {
    if (inputText) {
      setMasterData(prevData => [{value: inputText}, ...prevData]);
      setInputText('');
      Keyboard.dismiss();
    } else {
      ToastAndroid.show('Please enter something !', ToastAndroid.SHORT);
    }
  };

  // Search Functionality
  const searchFilter = txt => {
    setInputText(txt);
    if (txt) {
      setFilteredData(
        filteredData.filter(item =>
          item.value.toLowerCase().includes(txt.toLowerCase()),
        ),
      );
    } else {
      setFilteredData(masterData);
    }
  };

  // FlatList Render function
  const renderItems = ({item}) => (
    <View style={styles.itemsCard}>
      <Text style={styles.itemText}>{item.value}</Text>
    </View>
  );

  return (
    <View style={styles.parentContainer}>
      <View style={styles.topContainer}>
        <TextInput
          placeholder="Search"
          style={styles.textInput}
          value={inputText}
          onChangeText={text => searchFilter(text)}
        />
        <TouchableOpacity onPress={addButtonHandler}>
          <Ionicons name="add" size={40} color={colors.black} />
        </TouchableOpacity>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={filteredData}
        renderItem={renderItems}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    marginTop: 20,
    marginHorizontal: 5,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  textInput: {
    fontSize: 20,
    borderWidth: 0.7,
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  itemsCard: {
    borderBottomWidth: 1,
    marginHorizontal: 14,
    borderBottomColor: colors.lightGray,
  },
  itemText: {
    fontWeight: '600',
    fontSize: 25,
    paddingHorizontal: 20,
    marginTop: 10,
  },
});

export default App;
