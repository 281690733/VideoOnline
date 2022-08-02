import { register, apps } from "@netless/fastboard";
import App from "../src/views/open-video/index";
import App2 from "../src/views/upload-image/index";

export const registering = register({ kind: App.kind, src: App });
export const registering1 = register({ kind: App2.kind, src: App2 });
apps.clear();
apps.push({
  kind: App.kind,
  label: App.kind.replace(/([a-z])([A-Z])/g, "$1 $2"),
  icon: "https://netless-docs.oss-cn-hangzhou.aliyuncs.com/Leo/WeChatc00e0aa34a57994719c6887727affc04.png",
  onClick: (fastboard) => {
    fastboard.manager.addApp({
      kind: App.kind,
      src:'',
      options: { title: "开启会议" },
    });
  },
});
apps.push(
  {
    kind: App2.kind,
    label: App2.kind.replace(/([a-z])([A-Z])/g, "$1 $2"),
    icon: "https://netless-docs.oss-cn-hangzhou.aliyuncs.com/Leo/WeChatc00e0aa34a57994719c6887727affc04.png",
    onClick: (fastboard) => {
      fastboard.manager.addApp({
        kind: App2.kind,
        options: { title: "开始上传图片" },
      });
    },
  }
)
