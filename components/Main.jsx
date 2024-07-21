import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { getLatestGames } from "../lib/metacritic.js";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export function Main() {
  const [games, setGames] = useState([]);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    getLatestGames().then((data) => setGames(data));
  }, []);
  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <StatusBar style="auto" />
      <ScrollView>
        {games.map((game) => (
          <View key={game.slug} style={styles.card}>
            <Image
              style={styles.image}
              key={game.slug}
              source={{ uri: game.image }}
            />
            <Text style={styles.title}>{game.title}</Text>
            <Text key={game.description} style={styles.description}>
              {game.description}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Main;
