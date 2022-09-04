import Block from "../../utils/Block"
import template from "./LoginHeader.template.hbs"

class LoginHeader extends Block {
  render() {
    return this.compile(template, this.props)
  }
}

export default LoginHeader