import { register, apps } from "@netless/fastboard";
import App from "../src/views/open-video/index";
import App2 from "../src/views/upload-image/index";

export const registering = register({ kind: App.kind, src: App });
export const registering1 = register({ kind: App2.kind, src: App2 });
apps.push(
  {
    kind: App2.kind,
    label: App2.kind.replace(/([a-z])([A-Z])/g, "$1 $2"),
    icon: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F49%2F79%2F5816305e45db7_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663681697&t=08a33073a7c897c9cb5e7fcad500b7d8",
    onClick: (fastboard) => {
      fastboard.manager.addApp({
        kind: App2.kind,
        options: { title: "开始上传图片" },
      });
    },
  }
)
