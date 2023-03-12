import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { Entypo } from "@expo/vector-icons";
import Fonts from "../constants/Fonts";
import Images from "../constants/Images";
import { Ionicons } from '@expo/vector-icons';
import React, {useState} from "react";

const MovieCard = () => {
    const [liked, setLiked] = useState(false);
  return (
    <TouchableOpacity>
      <View style={Styles.container}>
        <View style={Styles.imdbContainer}>
          <Image
            source={Images.IMDB}
            resizeMode="cover"
            style={Styles.imdbImage}
          />
          <Text style={Styles.imdbRating}>9.4</Text>
        </View>
        <TouchableNativeFeedback onPress={()=> setLiked(!liked)}>
        <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={24}
              color={liked ? Colors.HEART : Colors.WHITE}
              style={{position:'absolute', bottom:10, left:10}}
            />
        </TouchableNativeFeedback>
      </View>
      <View>
        <Text style={Styles.movieTitle} numberOfLines={3}>
          URI - SURGICAL STRIKE
        </Text>
        <View style={Styles.movieSubTitleContainer}>
          <Text style={Styles.rowAndCenter}>Morroco | (U/A)</Text>
          <View>
            <Entypo
              name="heart"
              size={24}
              color={Colors.HEART}
              style={{ marginRight: 5 }}
            />
            <Text style={Styles.movieSubTitle}>90%</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor:Colors.ACTIVE,
    height: 340,
    width: 230,
    borderRadius: 12,
    elevation: 5,
    marginVertical: 2,
  },
  movieTitle: {
    fontFamily: Fonts.EXTRA_BOLD,
    color: Colors.GRAY,
    paddingVertical: 2,
    marginTop: 5,
    width: 230,
  },
  movieSubTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  movieSubTitle: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
  },
  rowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  imdbContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: Colors.YELLOW,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 12,
    paddingVertical: 3,
  },
  imdbImage: {
    height: 20,
    width: 50,
    borderBottomLeftRadius: 5,
  },
  imdbRating: {
    marginRight: 5,
    color: Colors.HEART,
    fontFamily: Fonts.EXTRA_BOLD,
  },
});

export default MovieCard;
