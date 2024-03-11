import { Image, Text, TouchableOpacity } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export const CustomTabButton = ({ onPress, iconSource, label, tintColor, customStyle, customTextStyle }) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={{ flex: 1, alignItems: 'center', ...customStyle }}>
            <Image
                source={iconSource}
                style={{
                    width: responsiveWidth(30),
                    height: responsiveHeight(3.5),
                    resizeMode: 'contain',
                    tintColor: tintColor,
                }}
            />
            <Text style={{ fontSize: responsiveFontSize(1.5), marginTop: responsiveHeight(0.2), color: tintColor, ...customTextStyle }}>{label}</Text>
        </TouchableOpacity>
    );
};


export const resetStackToInitialState = (navigation, stackName) => {
    navigation.reset({
        index: 0,
        routes: [{ name: stackName }],
    });
};
