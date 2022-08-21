import { MenuProps, message, Tooltip } from 'antd';
import { Button, Menu } from 'antd';
import React, { Component } from 'react'
import { Image } from 'antd';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Search from '../../components/Search';
import { Descriptions } from 'antd';
type Props = {}

type State = {}
import { Layout } from 'antd';
import axios from 'axios';
import { SERVICE_URL } from '../../utils';
type MenuItem = Required<MenuProps>['items'][number];

export default class Home extends Component<Props, State> {
    // 通过我的白板加入房间
    openMyRoom(room: any) {
        this.props.history.push('/myroom', { ...room })
    }

    // 注销
    logout = () => {
        window.sessionStorage.removeItem("user");
        this.props.history.replace('/login')
    }
    getItem = (
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
    ): MenuItem => {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    }
    items: MenuItem[] = [
        this.getItem(<Link to='/home'>我的白板</Link>, '1', <PieChartOutlined />)
    ];
    items1: MenuItem[] = [
        this.getItem(<Link to='/login'>退出登录</Link>, '1', <PieChartOutlined />)
    ];

    state = {
        collapsed: false,
        myRoomList: [],
        loading: false
    }

    toggleCollapsed = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };
    async componentWillMount() {
        const param = {
            username: window.sessionStorage.getItem("user")
        }
        this.setState({ loading: true })
        await axios.post(SERVICE_URL+'/room/list', param).then((res: any) => {
            if (res.data.code === 200) {
                this.setState({ myRoomList: res.data.data })
                console.log(this.state)
            } else {
                message.error('未知错误！');
            }
            this.setState({ loading: false })
        })
    }
    render() {
        const { Header, Footer, Sider, Content } = Layout;
        return (
            <div className='home'>
                <Layout>
                    <Sider style={{ height: '100vh', background: '#fff' }}>
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            inlineCollapsed={false}
                            items={this.items}
                        />
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: '18px 18px 25px 25px', position: 'relative' }}>
                            <Search></Search>
                        </Header>
                        <Content style={{ background: '#fff', padding: '18px 18px 25px 25px' }}>
                            <Descriptions title="我的白板" column={{ xxl: 6, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}>
                                {
                                    this.state.myRoomList.map((room, key) => (
                                        <Descriptions.Item key={key}>
                                            <Tooltip title={`房间号：${room.roomName}`}>
                                                <Image
                                                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                                                    preview={{
                                                        visible: false
                                                    }}

                                                    onClick={() => this.openMyRoom(room)}
                                                />
                                            </Tooltip>
                                        </Descriptions.Item>
                                    ))
                                }
                            </Descriptions>
                        </Content>
                        <Footer style={{ background: '#fff', padding: '18px 18px 25px 25px' }}>
                            <Menu
                                theme='dark'
                                style={{ width: '256px', backgroundColor: '#a9bcdd' }}
                                defaultOpenKeys={['sub1']}
                                mode="inline"
                                items={this.items1}
                                onClick={this.logout}
                            />
                        </Footer>
                    </Layout>
                </Layout>
            </div>

        )
    }
}