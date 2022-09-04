import Block from "../../utils/Block"
import template from "./LoginFooter.template.hbs"

class LoginFooter extends Block {
  render() {
    return this.compile(template, this.props)
  }
}

export default LoginFooter