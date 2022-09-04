import Block from "../../utils/Block"
import template from "../../layouts/empty/empty.template.hbs"

const props = { 
  title: "Профиль", 
  description: "404" 
}

class AccountPage extends Block {
  render() {
    return this.compile(template, props)
  }
}

export default AccountPage
