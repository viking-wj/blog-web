/**
 * Element Plus 组件封装
 */
import type { App } from "vue";
import {
  ElLink,
  ElButton,
  ElForm,
  ElFormItem,
  ElTable,
  ElTableColumn,
  ElTabs,
  ElTabPane,
  ElTree,
  ElDialog,
  ElCascader,
  ElCheckbox,
  ElInputNumber,
  ElDatePicker,
  ElScrollbar,
  ElInput,
} from "element-plus";
import "element-plus/dist/index.css";

const components = {
  ElLink,
  ElButton,
  ElForm,
  ElFormItem,
  ElTable,
  ElTableColumn,
  ElTabs,
  ElTabPane,
  ElTree,
  ElDialog,
  ElCascader,
  ElCheckbox,
  ElDatePicker,
  ElInputNumber,
  ElScrollbar,
  ElInput,
};

/**
 * 全局注册指定 Element Plus 组件的 vue 插件
 */
export default function (app: App) {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
}
