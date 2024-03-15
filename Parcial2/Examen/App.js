import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';

const url = "https://jsonplaceholder.typicode.com/todos";

const App = () => {
  const [data, setData] = useState([]);
  const [option, setOption] = useState(null);
  const [output, setOutput] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOptionSelect = (selectedOption) => {
    switch (selectedOption) {
      case 1:
        printList('Pending IDs', data.map(element => element.id));
        break;
      case 2:
        printList('Titles and IDs', data.map(element => ({ id: element.id, title: element.title })));
        break;
      case 3:
        printList('Unresolved IDs and Titles', data.filter(element => !element.completed).map(element => ({ id: element.id, title: element.title })));
        break;
      case 4:
        printList('Resolved IDs and Titles', data.filter(element => element.completed).map(element => ({ id: element.id, title: element.title })));
        break;
      case 5:
        printList('Pending IDs and UserIDs', data.map(element => ({ id: element.id, userId: element.userId })));
        break;
      case 6:
        printList('Resolved IDs and UserIDs', data.filter(element => element.completed).map(element => ({ id: element.id, userId: element.userId })));
        break;
      case 7:
        printList('Unresolved IDs and UserIDs', data.filter(element => !element.completed).map(element => ({ id: element.id, userId: element.userId })));
        break;
      default:
        break;
    }
    setOption(selectedOption);
  };

  const printList = (title, list) => {
    const formattedList = list.map(item => JSON.stringify(item)).join('\n');
    setOutput(`List of ${title}:\n${formattedList}`);
  };

  const showMenu = () => {
    setOutput(null);
    setOption(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>LEYVA DAVILA JESUS EFRAIN 4-B</Text>
      {option === null ? (
        <ScrollView contentContainerStyle={styles.buttonContainer}>
           <div>
          <Button title="Show all pending IDs" onPress={() => handleOptionSelect(1)} />
          <br />
          <Button title="Show titles and IDs" onPress={() => handleOptionSelect(2)} />
          <br />
          <Button title="Show unresolved IDs and Titles" onPress={() => handleOptionSelect(3)} />
          <br />
          <Button title="Show resolved IDs and Titles" onPress={() => handleOptionSelect(4)} />
          <br />
          <Button title="Show pending IDs and UserIDs" onPress={() => handleOptionSelect(5)} />
          <br />
          <Button title="Show resolved IDs and UserIDs" onPress={() => handleOptionSelect(6)} />
          <br />
          <Button title="Show unresolved IDs and UserIDs" onPress={() => handleOptionSelect(7)} />
          <br />
          </div>
        </ScrollView>
      ) : (
        <View style={styles.resultContainer}>
          <ScrollView>
            <Button title="Back to Menu" onPress={showMenu} />
            <Text style={styles.output}>{output}</Text>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  resultContainer: {
    flex: 1,
  },
  output: {
    marginTop: 20,
    fontFamily: 'monospace',
  },
});

export default App;
