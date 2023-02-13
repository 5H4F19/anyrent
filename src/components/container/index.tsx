import LinearGradient from "react-native-linear-gradient"
import { SafeAreaView } from "react-native-safe-area-context"

export const Container = ({ children }: { children: JSX.Element | string | JSX.Element[] | string[] }) => {
    return (
        <SafeAreaView className="min-h-screen bg-white">
            {/* <LinearGradient className="h-screen" colors={['#ffffff', '#ffffff', '#ffffff', '#e2e8f0', '#e2e8f0']}>
                {children}
            </LinearGradient> */}
            {children}
        </SafeAreaView>
    )
}