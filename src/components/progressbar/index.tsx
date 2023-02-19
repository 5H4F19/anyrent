import { Text, View } from "react-native"

export const ProgressBar = ({ percentage }: { percentage: number }) => {
  if (percentage === 1 || percentage === 100) {
    return <></>
  }
  return (
    <View className="w-full h-4 rounded-md overflow-hidden bg-primary/20">
      <View className="bg-primary h-4" style={{ width: `${percentage}%` }}>
        <Text className="mx-auto my-auto text-xs text-white font-medium">{Math.floor(percentage)}%</Text>
      </View>
    </View>
  )
}
