import Block from "../../utils/Block"
import template from "../../layouts/empty/empty.template.hbs"

const props = { 
  title: "Home page", 
  description: "500" 
}

class Error500Page extends Block {
  render() {
    return this.compile(template, props)
  }
}

export default Error500Page
