import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AllItems = ({ data }) => {
  return (
    <View>
      <View style={styles.headcontainer}>
        <Text style={styles.headingtext}>Items</Text>
        <Text style={styles.headingtext}>Price</Text>
        <Text style={styles.headingtext}>Quantity</Text>
      </View>

      {data.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20, color: "gray" }}>
          No items available 
        </Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.itemcontainer,
                { backgroundColor: item.stock < 10 ? "#ffcccc" : "#ccffcc" },
                { paddingVertical: 10, marginVertical: 2 }
              ]}
            >
              <Text style={styles.itemtext}>{item.name}</Text>
              <Text style={styles.itemtext}>{item.price}</Text>
              <Text style={styles.itemtext}>{item.stock} {item.unit}</Text>
            </View>
          )}
          contentContainerStyle={{ gap: 10 }}
        />
      )}
    </View>
  )
}

export default AllItems


const styles = StyleSheet.create({
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
    }
})