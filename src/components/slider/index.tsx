import { Animated, Dimensions, FlatList, StyleSheet, Easing, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useRef, useState } from 'react';

export const Slider = () => {
    const [index, setIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const handleOnScroll = (event: any) => {
        Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX,
                        },
                    },
                },
            ],
            {
                useNativeDriver: false,
            },
        )(event);
    };

    const handleOnViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any }) => {
        // console.log('viewableItems', viewableItems);
        setIndex(viewableItems[0].index);
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    return (
        <View className='relative h-[300px]'>
            <FlatList
                data={slides}
                renderItem={({ item }) => <SlideItem item={item} />}
                horizontal
                snapToAlignment="center"
                showsHorizontalScrollIndicator={true}
                pagingEnabled
                onScroll={handleOnScroll}
                onViewableItemsChanged={handleOnViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
            />


            <Pagination data={slides} scrollX={scrollX} index={index} />
        </View>
    );
};





const { width, height } = Dimensions.get('screen');

const SlideItem = ({ item }: { item: any }) => {

    return (
        <View style={styles.container}>
            <Animated.Image
                source={item.img}
                resizeMode="cover"
                className="w-full h-[400px]"
            />
        </View>
    );
};

export default SlideItem;

const styles = StyleSheet.create({
    container: {
        width,
        height: height / 2,
        alignItems: 'center',
    },
    image: {
        flex: 0.6,
        width: '100%',
    },
    content: {
        flex: 0.4,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 18,
        marginVertical: 12,
        color: '#333',
    },
    price: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    container2: {
        position: 'absolute',
        bottom: 35,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 3,
        backgroundColor: '#ccc',
    },
    dotActive: {
        backgroundColor: '#000',
    },
});


export const slides = [
    {
        id: 1,
        img: require('../../assets/house/1.jpg'),
        title: 'Apple Watch Series 7',
        description: 'The future of health is on your wrist',
        price: '$399',
    },
    {
        id: 2,
        img: require('../../assets/house/2.jpg'),
        title: 'Apple Watch Series 7',
        description: 'The future of health is on your wrist',
        price: '$399',
    },
    {
        id: 3,
        img: require('../../assets/house/3.jpg'),
        title: 'Apple Watch Series 7',
        description: 'The future of health is on your wrist',
        price: '$399',
    },
    {
        id: 4,
        img: require('../../assets/house/4.jpg'),
        title: 'Apple Watch Series 7',
        description: 'The future of health is on your wrist',
        price: '$399',
    },
    {
        id: 5,
        img: require('../../assets/house/5.jpg'),
        title: 'Apple Watch Series 7',
        description: 'The future of health is on your wrist',
        price: '$399',
    }
];

const Pagination = ({ data, scrollX, index }: { data: any, scrollX: any, index: number }) => {
    return (
        <View>
            <View className='flex flex-row justify-center -mt-4 -translate-y-2'>
                {data.map((_: any, idx: number) => {
                    const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [12, 30, 12],
                        extrapolate: 'clamp',
                    });

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.2, 1, 0.1],
                        extrapolate: 'clamp',
                    });

                    const backgroundColor = scrollX.interpolate({
                        inputRange,
                        outputRange: ['#ccc', '#000', '#ccc'],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={idx.toString()}
                            style={[
                                styles.dot,
                                { width: dotWidth, backgroundColor },
                                // idx === index && styles.dotActive,
                            ]}
                        />
                    );
                })}
            </View>
        </View>
    );
};