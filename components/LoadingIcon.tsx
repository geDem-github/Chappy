import { useThemeColor } from "@/hooks/useThemeColor";
import { useEffect } from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

type LoadingIconProps = ViewProps & {
  isLoading: boolean;
};

export default function LoadingIcon({
  isLoading,
  ...otherProps
}: LoadingIconProps) {
  const rotateValue = useSharedValue(0); // アニメーション用の値

  useEffect(() => {
    if (isLoading) {
      rotateValue.value = withRepeat(
        withTiming(360, { duration: 2000, easing: Easing.linear }),
        -1,
        false
      );
    } else {
      rotateValue.value = 0;
    }
  }, [isLoading]);

  // スタイルを動的に適用
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateValue.value}deg` }],
  }));
  const color = useThemeColor({}, "caption");

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          width: 20,
          height: 20,
          backgroundColor: color,
        },
      ]}
      {...otherProps}
    />
  );
}
