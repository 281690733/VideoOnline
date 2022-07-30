import type { NetlessApp } from "@netless/window-manager";

import React from "react";
import { createRoot } from "react-dom/client";
import OpenVideo from "./views/open-video/OpenVideo";
import 'antd/dist/antd.css';
import styles from "./style.css?inline";

const TicTacToe: NetlessApp = {
  config: {
    minwidth: 0.3,
    minheight: 0.3,
    width: 0.3,
    height: 0.7,
    singleton:true
  },
  kind: "开启会议",
  setup(context) {
    const box = context.getBox();
    // @todo
    box._fixRatio$.setValue(true);

    box.mountStyles(styles);
    const $content = document.createElement("div");
    $content.className = "tic-tac-toe";
    box.mountContent($content);

    const root = createRoot($content);
    root.render(<OpenVideo />);

    context.emitter.on("destroy", () => {
      root.unmount();
    });
  },
};

export default TicTacToe;
