import { App } from 'vue'
import { Button, Input, Form, Comment, Menu, Avatar, Textarea, List } from 'ant-design-vue'

const antd = {
  install(app: App) {
    app.component(Button.name, Button)
    app.component(Input.name, Input)
    app.component(Form.name, Form)
    app.component(Comment.name, Comment)
    app.component(Menu.name, Menu)
    app.component(Avatar.name, Avatar)
    app.component(Textarea.name, Textarea)
    app.component(List.name, List)
    // 其他组件...
  }
}

export default antd
