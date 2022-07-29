import type { NetlessApp } from "@netless/window-manager";

import React from "react";
import { createRoot } from "react-dom/client";
import Call from "./Call";
import 'antd/dist/antd.css';
import styles from "./style.css?inline";

const TicTacToe: NetlessApp = {
  config: {
    minwidth: 0.3,
    minheight: 0.3,
    width: 0.5,
    height: 0.8,
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
    root.render(<Call />);

    context.emitter.on("destroy", () => {
      root.unmount();
    });
  },
};

export default TicTacToe;
