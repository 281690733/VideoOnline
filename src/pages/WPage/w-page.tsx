import "./style.css";
import { createFastboard, mount, Theme } from '@netless/fastboard';
import React, { Component } from 'react'
import { get_uid } from '../../../playground/query';
import { withRouter } from "react-router-dom";
import { Col, Row } from 'antd';
import Video from "../../components/Video";
import axios from "axios";
import { registering1 } from "../../../playground/register";

type Props = {}

type State = {}

class WPage extends Component<Props, State> {
    state = {
        uuid: '',
        roomToken: ''
    }
    async componentWillMount() {
        console.log(this)

    }
    componentWillUnmount() {
        window.fastboard.destroy()
    }
    setup = () => {
        const $app = document.querySelector("#app2")!;

        const $whiteboard = $app.appendChild(document.createElement("div"));
        $whiteboard.id = "whiteboard";

        const $controls = $app.appendChild(document.createElement("div"));
        $controls.id = "controls";

        const $resetBtn = $controls.appendChild(document.createElement("button"));
        $resetBtn.id = "reset";
        $resetBtn.title = "Remove all apps & Clear whiteboard";
        $resetBtn.textContent = "Reset";
        let onResetCallback: (() => void) | undefined;
        $resetBtn.onclick = () => onResetCallback && onResetCallback();

        return {
            $whiteboard,
            onReset: (fn: () => void) => (onResetCallback = fn)
        };
    }
    expose = (record: Record<string, any>) => {
        Object.assign(window, record);
        console.debug("debug variables:", Object.keys(record).join());
    }
    async componentDidMount() {
        await registering1
        const fastboard = await createFastboard({
            sdkConfig: {
                appIdentifier: import.meta.env.VITE_APPID,
                region: "cn-hz",
            },
            joinRoom: {
                uid: get_uid(),
                uuid: this.props.location.state.roomUuid,
                roomToken: this.props.location.state.roomToken,
            },
        });
        const $ui = this.setup();

        const fastboardUI = mount(fastboard, $ui.$whiteboard);
        $ui.onReset(() => {
            fastboard.cleanCurrentScene();
            const { manager } = fastboard;
            Object.keys(manager.apps || {}).forEach(manager.closeApp.bind(manager));
        });
        this.expose({ fastboard, room: fastboard.room, manager: fastboard.manager, ui: fastboardUI });
    }
    render() {
        return (
            <Row>
                <Col span={18}>
                    <div id='app2'>

                    </div>
                </Col>
                <Col span={6}>
                    <div id="video1">
                        <Video {...this.props} userId='1111'></Video>
                    </div>
                </Col>
            </Row>

        )
    }
}
export default withRouter(WPage)