import "./index.css"
import AgoraRTC, {
    IAgoraRTCClient, IAgoraRTCRemoteUser, MicrophoneAudioTrackInitConfig, CameraVideoTrackInitConfig, IMicrophoneAudioTrack, ICameraVideoTrack, ILocalVideoTrack, ILocalAudioTrack, IChannelMediaRelayConfiguration
} from 'agora-rtc-sdk-ng';
import { Avatar, Button, Card, Form, Layout, Tooltip } from 'antd'
import { Content, Footer } from 'antd/lib/layout/layout'
import React, { Component } from 'react'
import MediaPlayer from '../MediaPlayer'
import { AudioMutedOutlined, AudioOutlined, VideoCameraAddOutlined, VideoCameraOutlined } from "@ant-design/icons";
type Props = {
    userId: string
}

type State = {
    localAudioTrack: ILocalAudioTrack | undefined,
    localVideoTrack: ILocalVideoTrack | undefined,
    joinState: boolean,
    remoteUsers: IAgoraRTCRemoteUser[],
    openVideo: boolean,
    openSound: boolean
}


export default class Video extends Component<Props, State> {
    client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });

    constructor(props? :any) {
        super(props);
        this.client.on('user-published', this.handleUserPublished);
        this.client.on('user-unpublished', this.handleUserUnpublished);
        this.client.on('user-joined', this.handleUserJoined);
        this.client.on('user-left', this.handleUserLeft);
    }

    state = {
        localAudioTrack: undefined,
        localVideoTrack: undefined,
        joinState: false,
        remoteUsers: this.client ? this.client.remoteUsers : [],
        openVideo: false,
        openSound: false
    }
    handleUserPublished = async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
        await this.client.subscribe(user, mediaType);
        // toggle rerender while state of remoteUsers changed.
        this.setState({ remoteUsers: Array.from(this.client.remoteUsers) });
    }
    handleUserUnpublished = (user: IAgoraRTCRemoteUser) => {
        this.setState({ remoteUsers: Array.from(this.client.remoteUsers) });
    }
    handleUserJoined = (user: IAgoraRTCRemoteUser) => {
        this.setState({ remoteUsers: Array.from(this.client.remoteUsers) });
    }
    handleUserLeft = (user: IAgoraRTCRemoteUser) => {
        this.setState({ remoteUsers: Array.from(this.client.remoteUsers) });
    }
    leave = async () => {
        if (this.state.localAudioTrack) {
            this.state.localAudioTrack?.stop();
            this.state.localAudioTrack?.close();
        }
        if (this.state.localVideoTrack) {
            this.state.localVideoTrack.stop();
            this.state.localVideoTrack.close();
        }
        this.setState({ remoteUsers: [], joinState: false })
        await this.client?.leave();
    }
    createLocalTracks = async (audioConfig?: MicrophoneAudioTrackInitConfig, videoConfig?: CameraVideoTrackInitConfig): Promise<[IMicrophoneAudioTrack: any, ICameraVideoTrack: any]> => {
        const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks(audioConfig, videoConfig);
        this.setState({ localAudioTrack: microphoneTrack, localVideoTrack: cameraTrack })
        return [microphoneTrack, cameraTrack];
    }
    join = async (appid: string, channel: string, token?: string, uid?: string | number | null) => {
        if (!this.client) return;
        const [microphoneTrack, cameraTrack] = await this.createLocalTracks();
        await this.client.join(appid, channel, token || null);
        await this.client.publish([microphoneTrack, cameraTrack]);
        (window as any).client = this.client;
        (window as any).videoTrack = cameraTrack;
        this.setState({ joinState: true, remoteUsers: this.client.remoteUsers })
    }
    changeAudio = async () => {
        if (!this.state.joinState) return
        if (!this.state.localVideoTrack) return
        this.setState({openVideo: !this.state.openVideo})

        if (this.state.openVideo) {
            if (this.state.localVideoTrack) {
                await this.state.localVideoTrack!.setEnabled(true)
                this.client.publish(this.state.localVideoTrack)
            }
        } else {
            if (this.state.localVideoTrack) {
                await this.state.localVideoTrack.setEnabled(false)
                this.client.unpublish(this.state.localVideoTrack)
            }
        }
    }

    changeSound = () => {
        if (!this.state.joinState) return
        this.setState({openSound: !this.state.openSound})
        if (this.state.openSound) {
            if (this.state.localAudioTrack) {
                this.client.publish(this.state.localAudioTrack)
            }
        } else {
            this.client.unpublish(this.state.localAudioTrack)
        }
    }
    componentDidMount() {
        this.setState({ remoteUsers: this.client.remoteUsers })
    }
    componentWillMount() {
        console.log(this)
        this.join('a1f92f56e7f94c57a6c7bfdd867cd461', this.props.location.state.videoRoom, this.props.location.state.videoToken)
    }
    componentWillUnmount() {
        this.client.off('user-published', this.handleUserPublished);
        this.client.off('user-unpublished', this.handleUserUnpublished);
        this.client.off('user-joined', this.handleUserJoined);
        this.client.off('user-left', this.handleUserLeft);
        this.leave()
    }
    render() {
        console.log("2")
        const { Meta } = Card;
        return (
            <div>
                <div className='OpenVideo'>
                    <Layout>
                        <Content>
                            <div className='OpenVideo-content'>
                                <div className='OpenVideo-content-main'>
                                    <Card
                                        cover={
                                            <MediaPlayer videoTrack={this.state.localVideoTrack} audioTrack={undefined}></MediaPlayer>
                                        }
                                        actions={[
                                            <Tooltip className='margin-right' title="打开/关闭声音">
                                                <Button type="primary" disabled={!this.state.joinState} shape="circle" icon={this.state.openSound ? <AudioMutedOutlined /> : <AudioOutlined />} onClick={this.changeSound} />
                                            </Tooltip>,
                                            <Tooltip className='margin-right' title="打开/关闭视频">
                                                <Button type="primary" disabled={!this.state.joinState} shape="circle" icon={this.state.openVideo ? <VideoCameraAddOutlined /> : <VideoCameraOutlined />} onClick={this.changeAudio} />
                                            </Tooltip>
                                        ]}
                                    >
                                        <Meta
                                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                            title={this.state.joinState && this.state.localVideoTrack ? `我：(${this.client.uid})` : ''}
                                        />
                                    </Card>
                                    {this.state.remoteUsers.map((user,key) => (
                                        <Card
                                            key={key}
                                            cover={
                                                user.hasVideo ?  <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack}></MediaPlayer> : ''
                                            }
                                            actions={[
                                                <Tooltip className='margin-right' title="打开/关闭声音">
                                                    <Button type="primary" disabled shape="circle" icon={!user.hasAudio ? <AudioMutedOutlined /> : <AudioOutlined />} />
                                                </Tooltip>,
                                                <Tooltip className='margin-right' title="打开/关闭视频">
                                                    <Button type="primary" disabled shape="circle" icon={!user.hasVideo ? <VideoCameraAddOutlined /> : <VideoCameraOutlined />} />
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
                    </Layout>
                </div>
            </div>
        )
    }
}
