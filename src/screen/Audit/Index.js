import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Container, Content, Radio, List, ListItem, Left, Body, Button, Text, Card, CardItem, Grid, Col, Fab, Header } from 'native-base'

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { connect } from 'react-redux';
import { auditActions } from '../../redux/action';

class Audit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            unit: {},
            auditStartBtn: false
        }
    }

    UNSAFE_componentWillMount = () => {
        this.props.getCategories().then((data) => {
            if (data.success) {
                this.setState({ ...this.state, categories: this.props.audit.categories });
            }
        })
    }

    componentDidMount = () => {
        let barcode = this.props.navigation.getParam('barcode');
        if (barcode == undefined || barcode == null) {
            this.props.navigation.push('QrCode');
        } else {
            let data = JSON.parse(barcode);
            this.setState({ ...this.state, unit: { ...data } })
        }


    }

    selectCategory = (cat) => {
        var category = this.state.categories.find((c, i) => { if (c.id === cat.id) { return cat } })
        if (category !== null && category !== undefined) {
            category.selected = true;

            this.state.categories.forEach((val, ind) => {
                if (val.id !== category.id) {
                    val.selected = false;
                }
            })
            this.setState({
                categories: this.state.categories,
                unit: this.state.unit,
                auditStartBtn: true
            })
        }
    }

    navigatToHome = () => {
        let selectedValue = this.state.categories.find((value, index) => {
            if (value.selected) {
                return value;
            } else {
                return null
            }
        })

        if (selectedValue !== null && selectedValue !== undefined) {
            let model = {
                uhkCode: this.state.unit.unitCode,
                auditType: selectedValue.id
            }
            Alert.alert("Onay!", "Denetlemeyi başlatmak istediğinize emin misiniz?", [{
                text: "İptal",
                onPress: () => { },
                style: "cancel"
            }, {
                text: 'Denetlemeyi başlatmak istiyorum',
                onPress: () => {
                    this.props.startAudit(model).then((value) => {
                        this.props.navigation.push('Home')
                    }).catch((error) => { })
                },
                style: 'default'
            }])

        }
        else {
            Alert.alert('Dikkat !', "Lütfen denetleme türünü seçiniz?\nEğer seçmezseniz denetlemeye başlamış sayılmayacaksınız")
        }

    }

    render() {
        return (
            <Container style={styles.container}>
                <Header style={[styles.header]} androidStatusBarColor="#3B4BB3" >
                    <Left >
                        <Button onPress={() => this.props.navigation.push('QrCode')} transparent>
                            <SimpleLineIcons name="arrow-left" size={16} style={{ position: 'absolute', color: '#fff' }} />
                        </Button>
                    </Left>
                    <Body></Body>
                </Header>
                <Content padder scrollEnabled={true}>
                    {
                        this.state.unit ? <Card style={[styles.card]}>
                            <CardItem style={[styles.cardItem]}>
                                <Text style={[styles.itemInfoRowText]}>İstasyon bilgileri</Text>
                            </CardItem>
                            <CardItem header button style={[styles.cardItem]}>
                                <Text> {this.state.unit?.name}  ({this.state.unit?.unitCode})</Text>
                            </CardItem>
                            <CardItem button style={[styles.cardItem]}>
                                <Body>
                                    <Grid>
                                        <Col size={1} >
                                            <Text >Adres:</Text>
                                        </Col>
                                        <Col size={3}>
                                            <Text>{this.state.unit?.address}</Text>
                                        </Col>
                                    </Grid>
                                    <Grid>
                                        <Col size={1}>
                                            <Text>Telefon:</Text>
                                        </Col>
                                        <Col size={3}>
                                            <Text>{this.state.unit?.phone}</Text>
                                        </Col>
                                    </Grid>
                                    <Grid>
                                        <Col size={1}>
                                            <Text>Fax:</Text>
                                        </Col>
                                        <Col size={3}>
                                            <Text>{this.state.unit?.fax}</Text>
                                        </Col>
                                    </Grid>
                                </Body>
                            </CardItem>

                        </Card> : null
                    }

                    <List style={[styles.list]}>
                        <ListItem style={[styles.listItem]}><Text style={[styles.itemSelectText]}>Yap istediğiniz denetim türünü seçiniz?</Text></ListItem>
                        {this.state.categories.map((cat, ind) => {
                            return (
                                <ListItem selected={false} key={cat.id} onPress={() => { this.selectCategory(cat) }} style={[styles.listItem]}>
                                    <Body style={styles.itemRow}>
                                        <Radio
                                            color={"#5067FF"}
                                            selectedColor={"#5067FF"}
                                            selected={cat.selected}
                                            onPress={() => { this.selectCategory(cat) }}
                                        />
                                        <Text style={styles.item}>{cat.value}</Text>
                                    </Body>
                                </ListItem>
                            )
                        })}
                    </List>


                </Content>
                {
                    this.state.auditStartBtn ? <Fab
                        active={true}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: '#5067FF', borderRadius: 50, width: 240, right: 0, }}
                        position="bottomRight"
                        onPress={() => this.navigatToHome()}>
                        <Text style={{ fontSize: 20 }}>
                            Denetimi Başlat  <SimpleLineIcons name="flag" size={22} style={{ position: 'absolute' }} />
                        </Text>
                    </Fab> : null
                }

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingVertical: 20
    },
    header: { backgroundColor: '#3B4BB3' },
    list: {
        marginTop: 20
    },
    listItem: {
        marginLeft: 0
    },
    itemInfoRowText: {
        fontSize: 20,
        fontWeight: "bold"
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
        paddingBottom: 15
    },
    cardItem: {
        borderRadius: 0
    }
})
const mapStateProps = state => {
    const { audit } = state;
    return { audit };
}

const mapDispatchProps = dispatch => ({
    getCategories: () => dispatch(auditActions.getCategories()),
    startAudit: (model) => dispatch(auditActions.startAudit(model))
})

export default connect(mapStateProps, mapDispatchProps)(Audit);