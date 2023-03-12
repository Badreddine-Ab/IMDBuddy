import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { fetchMovies } from "./Api/index";
import { TextInput } from "react-native-paper";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState('')
  useEffect(() => {
    const getMovies = async () => setMovies(await fetchMovies(searchMovie));
    getMovies()
  }, []);
  return (
    <>
    {Object.keys(movies).length > 0 && (
   <View>
    <TextInput 
      placeholder="Search your movie here"
      value={searchMovie}
      onChange = {(text)=> setSearchMovie(text)}
      style={{
        marginTop:35,
      }}
      left={<TextInput.Icon name="magnify" />}
    />
   </View>
   )}
   </>
  );
}
