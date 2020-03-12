import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { Container, Header, Body, Content, Left, Right, Title, Fab, View, Button, Card, CardItem, Grid, Col, Row, Text, Badge, Spinner } from 'native-base'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import { Logout } from '../../service/login'
import { connect } from 'react-redux';
import { auditActions } from '../../redux/action';

import {homeStyle as styles} from './style';
import {globalCss} from '../../assets/style';

class Home extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            active: false,
            audit: {},
            loading: false,
            isActiveAudit: false
        }
    }
    UNSAFE_componentWillMount = () => {

    }
    componentDidMount = () => {
        this.props.getActiveAudit().then((value) => {
            if (value.result !== null)
                this.setState({ active: false, audit: value.result, loading: false, isActiveAudit: true })
            else
                this.setState({ active: true, loading: false, audit: {}, isActiveAudit: false })
        }).catch((error) => {
            this.setState({ active: true, loading: false, audit: {}, isActiveAudit: false })
        })
    }

    endAudit = () => {
        this.props.navigation.push('QrCode', {
            isActiveAudit: this.state.isActiveAudit,
            auditType: this.props.audit.audit.auditType
        });
    }

    logout = async () => {
        Logout().then((val) => {
            this.props.navigation.push('SignIn', { isLogout: true });
        })
    }
    render() {
        return (
            <Container style={[styles.container]}>
                <Header transparent={true} style={styles.header}>
                    <Left style={{flex:2}}>
                        <TouchableOpacity onPress={() => { this.logout() }}>
                            <SimpleLineIcons name="logout" size={24} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={{flex:15,alignItems:'center'}}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Aktif Denetlemeleriniz</Text>
                    </Body>
                </Header>
                {this.props.audit.isLoading ? <ActivityIndicator color='#3B4BB3' style={[styles.loader]} /> : null}

                <Content style={[styles.content]}>
                    {
                        this.props.audit.audit !== {} && this.state.audit?.unit !== undefined ? 
                        <Card style={[styles.card]} noShadow>
                            <CardItem style={[styles.cardItem]}>
                                <Text style={[styles.itemInfoRowText]}>İstasyon bilgileri</Text>
                            </CardItem>
                            <CardItem style={[styles.cardItem]}>
                                <Text> {this.state.audit.unit?.name}</Text>

                            </CardItem>
                            <CardItem button style={[styles.cardItem]}>
                                <Body>
                                    <Grid>
                                        <Col size={1} >
                                            <Text >İstasyon Kodu:</Text>
                                        </Col>
                                        <Col size={3}>
                                            <Text>{this.state.audit.unit?.unitCode}</Text>
                                        </Col>
                                    </Grid>
                                    <Grid>
                                        <Col size={1} >
                                            <Text >Adres:</Text>
                                        </Col>
                                        <Col size={3}>
                                            <Text>{this.state.audit.unit?.address}</Text>
                                        </Col>
                                    </Grid>
                                    <Grid>
                                        <Col size={1}>
                                            <Text>Telefon:</Text>
                                        </Col>
                                        <Col size={3}>
                                            <Text>{this.state.audit.unit?.phone}</Text>
                                        </Col>
                                    </Grid>
                                    <Grid>
                                        <Col size={1}>
                                            <Text>Fax:</Text>
                                        </Col>
                                        <Col size={3}>
                                            <Text>{this.state.audit.unit?.fax}</Text>
                                        </Col>
                                    </Grid>
                                </Body>
                            </CardItem>

                            {
                                this.state.audit.category ? <CardItem>
                                    <Grid>
                                        <Col size={1}>
                                            <Text>Durum:</Text>
                                        </Col>
                                        <Col size={3}>
                                            <Badge style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}>
                                                <Text style={{ fontWeight: 'bold' }}>{this.state.audit?.category?.name}</Text>
                                            </Badge>
                                        </Col>
                                    </Grid>
                                </CardItem> : null
                            }
                            <CardItem>
                                <Grid>
                                    <Col><Button block danger onPress={() => { this.endAudit() }}><Text>Denetimi Bitir</Text></Button></Col>
                                </Grid>
                            </CardItem>
                            <CardItem>
                                <Grid>
                                    <Col>
                                        <Text style={{ color: 'red', fontSize: 14 }}>* Yeni denetime başalamak için aktif denetiminiz sonlandırın.</Text>
                                    </Col>
                                </Grid>
                            </CardItem>

                        </Card> : null
                    }
                    <Card noShadow style={{}}>
                        <CardItem>
                            <Body>
                                <Grid>
                                    <Col style={{ textAlign: 'center' }}>
                                        <TouchableOpacity style={styles.releoadBtn} onPress={() => this.componentDidMount()}>
                                            <Text style={styles.releoadBtnText}>
                                                <SimpleLineIcons name="refresh" size={32} />
                                            </Text>
                                        </TouchableOpacity>
                                    </Col>
                                </Grid>
                            </Body>
                        </CardItem>
                    </Card>
                    {
                        this.state.active ? <Card style={[styles.card]} noShadow>
                            <CardItem style={[styles.cardItem]}>
                                <Text style={[styles.itemInfoRowText]}>
                                    Aktif başlanmış bir denetim bulunamadı. Yeni denetime başlayabilirsiniz.
                                </Text>
                            </CardItem>
                        </Card> : null
                    }


                </Content>
                {
                    this.state.active ? <Fab
                        active={true}
                        direction="up"
                        containerStyle={{}}
                        style={styles.startAudit}
                        position="bottomRight"
                        onPress={() => this.props.navigation.push('QrCode', { isActiveAudit: this.state.isActiveAudit })}>
                        <Text style={globalCss.fs20}>
                            Denetime Başla <SimpleLineIcons name="arrow-right-circle" size={22} style={styles.startAuditPosition} />
                        </Text>
                    </Fab> : null
                }
            </Container>
        )
    }
}


const mapStateProps = state => {
    const { audit } = state;
    return { audit };
}
const mapDispatchProps = dispatch => ({
    getActiveAudit: () => dispatch(auditActions.getActiveAudit())
})
export default connect(mapStateProps, mapDispatchProps)(Home);