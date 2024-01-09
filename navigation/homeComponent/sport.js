import React, { useState, useEffect} from 'react'
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    UseState,
    Image,
    ScrollView
} from 'react-native';
import axios from 'axios'
 export default Sport = ({navigation}) =>{
    const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await axios.get(
        'https://newsdata.io/api/1/news?country=vi&category=sports&apikey=pub_35039f80da0243cb8216921576aefeb1305ce'
      );
      setNews(response.data.results.slice(0, 10));
    };

    fetchNews();
  }, []);
    return (
    <SafeAreaView style={styles.homeContainer}>
        <View style={styles.headerBox}>
        <View style={styles.backContainer} >
            <TouchableOpacity
            onPress={()=>{
                            navigation.navigate('home');
                        }} >
                <Image style={styles.backBtn} source={require('../image/back1.png')}/>
            </TouchableOpacity>
            </View>
           <Text style={styles.pageTitle}>Thể Thao</Text>
           <View></View>
        </View>
        <ScrollView style={styles.Container} showsVerticalScrollIndicator={false}>
  {news.map((article, index) => (
    <TouchableOpacity key={index} style={styles.itemContainer} onPress={()=>{
        navigation.navigate("infor", { dataItem: article });
    }} >
      
      <Image  source={{uri: article.image_url}} style={styles.newsImg} />
      <Text style={styles.title}>{article.title}</Text>
      <Text >{article.description}</Text>
    </TouchableOpacity>
  ))}   
</ScrollView>
    </SafeAreaView>
    )
 }
 const styles = StyleSheet.create({
  homeContainer:{
      flex:1,
      margin:10,
      marginTop:40,
  },
  itemContainer: {
      borderBottomWidth: 2,
      borderBottomColor: '#B3B3B3',
      paddingBottom: 10,
      marginBottom: 10,
      marginTop:10
    },
  container: {
      flex: 1,
      paddingTop: 50,
    },
  title: {
      fontWeight: 'bold',
    },
  newsImg:{
       
      
      width: '100%',
      height: 200,
  },
  headerBox:{
      flexDirection:'row',
      height:'6%',
      width:'100%',
      justifyContent:'space-between',

  },
  pageTitle:{
      fontSize:25,
      marginRight:25,
      textAlign:'center',
      fontWeight:'bold',
  },
  menuImage:{
      width:40,
      height:50,
      resizeMode:'contain'
  },
  
  typeText:{
      fontSize:18,
      marginLeft:5,
  },
  newsTypeBox:{
      flexDirection:'row',
      margin:5,
      padding:4,
      backgroundColor:'#00BEBE',
      borderRadius:4,
  },
  
  menuImage:{
      width:40,
      height:50,
      resizeMode:'contain'
  },
  userImage:{
      width:40,
      height:50,
      resizeMode:'contain',
     
      
  },
  backBtn:{
    width:40,
    height:40,
    padding:0,
  },
  
});