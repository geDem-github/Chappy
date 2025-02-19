import { PressableProps, Pressable } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Image, type ImageSource } from "expo-image";

type IconButtonProps = PressableProps;

export default function IconButton({ ...otherProps }: IconButtonProps) {
  const color = useThemeColor({}, "icon");
  const src: ImageSource = require("../assets/images/paper-plane-icon.png");

  return (
    <Pressable style={{ padding: 8 }} {...otherProps}>
      <Image
        source={src}
        style={{
          width: 24,
          height: 24,
          tintColor: "#ffffff",
        }}
        tintColor={"#ffffff"}
      />
    </Pressable>
  );
}
