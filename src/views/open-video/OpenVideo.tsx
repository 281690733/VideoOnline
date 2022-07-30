import React, { useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from '../../hooks/useAgora';
import MediaPlayer from '../../components/MediaPlayer';
const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });
import { Card, Button, Avatar, Layout, Form ,Input, Tooltip} from 'antd';
import { AudioOutlined, VideoCameraOutlined } from '@ant-design/icons';
import './OpenVideo.css';
const footStyle: React.CSSProperties = {
    color: '#fff'
};

function OpenVideo() {
  const [ appid, setAppid ] = useState('a1f92f56e7f94c57a6c7bfdd867cd461');
  const [ token, setToken ] = useState('006a1f92f56e7f94c57a6c7bfdd867cd461IAAow1yzPDkP2M9j2+yrnuvjZTCYVuaVXz7OieFTvezSjdJjSIgAAAAAEACGukDPL53mYgEAAQAuneZi');
  const [ channel, setChannel ] = useState('123');
  const {
    localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers
  } = useAgora(client);

  const { Header, Footer, Content } = Layout;
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  const { Meta } = Card;
  return (
    <div className='OpenVideo'>
        <Layout>
            <Content>
                <div className='OpenVideo-content'>
                    <div className='OpenVideo-content-main'>
                        <Card
                            cover={
                            <MediaPlayer videoTrack={localVideoTrack} audioTrack={undefined}></MediaPlayer>
                            }
                            actions={[
                            
                            <AudioOutlined  key="changeAudio" />,
                            <VideoCameraOutlined key="changeVideoCamera" />
                            ]}
                        >
                            <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title={joinState && localVideoTrack ? `(${client.uid})` : ''}
                            description="This is the description"
                            />
                        </Card>
                        {remoteUsers.map(user => (
                            <Card
                                cover={
                                <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack}></MediaPlayer>
                                }
                                actions={[
                            
                                <AudioOutlined  key="changeAudio" />,
                                <VideoCameraOutlined key="changeVideoCamera" />
                                ]}
                            >
                                <Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                title={`remoteVideo(${user.uid})`}
                                description="This is the description"
                                />
                            </Card>
                        ))}
                    </div>
                </div>

            </Content>
            <Footer>
                <div className='foot-button'>
                    <Form className='OpenVideo-form' layout='inline'>
                        <Tooltip className='margin-right' title="打开/关闭声音">
                            <Button type="primary" shape="circle" icon={<AudioOutlined />} />
                        </Tooltip>
                        <Tooltip className='margin-right' title="打开/关闭视频">
                            <Button type="primary" shape="circle" icon={<VideoCameraOutlined />} />
                        </Tooltip>
                        <Button type="primary"  id='join' className='btn btn-primary btn-sm margin-right' disabled={joinState} onClick={() => {join(appid, channel, token)}}>加入</Button>
                        <Button id='leave' type="primary" className='btn btn-primary btn-sm margin-right' disabled={!joinState} onClick={() => {leave()}}>离开</Button>
                    </Form>
                </div>

            </Footer>
        </Layout>
    </div>
  );
}

export default OpenVideo;
