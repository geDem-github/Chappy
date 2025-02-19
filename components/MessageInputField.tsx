import { View, TextInputProps, TextInput, Platform } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { textStyle } from "@/theme/text-style";
import IconButton from "./IconButton";

type MessageInputFieldProps = TextInputProps & {
  message: string;
  setMessage: (newValue: string) => void;
  onSubmit: () => void;
};

export default function MessageInputField({
  message,
  setMessage,
  onSubmit,
  ...otherProps
}: MessageInputFieldProps) {
  const captionColor = useThemeColor({}, "caption");
  const textColor = useThemeColor({}, "text");
  const inputColor = useThemeColor({}, "input");

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
        backgroundColor: inputColor,
        borderRadius: 16,
        paddingHorizontal: Platform.OS === "web" ? 16 : 8,
        // iOS の影
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        // Android の影
        elevation: 10,
        // Web の影
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",
      }}
    >
      <TextInput
        value={message}
        placeholder="Chappyにメッセージを送信する"
        multiline={true}
        onChangeText={setMessage}
        onSubmitEditing={() => onSubmit()}
        placeholderTextColor={captionColor}
        style={{
          ...textStyle.default,
          color: textColor,
          flex: 1,
          outline: "none",
          paddingVertical: Platform.OS === "web" ? 20 : 16,
        }}
        {...otherProps}
      />

      <View style={{}}>
        <IconButton
          onPress={() => {
            onSubmit();
          }}
        />
      </View>
    </View>
  );
}
