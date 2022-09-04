import Block from "../../utils/Block"
import template from "./RegisterHeader.template.hbs"

class RegisterHeader extends Block {
  render() {
    return this.compile(template, this.props)
  }
}

export default RegisterHeader