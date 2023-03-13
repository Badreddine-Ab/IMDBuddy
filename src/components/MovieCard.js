import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Colors from "../constants/Colors";
import { Entypo } from "@expo/vector-icons";
import Fonts from "../constants/Fonts";
import Images from "../constants/Images";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { getPoster, getLanguage } from "../services/MovieService";

const MovieCard = ({
  title,
  poster,
  language,
  voteCount,
  voteAverage,
  size,
  heartLess,
  onPress
}) => {
  const [liked, setLiked] = useState(false);
  const [voteCountValue, setVoteCountValue] = useState(voteCount);
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} >
      <ImageBackground
        style={{ ...Styles.container, width: 230 * size, height: 340 * size }}
        imageStyle={{ borderRadius: 12 }}
        source={{ uri: getPoster(poster) }}
      >
        <View style={{ ...Styles.imdbContainer, paddingVertical: 3 * size }}>
          <Image
            source={Images.IMDB}
            resizeMode="cover"
            style={{ ...Styles.imdbImage, height: 20 * size, width: 50 * size }}
          />
          <Text
            style={{
              ...Styles.imdbRating,
              marginRight: 5 * size,
              fontSize: 14 * size,
            }}
          >
            {voteAverage}
          </Text>
        </View>
        {!heartLess ? (
          <TouchableNativeFeedback
            onPress={() => {
              setLiked(!liked);
              setVoteCountValue(
                liked ? voteCountValue - 1 : voteCountValue + 1
              );
            }}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={24 * size}
              color={liked ? Colors.HEART : Colors.WHITE}
              style={{ position: "absolute", bottom: 10, left: 10 }}
            />
          </TouchableNativeFeedback>
        ) : null}
      </ImageBackground>

      <View>
        <Text
          style={{ ...Styles.movieTitle, width: 230 * size }}
          numberOfLines={3}
        >
          {title}
        </Text>
        <View style={Styles.movieSubTitleContainer}>
          <Text style={Styles.rowAndCenter}>
            {getLanguage(language).english_name}
          </Text>
          <View>
            <Entypo
              name="heart"
              size={17 * size}
              color={Colors.HEART}
              style={{ marginRight: 5 }}
            />
            <Text style={Styles.movieSubTitle}>{voteCountValue}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  container: {
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

MovieCard.defaultProps = {
  size: 1,
  heartLess: true,
};

export default MovieCard;
