import React, {useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  FlatList,
  Text,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('screen');
const IMG_WIDTH = width * 0.75;
const IMG_HEIGHT = IMG_WIDTH * 1.45;

const img = [
  'https://images.pexels.com/photos/6346639/pexels-photo-6346639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/14519806/pexels-photo-14519806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3257803/pexels-photo-3257803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3352860/pexels-photo-3352860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/6445669/pexels-photo-6445669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/5760479/pexels-photo-5760479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/12905016/pexels-photo-12905016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/4214998/pexels-photo-4214998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/9203428/pexels-photo-9203428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1879864/pexels-photo-1879864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
];

const resources = img.map((image, index)=> ({
  key: String(index),
  photo: image
}))

const App = () => {
  const scrollX = useRef(new Animated.Value(0)).current


  return (
    <SafeAreaView style={styles.container}>  
      <View >
      <Text style={styles.Text}>Animated Parallax Effect</Text>
        <Animated.FlatList
        data={resources}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        pagingEnabled
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width
          ];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * .7, 0, width * .7]
          })
          return (
            <View style={{width, justifyContent: "center", alignItems: "center"}}> 
            <View style={{borderRadius: 15 , borderWidth: 10, borderColor: '#f2f2f2', shadowColor: '#000', shadowOpacity: 0.6, shadowRadius: 20, shadowOffset: {width: 0, height: 0},}}>
            <View style={{width: IMG_WIDTH, borderRadius: 15, height: IMG_HEIGHT, overflow: "hidden", alignItems: "center", }}>
            <Animated.Image
            source={{uri: item.photo}}
            style={{width: IMG_WIDTH, height: IMG_HEIGHT, resizeMode: "cover", transform: [ {translateX}]}}
            />
            </View>
           </View>
           </View>

          )
        }}

        />

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    color: "#000", 
    fontSize: 20, 
    paddingTop: 20,
    fontWeight: "900", 
    textAlign: "center", 
  }
});

export default App;
