import React, { useState } from 'react';
import type { AppContext } from "@netless/window-manager";
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from '../../hooks/useAgora';
import MediaPlayer from '../../components/MediaPlayer';
const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });
import { Card, Button, Avatar, Layout, Form, Input, Tooltip } from 'antd';
import { AudioOutlined, VideoCameraOutlined, AudioMutedOutlined, VideoCameraAddOutlined } from '@ant-design/icons';
import './OpenVideo.css';
const footStyle: React.CSSProperties = {
    color: '#fff'
};

export interface AppProps {
    context: AppContext;
}

function OpenVideo({ context }: AppProps) {

    const [appid, setAppid] = useState('a1f92f56e7f94c57a6c7bfdd867cd461');
    const [token, setToken] = useState('006a1f92f56e7f94c57a6c7bfdd867cd461IAB8xNBaWuNhMWq7S8rz29su7jZcjHhGhwj9EdgmTDl4DtJjSIgAAAAAEACOhaHHUiLxYgEAAQBTIvFi');
    const [channel, setChannel] = useState('123');

    const [openVideo, setOpenVideo] = useState(false);
    const [openSound, setOpenSound] = useState(false);

    const {
        localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers

    } = useAgora(client);


    const { Header, Footer, Content } = Layout;

    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };
    // 打开或者关闭音频
    const changeSound = () => {
        if (!joinState) return
        setOpenSound(!openSound)
        if (openSound) {
            if (localAudioTrack) {
                client.publish(localAudioTrack)
            }
        } else {
            client.unpublish(localAudioTrack)
        }
    }
    // 打开或者关闭视频
    const changeAudio = async () => {
        if (!joinState) return
        if (!localVideoTrack) return
        setOpenVideo(!openVideo)

        if (openVideo) {
            if (localVideoTrack) {

                await localVideoTrack!.setEnabled(true)
                client.publish(localVideoTrack)
            }
        } else {
            if (localVideoTrack) {
                await localVideoTrack.setEnabled(false)
                client.unpublish(localVideoTrack)
            }
        }
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
                                    <Tooltip className='margin-right' title="打开/关闭声音">
                                        <Button type="primary" disabled={!joinState} shape="circle" icon={openSound ? <AudioMutedOutlined /> : <AudioOutlined />} onClick={() => { changeSound() }} />
                                    </Tooltip>,
                                    <Tooltip className='margin-right' title="打开/关闭视频">
                                        <Button type="primary" disabled={!joinState} shape="circle" icon={openVideo ? <VideoCameraAddOutlined /> : <VideoCameraOutlined />} onClick={() => { changeAudio() }} />
                                    </Tooltip>
                                ]}
                            >
                                <Meta
                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                    title={joinState && localVideoTrack ? `我：(${client.uid})` : ''}
                                    description=""
                                />
                            </Card>
                            {remoteUsers.map(user => (
                                <Card
                                    cover={
                                        <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack}></MediaPlayer>
                                    }
                                    actions={[
                                        <Tooltip className='margin-right' title="打开/关闭声音">
                                            <Button type="primary" disabled shape="circle" icon={!user.hasAudio ? <AudioMutedOutlined /> : <AudioOutlined />} />
                                        </Tooltip>,
                                        <Tooltip className='margin-right' title="打开/关闭视频">
                                            <Button type="primary" disabled shape="circle" icon={!user.hasVideo ? <VideoCameraAddOutlined /> : <VideoCameraOutlined />}/>
                                        </Tooltip>
                                    ]}
                                >
                                    <Meta
                                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                        title={`会议人员编号：(${user.uid})`}
                                        description=""
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
                                <Button type="primary" disabled={!joinState} shape="circle" icon={openSound ? <AudioMutedOutlined /> : <AudioOutlined />} onClick={() => { changeSound() }} />
                            </Tooltip>,
                            <Tooltip className='margin-right' title="打开/关闭视频">
                                <Button type="primary" disabled={!joinState} shape="circle" icon={openVideo ? <VideoCameraAddOutlined /> : <VideoCameraOutlined />} onClick={() => { changeAudio() }} />
                            </Tooltip>
                            <Button type="primary" id='join' className='btn btn-primary btn-sm margin-right' disabled={joinState} onClick={() => { join(appid, channel, token) }}>加入</Button>
                            <Button id='leave' type="primary" className='btn btn-primary btn-sm margin-right' disabled={!joinState} onClick={() => { leave() }}>离开</Button>
                        </Form>
                    </div>

                </Footer>
            </Layout>
        </div>
    );
}
export default OpenVideo;
