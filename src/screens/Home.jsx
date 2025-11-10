import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AllItems from './AllItems'
import CreateItems from './CreateItems'
 

const Home = () => {
    const [view, setview] = useState(0)
    const [data,setdata]=useState([{
    id: 1,name: "wheet",stock: 5,unit: "kg"}, 
    {id: 2,name: "rise",stock: 10,unit: "kg"}, 
    {id: 3,name: "black rise",stock: 5,unit: "kg"}, 
    {id: 4,name: "corn",stock: 12,unit: "kg"}, 
    {id: 5,name: "potato",stock: 5,unit: "kg"}
])
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <View style={styles.buttonContainer}>
                <Pressable style={[styles.button, view === 0 ? { backgroundColor: '#1dd332b0' } : null]} onPress={() => setview(0)}>
                    <Text style={[styles.btntext, view === 0 ? { color: "white" } : null]}>All Items</Text>
                </Pressable>
                <Pressable style={[styles.button, view === 1 ? { backgroundColor: '#1dd332b0' } : null]} onPress={() => setview(1)}>
                    <Text style={[styles.btntext, view === 1 ? { color: "white" } : null]}>Low Stock</Text>
                </Pressable>
                <Pressable style={[styles.button, view === 2 ? { backgroundColor: '#1dd332b0' } : null]} onPress={() => setview(2)}>
                    <Text style={[styles.btntext, view === 2 ? { color: "white" } : null]}>Create</Text>
                </Pressable>
            </View>
            {view === 0 && <AllItems data={data} />}
            {view === 1 && <AllItems data={data.filter((item) => item.stock < 10)} />}
            {view === 2 && <CreateItems data={data} setdata={setdata}/>}
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        padding: '4%',
        backgroundColor: 'white'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black'
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        marginVertical: 10,
    },
    button: {
        paddingVertical: 3.5,
        paddingHorizontal: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#1dd332b0',

    },
    btntext: {
        fontSize: 12,
        color: 'green'
    }

})