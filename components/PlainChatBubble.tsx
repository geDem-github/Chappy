import { Text, TextProps, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { textStyle } from "@/theme/text-style";
import CodeHighlighter from "react-native-code-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

type PlainChatBubbleProps = TextProps & {
  message: string;
};

export default function PlainChatBubble({ message }: PlainChatBubbleProps) {
  const color = useThemeColor({}, "text");

  const extractCodeBlocks = (text: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]+?)\n```/g;
    let match;
    const blocks = [];
    let lastIndex = 0;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        blocks.push({
          type: "text",
          content: text.slice(lastIndex, match.index),
        });
      }
      const language = match[1] || "plaintext";
      const code = match[2];
      blocks.push({ type: "code", language, content: code });
      lastIndex = codeBlockRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      blocks.push({ type: "text", content: text.slice(lastIndex) });
    }

    return blocks;
  };
  const contentBlocks = extractCodeBlocks(message);

  return (
    <View>
      {contentBlocks.map((block, index) => (
        <View key={index} style={{ marginBottom: 16 }}>
          {block.type === "code" ? (
            <View>
              <Text style={{ ...textStyle.defaultSemiBold, color: color }}>
                {block.language}
              </Text>
              <CodeHighlighter
                language={block.language}
                hljsStyle={atomOneDark}
                containerStyle={{ flex: 1 }}
              >
                {block.content}
              </CodeHighlighter>
            </View>
          ) : (
            <Text style={{ ...textStyle.default, color: color }}>
              {block.content}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}
