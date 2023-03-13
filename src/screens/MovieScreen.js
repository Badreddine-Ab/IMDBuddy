import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Linking,
  TouchableOpacity
} from "react-native";
import Colors from "../constants/Colors";
import { useEffect, useState } from "react";
import { getMovieById, getPoster, getVideo } from "../services/MovieService";
import ItemSeparator from "../components/itemSeperator";
import { LinearGradient } from "expo-linear-gradient";
import Fonts from "../constants/Fonts";
import { Feather, Ionicons } from "@expo/vector-icons";
import { APPEND_TO_RESPONSE as AR } from "../constants/Urls";

const { height, width } = Dimensions.get("screen");

const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

const MovieScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState({});

  useEffect(() => {
    getMovieById(movieId, `${AR.VIDEOS}`).then((response) =>
      setMovie(response.data)
    );
  }, []);

  return (
    <ScrollView>
      <StatusBar style="auto" />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.5)", "rgba(217, 217, 217, 0)"]}
        start={[0, 0.3]}
        style={styles.linearGradient}
      />
      <View style={styles.moviePosterImageContainer}>
        <Image
          style={styles.moviePosterImage}
          resizeMode="cover"
          source={{ uri: getPoster(movie.backdrop_path) }}
        />
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={35} color={Colors.WHITE} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Share</Text>
        
      </View>
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => Linking.openURL(getVideo(movie.videos.results[0].key))}
      >
        <Ionicons name="play-circle-outline" size={70} color={Colors.WHITE} />
      </TouchableOpacity>
      <ItemSeparator height={setHeight(37)} />
      <Text>{movie.title}</Text>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BASIC_BACKGROUND,
  },
  moviePosterImageContainer: {
    height: setHeight(35),
    width: setWidth(145),
    alignItems: "center",
    position: "absolute",
    left: setWidth((100 - 145) / 2),
    top: 0,
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    elevation: 8,
  },
  moviePosterImage: {
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    width: setWidth(145),
    height: setHeight(35),
  },
  linearGradient: {
    width: setWidth(100),
    height: setHeight(6),
    position: "absolute",
    top: 0,
    elevation: 9,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    right: 0,
    left: 0,
    top: 50,
    elevation: 20,
  },
  headerText: {
    color: Colors.WHITE,
    fontFamily: Fonts.BOLD,
  },
  playButton: {
    position: "absolute",
    top: 110,
    left: setWidth(50) - 70 / 2,
    elevation: 10,
  },
});

export default MovieScreen;
