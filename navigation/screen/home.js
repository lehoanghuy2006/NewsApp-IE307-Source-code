import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StyleSheet
} from 'react-native';
import axios from 'axios';

export default Home = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = () => {
    if (searchQuery) {
      const results = news.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleBackButton = () => {
    setSearchQuery('');
  };

  useEffect(() => {
    const fetchNews = async () => {
      const response = await axios.get(
        'https://newsdata.io/api/1/news?country=vi&category=science&apikey=pub_35039f80da0243cb8216921576aefeb1305ce'
      );
      setNews(response.data.results.slice(0, 10));
    };

    fetchNews();
  }, []);

  return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.searchBarBox}>
        <TextInput
          placeholder="Tìm kiếm theo tiêu đề"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={handleSearch}
          style={{ ...styles.searchBar, width: searchQuery ? '85%' : '95%' }}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={handleBackButton}>
            <Image
              style={styles.backImg}
              source={require('../image/close.png')}
            />
          </TouchableOpacity>
        ) : null}
      </View>
        <View style={styles.headerBox}>
          
            <ScrollView horizontal>
                <TouchableOpacity style={styles.backItem}
                onPress={()=>{
                            navigation.navigate('sport');
                        }}>
                    <View style={styles.newsTypeBox}>
                        
                        <Text style={styles.typeText}>Thể Thao</Text>
                    </View>
                </TouchableOpacity>
                    
                <TouchableOpacity
                onPress={()=>{
                            navigation.navigate('tech');
                        }}>
                    <View style={styles.newsTypeBox}>
                        
                        <Text style={styles.typeText}>Công Nghệ</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={()=>{
                            navigation.navigate('health');
                        }}>
                    <View style={styles.newsTypeBox}>
                        
                        <Text style={styles.typeText}>Sức Khoẻ</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={()=>{
                            navigation.navigate('business');
                        }}>
                    <View style={styles.newsTypeBox}>
                        
                        <Text style={styles.typeText}>Kinh Doanh</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>

        </View>
        <ScrollView style={styles.Container} showsVerticalScrollIndicator={false}>
            {(searchQuery ? searchResults : news).map((article, index) => (
                article.image_url && (
                <TouchableOpacity key={index} style={styles.itemContainer} onPress={()=>{
                    navigation.navigate("infor", { dataItem: article });
                }} >
                
                <Image  source={{uri: article.image_url}} style={styles.newsImg} />
                <View style={styles.cardText}>
                <Text style={styles.title}>{article.title}</Text>
                <Text style={styles.cardDescription} >{article.description}</Text>
                </View>
                </TouchableOpacity>
                )
            ))}   
        </ScrollView>

    </SafeAreaView>
    )
 }
 const styles = StyleSheet.create({
    homeContainer: {
        marginTop:40,
        flex: 1,
        margin: 10,
      },
    itemContainer: {
        paddingBottom: 10,
        marginBottom: 10,
        borderRadius:10,
        backgroundColor:'#dee1e3',
      },
    backImg:{
        width:38,
        height:38,
    },
    backItem: {
        alignItems:"center",
        justifyContent:'center',
    },
    backButton: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'blue',
        marginTop: 10,
    },
    searchBarBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 5,
        marginLeft: 5,
      },
      searchBar: {
        flexDirection: 'row',
        borderWidth: 1.5,
        borderRadius: 15,
        padding: 4,
        marginLeft:'2%'
      },
    container: {
        flex: 1,
        paddingTop: 50,
      },
    title: {
        fontWeight: 'bold',
        fontSize:16,
      },
    cardText:{
        padding:10,
        
    },
    cardDescription:{
        textAlign: 'justify',
        fontSize: 16,
    },
    newsImg:{
         
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        resizeMode:'contain',
        width: '100%',
        height: 200,
    },
    headerBox:{
        flexDirection:'row',
        height:'6%',
        width:'100%',
        justifyContent:'space-between',
        marginBottom:10,
    },
    pageTitle:{
        fontSize:35,

    },
    menuImage:{
        width:40,
        height:50,
        resizeMode:'contain'
    },
    
    typeText:{
        color:'#1a1a1a',
        fontSize:18,
        fontWeight:'500',
        paddingLeft:15,
        paddingRight:15,
    },
    newsTypeBox:{
        flexDirection:'row',
        margin:5,
        padding:5,
        borderColor:'#1a1a1a',
        borderRadius:10,
        borderWidth:1.5,
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
    
 });