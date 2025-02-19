import { Text, TextProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { textStyle } from "@/theme/text-style";

type ChatBubbleProps = TextProps & {
  message: string;
};

export default function ChatBubble({ message }: ChatBubbleProps) {
  const color = useThemeColor({}, "text");
  return (
    <Text
      style={{
        ...textStyle.default,
        color: color,
        backgroundColor: useThemeColor({}, "surface"),
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
      }}
    >
      {message}
    </Text>
  );
}
