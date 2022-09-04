import Block from "../../utils/Block"
import template from "./LoginMain.template.hbs"

class LoginMain extends Block {
  render() {
    return this.compile(template, this.props)
  }
}

export default LoginMain