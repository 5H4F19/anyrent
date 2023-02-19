import { Text } from "react-native"

export const ErrorText = ({ children }: { children?: string }) => {
  if (children) {
    return <Text className="text-left text-xs text-red-500">{children}</Text>
  } else {
    return <></>
  }
}
