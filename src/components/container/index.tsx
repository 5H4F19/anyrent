import { SafeAreaView, StatusBar, Platform } from "react-native"

export const Container = ({ children }: { children: JSX.Element | string | JSX.Element[] | string[] }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      {/* <LinearGradient className="h-screen" colors={['#ffffff', '#ffffff', '#ffffff', '#e2e8f0', '#e2e8f0']}>
                {children}
            </LinearGradient> */}
      {children}
    </SafeAreaView>
  )
}
