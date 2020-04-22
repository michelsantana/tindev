import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {
   View,
   SafeAreaView,
   Text,
   Image,
   TouchableOpacity,
   AsyncStorage,
} from 'react-native';

import styles from './styles';
import api from '../../services/api';

import logo from '../../assets/logo.png';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import itsamatch from '../../assets/itsamatch.png';

export default function Main({navigation}) {
   const id = navigation.getParam('user');
   const [devs, setDevs] = useState([]);
   const [matchDev, setMatchDev] = useState(null);

   useEffect(() => {
      async function loadDevs() {
         const response = await api.get('devs', {
            headers: {
               user: id,
            },
         });
         setDevs(response.data);
      }

      loadDevs();
   }, [id]);

   useEffect(() => {
      const socket = io(api.defaults.baseURL, {
         query: {user: id},
      });

      socket.on('match', (dev) => {
         console.log(dev);
         setMatchDev(dev);
      });
   }, [id]);

   async function handleLike() {
      const [userLike, ...rest] = devs;

      await api.post(`devs/${userLike._id}/likes`, null, {
         headers: {user: id},
      });

      setDevs(rest);
   }

   async function handleDislike() {
      const [userDislike, ...rest] = devs;

      await api.post(`devs/${userDislike._id}/dislikes`, null, {
         headers: {user: id},
      });

      setDevs(rest);
   }

   async function handleBack() {
      await AsyncStorage.clear();
      navigation.navigate('Login');
   }

   return (
      <SafeAreaView style={styles.container}>
         <TouchableOpacity onPress={handleBack}>
            <Image source={logo} style={styles.logo} />
         </TouchableOpacity>
         <View style={styles.cardsContainer}>
            {devs.length === 0 ? (
               <Text style={styles.empty}>Cabô :'(</Text>
            ) : (
               devs.map((dev, index) => {
                  return (
                     <View
                        key={dev._id}
                        style={[styles.card, {zIndex: devs.length - index}]}>
                        <Image
                           style={styles.avatar}
                           source={{
                              uri: dev.avatar,
                           }}></Image>
                        <View style={styles.footer}>
                           <Text style={styles.name}>{dev.name}</Text>
                           <Text style={styles.bio} numberOfLines={3}>
                              {dev.bio}
                           </Text>
                        </View>
                     </View>
                  );
               })
            )}
         </View>
         {devs.length > 0 && (
            <View style={[styles.buttonsContainer, { zIndex: devs.length + 1 }]}>
               <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleDislike()}>
                  <Image source={dislike}></Image>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLike()}>
                  <Image source={like}></Image>
               </TouchableOpacity>
            </View>
         )}
         {matchDev && (
            <View style={[styles.matchContainer, { zIndex: devs.length + 2 }]}>
               <Image
                  style={styles.matchImage}
                  source={itsamatch}
                  alt=""
               />
               <Image
                  style={styles.matchAvatar}
                  source={{uri: matchDev.avatar}}
                  alt=""
               />
               <Text style={styles.matchName}>{matchDev.name}</Text>
               <Text style={styles.matchBio}>{matchDev.bio}</Text>
               <TouchableOpacity onPress={()=>setMatchDev(null)}>
                  <Text style={styles.closeMatch} >FECHAR</Text>
               </TouchableOpacity>
            </View>
         )}
      </SafeAreaView>
   );
}
