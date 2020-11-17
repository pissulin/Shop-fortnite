import React, {useState, useEffect} from 'react';
import {
        SafeAreaView, 
        Text, 
        Button, 
        FlatList, 
        Image, 
        View, 
        StyleSheet,
        ActivityIndicator
    }from 'react-native';

const App = () => {
    const [loading, setLoading] = useState(true)
    const [moveis, setMovies] = useState([])

    useEffect(()=>{
        const requestMovies = async ()=>{
            setLoading(true)
            const req = await fetch('https://fortnite-api.com/v2/shop/br?language=pt-BR');
            const json = await req.json();
        
            if(json){
                setMovies(json)
            }
            setLoading(false)
        }
        requestMovies()
    },[])
        

    return (
        <SafeAreaView style={styles.container}>
            
            {
                loading &&
                <View style={styles.loadingArea} >
                    <ActivityIndicator size='large' color="#FFF"/>
                    <Text style={styles.loadingText}>Carregando...</Text>
                </View>
            }
            {!loading &&
                <>
                    <Text style={styles.totalMoviestext}>{moveis['data']['featured']['name']}</Text>
                    <FlatList
                        alwaysBounceHorizontal={true}
                        
                        horizontal={true}
                        style={styles.list}
                        data={moveis['data']['featured']['entries']}
                        renderItem={({item})=>(
                            <View style={styles.movieItem}>
                                <Image 
                                    source={{uri: item['items'][0]['images']['icon']}} 
                                    style={styles.movieImage}
                                    resizeMode='contain'
                                    />
                                    
                                <Text style={styles.movieTitle}>{item['items'][0]['name']}</Text>
                                <Text style={styles.description}>{item['items'][0]['description']}</Text>
                            </View>
                        )}
                        keyExtractor={item => item['items'][0]['id']}
                        />
                </>
            
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#333',
    },
    loadingArea: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    loadingText: {
        color:'#FFF'
    },
    totalMoviestext:{
        color:'#FFF',
        fontSize: 30,
        textAlign:'center',
        marginTop: 20,
        marginBottom: 30
    },
    list: {
      flex: 1,
      
    },
    movieItem: {
        marginHorizontal:10,
        borderRadius:10,
        width:250,
        height:250,
        backgroundColor:'#696969',
        alignContent:'center',
        justifyContent:'center'
        
    },
    movieImage: {
        height: 150
    },
    movieTitle: {
        textAlign: 'center',
        color: '#FFF',
        marginTop: 5,
        marginBottom: 10,
        fontSize: 16
    },
    description: {
        color: '#FFF',
        textAlign:'center',
        fontSize: 12
    }
})

export default App