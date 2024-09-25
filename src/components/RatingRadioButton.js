
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {ratingOptions} from "../mock/ratingOptions";
import {THEME} from "../utilities/theme";
import {useDispatch, useSelector} from "react-redux";
import {setRating} from "../store/FiltersSlice";

export const RatingRadioButton = () => {
    const dispatch = useDispatch()
    const {rating} = useSelector(state => state.filters)
    const handleOptionSelect = (id) => {
        dispatch(setRating(id))
    };

    return (
        <View style={styles.container}>
            {ratingOptions.map(({ value, label }) => (
                <TouchableOpacity
                    key={value}
                    style={styles.optionContainer}
                    onPress={() => handleOptionSelect(value)}
                >
                    <View style={styles.radioButton}>
                        {rating === value && <View style={styles.innerCircle} />}
                    </View>
                    <Text style={styles.optionText}>{label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: THEME.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    innerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: THEME.secondary,
    },
    optionText: {
        fontSize: 16,
    },
});

