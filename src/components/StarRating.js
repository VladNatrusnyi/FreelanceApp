import React, { useState } from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const StarRating = ({selectedStar, setSelectedStar}) => {
    const handleStarClick = (index) => {
        setSelectedStar(index === selectedStar ? 0 : index);
    };

    const renderStars = () => {
        const stars = [];

        for (let i = 0; i < 5; i++) {
            const isFilled = i < selectedStar;
            const starIcon = isFilled
                ? <AntDesign name="star" size={24} color={'orange'} />
                : <AntDesign name="staro" size={24} color={'orange'} />

            stars.push(
                <TouchableOpacity
                    key={i}
                    style={styles.starItem}
                    onPress={() => handleStarClick(i + 1)} // Індексація з 1 для уникнення непорозумінь
                >
                    {starIcon}
                </TouchableOpacity>
            );
        }

        return stars;
    };

    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Rating</Text>
            <View style={styles.starBlock}>
                {renderStars()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {

    },
    title: {
        textAlign: "center",
        fontSize: 18,
        marginBottom: 5
    },
    starBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 15
    },
    starItem: {
    },
})

