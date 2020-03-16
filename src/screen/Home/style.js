import { StyleSheet } from 'react-native';

export const homeStyle = StyleSheet.create({
    container: {
    },
    content:{
        borderWidth: 0, 
        height: '100%', 
        width: '100%',
        display:'flex',
    },
    loader: {
        position: 'absolute',
        zIndex: 1000,
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header:{
        elevation: 1,
        display:'flex'
    },
    list: {
        marginTop: 20
    },
    listItem: {
        marginLeft: 0
    },
    itemInfoRowText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center'
    },
    itemSelectText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    itemRow: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        flexWrap: 'wrap'
    },
    item: {
        marginLeft: 10
    },
    card: {
        paddingVertical: 5,
        paddingBottom: 15,
        flex: 1,
        display: 'flex',
        width: '100%'
    },
    cardItem: {
        borderRadius: 0,
        flex: 1,
        display: 'flex',
        width: '100%'
    },
    releoadBtn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    releoadBtnText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    startAudit:{
        backgroundColor: '#5067FF', 
        borderRadius: 50, 
        width: 200, 
        right: 0
    },
    startAuditPosition:{
        position:'absolute'
    }
})