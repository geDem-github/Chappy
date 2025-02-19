import { useThemeColor } from "@/hooks/useThemeColor";
import { useEffect, useState } from "react";
import { View, Platform, ScrollView, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import MessageInputField from "@/components/MessageInputField";
import ChatBubble from "@/components/ChatBubble";
import PlainChatBubble from "@/components/PlainChatBubble";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type Interaction = {
  userMessage: string;
  chappyMessage: string;
};

export default function Chat() {
  const [interactionHistory, setInteractionHistory] = useState<Interaction[]>(
    []
  );
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);

  const backgroundColor = useThemeColor({}, "background");

  useEffect(() => {
    const task = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token !== null) {
          setToken(token);
        }
      } catch (e) {
        alert("キー取得失敗");
      }
    };

    task();
  }, []);

  async function handleSendMessage() {
    if (token === undefined) {
      alert("失敗！");
      return;
    }

    // ローディング開始
    setIsLoading(true);

    const userMessage = message;
    setInteractionHistory([
      ...interactionHistory,
      {
        userMessage: message,
        chappyMessage: "",
      },
    ]);
    setMessage("");

    // メッセージ送信・レスポンス取得
    const response = await postMessage(userMessage);
    setInteractionHistory([
      ...interactionHistory,
      {
        userMessage: userMessage,
        chappyMessage: response,
      },
    ]);
    console.log(response);

    // ローディング終了
    setIsLoading(false);
  }

  async function postMessage(userMessage: string): Promise<string> {
    const apiKey = token;
    const url = "https://api.openai.com/v1/chat/completions";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    const body = JSON.stringify({
      model: "gpt-4o-mini",
      store: true,
      messages: [{ role: "user", content: userMessage }],
    });

    try {
      const response = await fetch(url, { method: "POST", headers, body });
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.log("エラーが発生しました", error);
      return "エラーが発生しました。";
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
        <StatusBar backgroundColor={backgroundColor} />

        <ScrollView>
          {/* チャットフィード */}
          <View
            style={{
              flex: 1,
              paddingVertical: 28,
              paddingHorizontal: 12,
              gap: 24,
            }}
          >
            {interactionHistory.map((interaction, index) => (
              <View key={index} style={{ gap: 8 }}>
                {/* ユーザーのメッセージ(プロンプト) */}
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    paddingLeft: Platform.OS === "web" ? 60 : 24,
                  }}
                >
                  <ChatBubble message={interaction.userMessage} />
                </View>

                {/* Chappyのメッセージ(レスポンス) */}
                <View
                  style={{
                    paddingRight: Platform.OS === "web" ? 60 : 24,
                  }}
                >
                  <PlainChatBubble message={interaction.chappyMessage} />
                </View>
              </View>
            ))}
          </View>

          <View style={{ height: 100 }}></View>
        </ScrollView>

        <View
          style={{
            position: "absolute",
            bottom: 12,
            left: 0,
            right: 0,
            marginHorizontal: Platform.OS === "web" ? 24 : 12,
          }}
        >
          <MessageInputField
            message={message}
            setMessage={setMessage}
            onSubmit={() => handleSendMessage()}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
