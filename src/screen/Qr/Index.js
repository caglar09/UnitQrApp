import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert, ScrollView } from 'react-native'
import { RNCamera } from 'react-native-camera';
import { Button, Spinner } from 'native-base'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { ModalFooter, ModalButton, ModalContent } from 'react-native-modals';
import Modal from 'react-native-modalbox'
import { FinishAudit } from '../../service/audit'
import { connect } from 'react-redux';
import { auditActions } from '../../redux/action';

class QrCodeReader extends Component {
    constructor(props) {
        super(props);
        this.camera = React.createRef();
        this.state = {
            isReaded: false,
            data: {},
            isVisible: false,
            isLoading: false,
            isActiveAudit: this.props.navigation.getParam('isActiveAudit'),
            auditType: this.props.navigation.getParam('auditType')
        }
        console.log(this.state)
    }

    cancelModal = () => {
        this.setState({
            isReaded: false,
            isVisible: false,
            data: {},
            isLoading: true,
        }, () => {
            this.setState({ ...this.state, isLoading: false })
        })
    }
    finishAudit = () => {
        let model = {
            uhkCode: this.state.data.unitCode,
            auditType: this.state.auditType
        }
        Alert.alert("Onay!", "Denetlemeyi tamamlamak istediğinize emin misiniz?", [{
            text: "İptal",
            onPress: () => this.cancelModal(),
            style: "cancel"
        }, {
            text: 'Denetlemeyi tamamlamak istiyorum',
            onPress: () => {
                this.setState({ ...this.state, isLoading: true })
                this.props.finishAudit(model).then((value) => {
                    if (value.success) {
                        this.setState({ ...this.state, isVisible: false, isLoading: false }, () => {
                            this.props.navigation.push('Home');
                        })
                    }
                }).catch((error) => {
                    this.props.navigation.push('Home');
                })
            },
            style: 'default'
        }])
    }
    navigateToAudit = () => {

        this.setState({
            ...this.state,
            isVisible: false,
            isLoading: true
        }, () => {
            this.setState({ ...this.state, isLoading: false })
            this.props.navigation.push('Audit', {
                barcode: JSON.stringify(this.state.data)
            })
        })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <RNCamera
                    ref={ref => { this.camera = ref; }}
                    style={{ flex: 1, width: '100%', }}
                    onBarCodeRead={(barcode) => {
                        if (!this.state.isReaded) {
                            this.setState({ isReaded: true, data: JSON.parse(barcode.data), isVisible: true })
                            console.log(barcode.data);
                        }
                    }}
                    autoFocus={'on'}
                    flashMode={RNCamera.Constants.FlashMode.on}
                >
                    <TouchableOpacity style={[styles.backBtn]} onPress={() => { this.props.navigation.push('Home') }}>
                        <SimpleLineIcons name="arrow-left" size={10} style={[styles.backBtnTextIcon]} /><Text style={[styles.backBtnText]}></Text>
                    </TouchableOpacity>
                    <Modal isOpen={this.state.isVisible} onClosed={() => this.setState({ isVisible: false, isReaded: false })} style={styles.modal} position={"bottom"} swipeToClose={false}>
                        <View style={[styles.body]}>
                            <ScrollView>
                                <View style={[styles.row]}>
                                    <Text style={[styles.rowTextTitle]}>İstasyon:</Text>
                                    <Text style={[styles.rowText]}>{this.state.data.name}</Text>
                                </View>
                                <View style={[styles.row]}>
                                    <Text style={[styles.rowTextTitle]}>İstasyon Kodu:</Text>
                                    <Text style={[styles.rowText]}>{this.state.data.unitCode}</Text>
                                </View>
                                <View style={[styles.row]}>
                                    <Text style={[styles.rowTextTitle]}>Telefon: </Text>
                                    <Text style={[styles.rowText]}>{this.state.data.phone}</Text>
                                </View>
                                <View style={[styles.row]}>
                                    <Text style={[styles.rowTextTitle]}>Fax: </Text>
                                    <Text style={[styles.rowText]}>{this.state.data.fax}</Text>
                                </View>
                                <View style={[styles.row]}>
                                    <Text style={[styles.rowTextTitle]}>Adress: </Text>
                                    <Text style={[styles.rowText]}>{this.state.data.address}</Text>
                                </View>
                            </ScrollView>
                        </View>
                        <View style={styles.modalFooter}>
                            {!this.state.isActiveAudit ? <View style={[styles.modalFooter]}>
                                <TouchableOpacity onPress={() => { this.cancelModal() }} style={[styles.modalBtn, styles.modalFooterCol]} >
                                    <Text style={{ width: '100%', textAlign: 'center' }}>İptal</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.navigateToAudit()} style={[styles.modalBtn, styles.modalFooterCol]}>
                                    <Text style={{ width: '100%', textAlign: 'center' }}>Onayla</Text>
                                </TouchableOpacity>

                            </View> : <View></View>}

                            {
                                this.state.isActiveAudit ? <View style={[styles.modalFooter]}>
                                    <TouchableOpacity onPress={() => { this.cancelModal() }} style={[styles.modalBtn, styles.modalFooterCol]} >
                                        <Text style={{ width: '100%', textAlign: 'center' }}>İptal</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => { this.finishAudit() }} style={[styles.modalBtn, styles.modalFooterCol]} >
                                        <Text style={{ width: '100%', textAlign: 'center' }}>Denetlemeyi Bitir</Text>
                                    </TouchableOpacity>
                                </View> : <View></View>
                            }

                        </View>
                    </Modal>

                </RNCamera>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    backBtn: {
        position: 'absolute',
        top: 30,
        left: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#204ECF',
        borderRadius: 50,
        width: 30,
        height: 30,
        textAlign: 'center',
        paddingVertical: 8,
        paddingHorizontal: 8
    },
    backBtnTextIcon: { color: '#fff', fontSize: 14 },
    backBtnText: {
        color: '#fff'
    },
    row: {
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    rowText: {
        fontSize: 16
    },
    rowTextTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    modal: { height: 370 },

    modalFooterCol: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    modalBtn: {
        paddingVertical: 20,
        zIndex: 100000
    },
    modalFooter: {
        // position: 'absolute',
        width: '100%',
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#e4e4e4',
        borderWidth: .5,
        zIndex: 100,
        height: 70,
    },
    body: {
        height: 300,
        flex: 1,
        overflow: 'scroll'
    },
})
const mapStateProps = state => {
    const { audit } = state;
    return { audit };
}
const mapDispatchProps = dispatch => ({
    finishAudit: (model) => dispatch(auditActions.finishAudit(model))
})
export default connect(mapStateProps, mapDispatchProps)(QrCodeReader);