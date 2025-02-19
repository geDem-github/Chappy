import { useThemeColor } from "@/hooks/useThemeColor";
import { useState, useEffect } from "react";
import { View, TextInput, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { textStyle } from "@/theme/text-style";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const backgroundColor = useThemeColor({}, "background");
  const linkBackgroundColor = useThemeColor({}, "tint");
  const [token, setToken] = useState("");
  const captionColor = useThemeColor({}, "caption");
  const textColor = useThemeColor({}, "text");
  const inputColor = useThemeColor({}, "input");

  useEffect(() => {
    const task = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token !== null) {
          setToken(token);
          router.navigate("/chat");
        }
      } catch (e) {
        alert(e);
      }
    };
    task();
  }, []);

  const handleClick = async () => {
    try {
      await AsyncStorage.setItem("token", token);
      router.navigate("/chat", {});
    } catch (e) {
      // saving error
      alert("保存できませんでした。");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
        <View
          style={{
            flex: 1,
            gap: 24,
            justifyContent: "center",
            marginHorizontal: "auto",
            paddingHorizontal: 20,
            width: "80%",
          }}
        >
          <TextInput
            value={token}
            onChangeText={setToken}
            placeholder="APIKEYを入力"
            placeholderTextColor={captionColor}
            numberOfLines={1}
            style={{
              ...textStyle.default,
              color: textColor,
              backgroundColor: inputColor,
              paddingVertical: 16,
              paddingHorizontal: 12,
              borderRadius: 8,
            }}
          />

          <Pressable onPress={handleClick}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                color: "#fff",
                padding: 12,
                backgroundColor: linkBackgroundColor,
                borderRadius: 8,
              }}
            >
              保存
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
