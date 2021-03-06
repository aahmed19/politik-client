import React from 'react';
import backgroundTheme from '../../themes/containerBackgroundColor';
import tabTheme from '../../themes/tabTheme';
import headerTheme from '../../themes/headerTheme';

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 70,
        width: 275,
        textAlign: 'center',
        color: 'black',
        fontWeight: '200'
    },
    button: {
        width: 300,
        alignItems: 'center',
        justifyContent: 'space-around'
    }
};

export default styles;