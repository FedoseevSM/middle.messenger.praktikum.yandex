import Block from "../../utils/Block"
import template from "../../layouts/empty/empty.template.hbs"

const props = { 
  title: "Сообщения", 
  description: "404" 
}

class MessagesPage extends Block {
  render() {
    return this.compile(template, props)
  }
}

export default MessagesPage
