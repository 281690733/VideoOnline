import React, { Component } from 'react'
import { Button, Input, message, Modal, Space } from 'antd';
import { Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { SERVICE_URL } from '../../utils';
type Props = {}

type State = {}

class Search extends Component<Props, State> {
  
  state = {
    visible: false,
    loading: false,
    modalTitle: '',
    modalMessage: '',
    type: '',
    inputRoomName: ''
  }
  onSearch = (value: string) => {
    console.log(value);
  }
  // 加入房间
  joinWPage = () => {
    this.setState({ visible: true ,modalTitle: '加入房间',modalMessage: '请输入已存在的房间号加入房间', type: 'joinRoom'})
  }
  // 创建房间
  createWPage = () => {
    this.setState({ visible: true ,modalTitle: '创建房间',modalMessage: '是否随机创建一个白板房间？', type: 'createRoom'})
  }
  handleOk = async () => {
    if(this.state.type === 'createRoom'){
      const param = {
        username: window.sessionStorage.getItem("user")
      }
      this.setState({ loading: true })
      await axios.post(SERVICE_URL+'/create/room', param).then(async (res: any) => {
        if (res.data.code === 200) {
          const param2 = {
            roomName: res.data.data
          }
          await axios.post(SERVICE_URL+'/join/room', param2).then((res1: any) => {
            if (res1.data.code === 200) {
              this.props.history.push('/myroom', { ...res1.data.data })
            }else{
              message.error('创建房间失败');
            }
          })
        }else{
          message.error('创建房间失败');
        }
        this.setState({
          loading: false
        });
      })
    }else{
      if(this.state.inputRoomName !== ''){
        const param2 = {
          roomName: this.state.inputRoomName
        }
        this.setState({ loading: true })
        await axios.post(SERVICE_URL+'/join/room', param2).then((res1: any) => {
          if (res1.data.code === 200) {
            this.props.history.push('/myroom', { ...res1.data.data })
          }else{
            message.error('加入房间失败');
          }
          this.setState({ loading: false })
        })
      }
    }

  }
  handleCancel = () => {
    this.setState({
      visible: false,
      loading: false
    });
  }
  render() {
    const { Search } = Input;
    return (
      <div className='search-main'>
        <Row>
          <Col span="15">
            <div className='search-input'>
              <Search style={{ paddingTop: '16px' }} placeholder="input search text" onSearch={this.onSearch} enterButton />
            </div>
          </Col>
          <Col span="9">
            <div style={{ marginLeft: '32px', float: 'right' }}>
              <span style={{ marginRight: '16px' }}>
                <Button type="dashed" onClick={this.joinWPage}>加入白板</Button>
              </span>
              <span style={{ marginRight: '40px' }}>
                <Button type="primary" onClick={this.createWPage}>创建白板</Button>
              </span>

            </div>
          </Col>
        </Row>
        <Modal title={this.state.modalTitle} confirmLoading={this.state.loading} visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
          okText="确认" cancelText="取消">
          <p>{this.state.modalMessage}</p>
          {this.state.type === 'joinRoom' ? <Input value={this.state.inputRoomName} onChange={(event)=>{this.setState({inputRoomName: event.target.value})}} placeholder="请输入房间号" /> : ''}
          
        </Modal>
      </div>
    )
  }
}
export default withRouter(Search)