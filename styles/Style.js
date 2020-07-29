import {
    StyleSheet, SafeAreaView
} from 'react-native';
import Color from '../constants/color'
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
		marginTop: Constants.statusBarHeight,
        marginHorizontal: 20,
        flexDirection: 'column'
    },
    formTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Color.primary
    },
    errorMessageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 6
    },
    errorMessage: {
        color: Color.error,
        fontSize: 16,
        fontWeight: '700'
    },
    inputForm: {
        marginHorizontal: 12
    },
    inputTitle: {
        color: Color.tertiary,
        fontSize: 10,
        marginVertical: 4
    },
    inputBox: {
        borderBottomColor: Color.tertiary,
        borderBottomWidth: 1,
        height: 36,
        marginBottom: 18,
        fontSize: 16
    },
    majorButton: {
        backgroundColor: Color.primary,
        borderRadius: 8,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4
    },
    majorButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white'
    },
    minorButton: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Color.primary,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4
    },
    minorButtonText: {
        fontWeight: '500',
        fontSize: 16,
        color: Color.primary,
    },
})
