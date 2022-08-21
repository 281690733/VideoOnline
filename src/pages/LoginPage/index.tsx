import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import axios from 'axios';
import React, { Component, useRef } from 'react'
import { SERVICE_URL } from '../../utils';
import './index.less'

type Props = {}

type State = {}

export default class Login extends Component<Props, State> {
    state = {
        title : '用户登陆',
        username: '',
        password: '',
        button: '登录',
        loading: false
    }
    onFinish = async () => {
        const param ={
            username: this.state.username,
            password: this.state.password,
            code: '666666'
        }
        this.setState({loading: true})
        await axios.post(SERVICE_URL+'/login1',param).then((res: any) => {
            if(res.data.code === 200){
                window.sessionStorage.setItem("user", res.data.data.username)
                console.log(window.sessionStorage.getItem("user"))
                this.props.history.replace("/home")
            }else{
                message.error('登录失败！');
            }
            this.setState({loading: false})
        })
    }
    // 名字改变时更新状态
    handleUsernameValueChange = (event:any) => {
        this.setState({username: event.target.value})
    }
    // 密码改变时更新状态
    handlePasswordValueChange = (event:any) => {
        this.setState({password: event.target.value})
    }
    render() {
        return (
            <div className="login-page-container">
                <div className="login">
                    <section className="login-content">
                        <h2>{this.state.title}</h2>
                        <Form name="normal_login" className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="username"
                                // 声明式验证：直接使用别人定义好的验证规则进行验证
                                rules={[
                                    { required: true, whitespace: true, message: '请输入用户名!' },
                                    /*  输入的用户名/密码要求：
                                          必须输入
                                          必须大于4位
                                          必须小于12位
                                          必须是英文 数字或者下划线组成
                                     */
                                    { min: 2, message: '用户名最少4位' },
                                    { max: 12, message: '用户名最多12位' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文 数字或者下划线组成' },
                                ]}
                            >
                                <Input value={this.state.username} onChange={this.handleUsernameValueChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" style={{ color: 'rgba(0,0,0,.25)' }} />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入你的密码!',
                                    },
                                ]}
                            >
                                <Input value={this.state.password} onChange={this.handlePasswordValueChange} prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" style={{ color: 'rgba(0,0,0,.25)' }} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
                                    {this.state.button}
                                </Button>
                            </Form.Item>
                        </Form>
                    </section>
                </div>
            </div>

        )
    }
}