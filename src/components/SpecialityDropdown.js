import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import {THEME} from "../utilities/theme";

export const SpecialityDropdown = ({value, onChange, specialities}) => {
    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.value === value && (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                    />
                )}
            </View>
        );
    };

    return (
        <Dropdown
            style={[styles.dropdown, {borderColor: value ? THEME.secondary : THEME.lightBg}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={specialities}
            maxHeight={150}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            value={value}
            onChange={item => {
                onChange(item.value);
            }}
            renderItem={renderItem}
        />
    );
};

const styles = StyleSheet.create({
    dropdown: {
        width: '100%',
        height: 50,
        backgroundColor: THEME.lightBg,
        borderRadius: 15,
        borderWidth: 2,
        paddingHorizontal: 20,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 17,
        color: THEME.grayText
    },
    placeholderStyle: {
        fontSize: 18,
        color: THEME.grayText
    },
    selectedTextStyle: {
        fontSize: 18,
        color: THEME.grayText
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: THEME.grayText
    },
});
