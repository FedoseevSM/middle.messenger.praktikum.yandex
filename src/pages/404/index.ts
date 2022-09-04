import Block from "../../utils/Block"
import template from "../../layouts/empty/empty.template.hbs"

const props = { 
  title: "Страница не найдена", 
  description: "404" 
}

class Error404Page extends Block {
  render() {
    return this.compile(template, props)
  }
}

export default Error404Page