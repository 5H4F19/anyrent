import { useEffect, useRef, useState } from "react"
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import MapView, { MapPressEvent, Marker, MapMarker } from "react-native-maps"
import { Colors } from "react-native/Libraries/NewAppScreen"
import Geolocation from 'react-native-geolocation-service';
import { Image } from "react-native";


const USER_LOCATION_SET: boolean = false

export const Map = (props: any) => {
    const [region, setRegion] = useState({
        latitude: 25.72015265007019,
        longitude: 89.26865075447573,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    const location = { ...region }
    const mapRef = useRef<MapView>(null)
    const markerRef = useRef<MapMarker>(null)

    const _getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                setRegion({
                    ...region,
                    latitude,
                    longitude,
                })
            },
            (error) => {
                console.log(error)
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
    }

    const _onRegionChange = (event: MapPressEvent) => {
        mapRef.current?.animateToRegion({ ...region, ...event.nativeEvent.coordinate }, 500)
        markerRef.current?.animateMarkerToCoordinate(event.nativeEvent.coordinate, 500)
    }

    const _onCenter = () => {
        mapRef.current?.animateToRegion({ ...region }, 500)
    }

    useEffect(() => {
        if (!USER_LOCATION_SET) _getCurrentLocation()
    }, [USER_LOCATION_SET])

    return (
        <>
            <MapView
                style={styles.map}
                ref={mapRef}
                region={region}
                showsMyLocationButton={true}
                maxZoomLevel={20}
                onPress={_onRegionChange}>
                <Marker.Animated ref={markerRef} coordinate={region} />
                <Marker.Animated coordinate={location} icon={require('../../assets/home.png')} />
                {/* <Marker.Animated ref={(ref: any) => this.mark = ref} coordinate={this.state} icon={require('../../assets/home.png')} /> */}
            </MapView>
            <TouchableOpacity className="absolute self-end flex items-center bg-white p-3 m-3 top-0 left-0 rounded-lg" style={{ elevation: 3 }} onPress={() => props.navigation.goBack()}>
                <Image className="h-4 w-4" source={require('../../assets/x.png')} />
            </TouchableOpacity>
            <TouchableOpacity className="absolute self-end flex items-center bg-white p-3 bottom-7 right-7 rounded-full" style={{ elevation: 3 }} onPress={_onCenter}>
                <Image className="h-8 w-8 rotate-90" source={require('../../assets/center-of-gravity.png')} />
            </TouchableOpacity>
        </>
    )
}

export const MapMini = ({ onPress }: { onPress: any }) => {
    const [region, setRegion] = useState({
        latitude: 25.72015265007019,
        longitude: 89.26865075447573,
        latitudeDelta: 0.0922 / 8,
        longitudeDelta: 0.0421 / 8,
    })
    const location = { ...region }
    const mapRef = useRef<MapView>(null)
    const markerRef = useRef<MapMarker>(null)

    const _getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                setRegion({
                    ...region,
                    latitude,
                    longitude,
                })
            },
            (error) => {
                console.log(error)
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
    }

    const _onRegionChange = (event: MapPressEvent) => {
        onPress()
    }

    const _onCenter = () => {
        mapRef.current?.animateToRegion({ ...region }, 500)
    }

    useEffect(() => {
        if (!USER_LOCATION_SET) _getCurrentLocation()
    }, [USER_LOCATION_SET])

    return (
        <View className="mx-4 rounded-lg h-[100px] overflow-hidden bg-red-300">
            <MapView
                className="rounded-3xl overflow-hidden h-[150px]"
                ref={mapRef}
                region={region}
                showsMyLocationButton={true}
                maxZoomLevel={20}
                onPanDrag={_onCenter}
                onPress={_onRegionChange}>
                {/* <Marker.Animated ref={markerRef} coordinate={region} /> */}
                <Marker.Animated onPress={onPress} coordinate={location} icon={require('../../assets/home.png')} />
                {/* <Marker.Animated ref={(ref: any) => this.mark = ref} coordinate={this.state} icon={require('../../assets/home.png')} /> */}
            </MapView>

        </View>
    )
}


const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const ZOOM_FACTOR = 1.75;

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        ...Platform.select({
            ios: {
                height: SCREEN_HEIGHT,
                width: SCREEN_WIDTH,
            },
            android: {
                height: SCREEN_HEIGHT * ZOOM_FACTOR,
                width: SCREEN_WIDTH * ZOOM_FACTOR,
                marginTop: -SCREEN_HEIGHT * (ZOOM_FACTOR - 1) / 2,
                marginLeft: -SCREEN_WIDTH * (ZOOM_FACTOR - 1) / 2,
                transform: [{ scale: 1 / ZOOM_FACTOR }],
            },
        }),
    },
    myLocationButton: {
        backgroundColor: Colors.surface,
        position: 'absolute',
        bottom: 20,
        right: 20,
        padding: 15,
        elevation: 3,
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        borderRadius: 50
    }
});
