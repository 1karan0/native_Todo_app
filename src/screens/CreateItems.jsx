import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const CreateItems = ({ data, setdata }) => {
  const [itemName, setItemName] = useState('');
  const [stock, setStock] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [nameError, setNameError] = useState('');
  const [stockError, setStockError] = useState('');


  const handleAddItem = () => {
  let isValid = true;
  setNameError('');
  setStockError('');

  if (!itemName.trim()) {
    setNameError('Item name is required');
    isValid = false;
  }
  if (!stock.trim()) {
    setStockError('Stock amount is required');
    isValid = false;
  } else if (isNaN(stock) || parseInt(stock) < 0) {
    setStockError('Enter a valid number');
    isValid = false;
  }

  if (!isValid) return;

  const newItem = {
    id: data.length + 1,
    name: itemName.trim(),
    stock: parseInt(stock),
    unit: "kg"
  };

  setdata([...data, newItem]);
  setItemName('');
  setStock('');
};


  const deleteItemHandler = (id) => {
    setdata(data.filter(item => item.id !== id))
  }
  const EditItemHandler = (item) => {
    setIsEditing(true);
    setItemName(item.name);
    setStock(item.stock.toString());
    setEditItemId(item.id);
  }
 const updateItemHandler = () => {
  let isValid = true;
  setNameError('');
  setStockError('');

  if (!itemName.trim()) {
    setNameError('Item name is required');
    isValid = false;
  }
  if (!stock.trim() || isNaN(stock) || parseInt(stock) < 0) {
    setStockError('Enter a valid number');
    isValid = false;
  }

  if (!isValid) return;

  setdata(
    data.map(item =>
      item.id === editItemId
        ? { ...item, name: itemName, stock: parseInt(stock) }
        : item
    )
  );

  setIsEditing(false);
  setItemName('');
  setStock('');
  setEditItemId(null);
};

  return (
    <View style={styles.container}>
     <TextInput
  placeholder='Enter the item...'
  placeholderTextColor="gray"
  style={styles.input}
  value={itemName}
  onChangeText={text => setItemName(text)}
/>
{nameError ? <Text style={styles.error}>{nameError}</Text> : null}

<TextInput
  placeholder='Enter stock amount...'
  placeholderTextColor="gray"
  style={styles.input}
  value={stock}
  keyboardType='numeric'
  onChangeText={text => setStock(text)}
/>
{stockError ? <Text style={styles.error}>{stockError}</Text> : null}
      <Pressable style={styles.button} onPress={() => isEditing ? updateItemHandler() : handleAddItem()}>
        <Text style={styles.btntext}>{isEditing ? "Edit item" : "Add item"}</Text>
      </Pressable>

      <View>
        <View style={styles.headcontainer}>
          <Text style={styles.headingtext}>All Items in the stock </Text>

        </View>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.itemcontainer, { backgroundColor: item.stock < 10 ? "#ffcccc" : "#ccffccff" }, { paddingVertical: 10, marginVertical: 2 }]}>
              <Text style={styles.itemtext}>{item.name}</Text>
              <View style={{ flexDirection: "row", gap: 15 }}>
                <Text style={styles.itemtext}>{item.stock} {item.unit}</Text>
                <Pressable onPress={() => EditItemHandler(item)}>
                  <Text style={styles.itemtext}>Edit</Text>
                </Pressable>
                <Pressable onPress={() => deleteItemHandler(item.id)}>
                  <Text style={styles.itemtext}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
          contentContainerStyle={{ gap: 10 }}
        />
      </View>
    </View>
  )
}

export default CreateItems

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 15,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  input: {
    borderWidth: 1.5,
    color: "black",
    borderColor: "#1dd332b0",
    borderRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  button: {
    backgroundColor: "#CABFEEFF",
    borderRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  btntext: {
    color: "white",
    fontSize: 15,
    fontWeight: "500"
  },
  headcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7

  },
  headingtext: {
    fontSize: 16,
    fontWeight: "500"
  },
  itemcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  itemtext: {
    fontSize: 15,
    fontWeight: "400"
  },
  error: {
  color: 'red',
  fontSize: 13,
  marginTop: -8,
  marginBottom: 5,
}

})