import React, { Component, useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import axios from 'axios';

export default function InforScreen({ route, navigation }) {
  const [relatedNews, setRelatedNews] = useState([]);
  const [dataItem, setDataItem] = useState(route.params.dataItem);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [shares, setShares] = useState(0);
  const scrollViewRef = useRef();

  // Fetch related news
  useEffect(() => {
    const fetchRelatedNews = async () => {
      const response = await axios.get(
        'https://newsdata.io/api/1/news?country=vi&category=science&apikey=pub_35120a1a7aa8888b1e4b348826bf466196ca8'
      );
      setRelatedNews(response.data.results.filter(news => news.article_id !== dataItem.article_id));
    };
    fetchRelatedNews();
  }, [dataItem]);

  const handleRelatedNewsClick = (selectedNews) => {
    setDataItem(selectedNews);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  // Event handlers for like, comment, share
  const handleLikeClick = () => {
    setLikes(likes + 1);
  };

  const handleCommentClick = () => {
    setComments(comments + 1);
  };

  const handleShareClick = () => {
    setShares(shares + 1);
  };

  return (
    
    
    <View style={styles.container}>
      <View style={styles.header}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={()=>{
            navigation.navigate("home");
        }} >
         
            <Image source={require('../image/back.jpg')}/>
          
        </TouchableOpacity>
      </View>
      </View>
<ScrollView style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
        <Image source={{uri: dataItem.image_url}} style={styles.newsImg} />
        <Text style={styles.title}>{dataItem.title}</Text>
          <View style={styles.dataItemContainer}>
              <Text style={styles.scrText}>{dataItem.source_id}</Text>
              <Text style={styles.scrText}>{dataItem.pubDate}</Text>
          </View>
      <Text style={styles.text}>{dataItem.description} </Text>
      <Text style={styles.text}>{dataItem.content}</Text>
      <Text style={styles.colorText}>{dataItem.link}</Text>


    </View>
    
   
    <ScrollView horizontal style={styles.relatedNewsContainer}>
      {relatedNews.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handleRelatedNewsClick(item)} style={styles.relatedNewsItem}>
          <Image source={{ uri: item.image_url }} style={styles.relatedNewsImage} />
          <Text style={styles.relatedNewsTitle}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>


</ScrollView>
      

      <View style={styles.likeCommentShare}>
           
              <TouchableOpacity
                style={styles.ssBtn}
                onPress={handleLikeClick}
            >
                <Image
                  source={require('../image/like.png')}
                  style={styles.likecommentshareIcon}
                />
                 <Text style={styles.ssText}>{likes} Like</Text>
              </TouchableOpacity>
              
            <TouchableOpacity
                style={styles.ssBtn}
                onPress={handleCommentClick}
              >
                <Image
                  source={require('../image/comment.png')}
                  style={styles.likecommentshareIcon}
                />
                <Text style={styles.ssText}>{comments} Comments</Text>
            </TouchableOpacity>
              
            <TouchableOpacity
                style={styles.ssBtn}
                onPress={handleShareClick}
              >
                <Image
                  source={require('../image/share.png')}
                  style={styles.likecommentshareIcon}
                />
                <Text style={styles.ssText}>{shares} Shares</Text>
            </TouchableOpacity>
          </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom:20,
  },

  likeCommentShare:{
    flexDirection:'row',
    justifyContent:'space-around',
    width:'100%',
    backgroundColor:'#ebebeb',
    paddingTop:15,
    paddingBottom:15,
    position:'absolute',
    bottom:0,
  },
  backBtn:{
    marginLeft:15,
    marginTop:15,
    width:20,
    height:20,
  },
  buttonContainer:{
    marginLeft:10,
    marginTop:35,
  },
  scrText:{
    backgroundColor: '#ebebeb',
    padding:3,
    paddingLeft:5,
    paddingRight:5,
    borderRadius:4,
    fontSize:15,
  },
  likecommentshareIcon:{
    width:22,
    height:22,
  },
  ssBtn:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  ssText:{
    marginLeft:8,
    fontSize:17,
  },
  newsImg:{  
    width: '100%',
    height: 250,
  },
  header: {
    marginBottom: 16,
  },

  image: {
    borderRadius: 8,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
     
    padding:5,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    padding:5,
  },
  source: {
    fontSize: 14,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
  },
  dataItemContainer: {
    flexDirection:'row',
    width:'100%',
    paddingLeft:10,
    paddingRight:10,
    justifyContent:'space-between',
  },

  text:{
    fontSize:18,
    marginTop:10,
    marginLeft:8,
    marginRight:8,
    textAlign:'justify',  
  },
  colorText: {
    color:'blue',
    marginTop:15,
  },
  backtext:{
    fontWeight:'bold', 
    fontSize:20
  },
  relatedNewsContainer: {
    marginVertical: 10,
    padding:5,
    paddingBottom:50,
    
  },
  relatedNewsItem: {
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth:'33%',
    height:140,
    alignItems:'center',
    justifyContent:'center',
    marginRight:4,
    borderRadius:10,
    backgroundColor:'#ebebeb',
  },
  relatedNewsImage: {
    width:120,
    height: 80,
    borderRadius:5,
    marginRight: 10,
    marginLeft:10,
  },
  relatedNewsTitle: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});
