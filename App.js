import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import Task from "./src/Task";

const App = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  handleAddTodo = () => {
    if (value.length > 0) {
      setTodos([...todos, { text: value, key: Date.now(), checked: false }]);
      setValue("");
    }
  };

  handleDeleteTodo = id => {
    setTodos(
      todos.filter(todo => {
        if (todo.key !== id) return true;
      })
    );
  };

  handleChecked = id => {
    setTodos(
      todos.map(todo => {
        if (todo.key === id) todo.checked = !todo.checked;
        return todo;
      })
    );
  };

  return (
    <ImageBackground
      source={{
        uri:
          "https://wallpapertag.com/wallpaper/full/3/4/d/121586-new-red-gradient-background-2560x1600-for-phone.jpg"
      }}
      style={styles.container}
    >
      <Text style={{ marginTop: "10%", fontSize: 16, color: "white" }}>
        Today
      </Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          multiline={true}
          onChangeText={value => setValue(value)}
          placeholder={"Do it now!"}
          placeholderTextColor="white"
          value={value}
        />
        <TouchableOpacity onPress={() => handleAddTodo()}>
          <Icon name="plus" size={30} color="#900" style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ width: "100%" }}>
        {todos.map(task => (
          // pass the functions as props
          <Task
            text={task.text}
            key={task.key}
            checked={task.checked} // toggle the checked icon
            setChecked={() => handleChecked(task.key)}
            delete={() => handleDeleteTodo(task.key)}
          />
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  textInput: {
    height: 20,
    flex: 1,
    minHeight: "7%",
    marginTop: "5%",
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    paddingLeft: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    borderColor: "rgb(222,222,222)",
    borderBottomWidth: 1,
    paddingRight: 10,
    paddingBottom: 5
  }
});

export default App;
