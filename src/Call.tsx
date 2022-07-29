import React, { useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from './hooks/useAgora';
import MediaPlayer from './components/MediaPlayer';
import './Call.css';
import { Card, Col, Row, Button } from 'antd';;

const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function Call() {
  const [ appid, setAppid ] = useState('a1f92f56e7f94c57a6c7bfdd867cd461');
  const [ token, setToken ] = useState('006a1f92f56e7f94c57a6c7bfdd867cd461IABr0RLUKK3cDAhGsu8Qffqe7M2TbCfPZq83CGCYd9Tm09JjSIgAAAAAEACGukDPLPbjYgEAAQAs9uNi');
  const [ channel, setChannel ] = useState('');
  const {
    localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers
  } = useAgora(client);

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <div className='call'>
      <form className='call-form'>
        {/* <label className='app-id'>
          AppID:
          <input type='text' name='appid' value='a1f92f56e7f94c57a6c7bfdd867cd461' onChange={(event) => { setAppid(event.target.value) }}/>
        </label>
        <label className='token'>
          Token(Optional):
          <input type='text' name='token' value='006a1f92f56e7f94c57a6c7bfdd867cd461IABr0RLUKK3cDAhGsu8Qffqe7M2TbCfPZq83CGCYd9Tm09JjSIgAAAAAEACGukDPLPbjYgEAAQAs9uNi' onChange={(event) => { setToken(event.target.value) }} />
        </label> */}
        <label>
          会议号:(例如：123)
          <input type='text' name='channel' onChange={(event) => { setChannel(event.target.value) }} />
        </label>
        <div className='button-group'>
          <Button type="primary"  id='join' className='btn btn-primary btn-sm' disabled={joinState} onClick={() => {join(appid, channel, token)}}>加入</Button>
          <Button id='leave' type="primary" className='btn btn-primary btn-sm' disabled={!joinState} onClick={() => {leave()}}>离开</Button>
        </div>
      </form>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={16/remoteUsers.length > 8 ? 8 : 16/remoteUsers.length}>
            <Card title={joinState && localVideoTrack ? `(${client.uid})` : ''} bordered={false} cover={<MediaPlayer videoTrack={localVideoTrack} audioTrack={undefined}></MediaPlayer>}>
            </Card>
          </Col>
          {remoteUsers.map(user => (<Col span={16/remoteUsers.length > 8 ? 8 : 16/remoteUsers.length}>
            <Card title={`remoteVideo(${user.uid})`} bordered={false} cover={<MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack}></MediaPlayer>}></Card>
            </Col>))}
        </Row>
      </div>
      <div className='player-container'>
      {/* <Carousel afterChange={onChange}>
        <div style={contentStyle}>
          <p className='local-player-text'>{localVideoTrack && `localTrack`}{joinState && localVideoTrack ? `(${client.uid})` : ''}</p>
          <MediaPlayer videoTrack={localVideoTrack} audioTrack={undefined}></MediaPlayer>
        </div>
        {remoteUsers.map(user => (<div style={contentStyle} key={user.uid}>
            <p className='remote-player-text'>{`remoteVideo(${user.uid})`}</p>
            <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack}></MediaPlayer>
          </div>))}
      </Carousel> */}
      </div>
    </div>
  );
}

export default Call;
