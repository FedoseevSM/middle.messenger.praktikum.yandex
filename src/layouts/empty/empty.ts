import Block from "../../utils/Block"
import template from "./empty.template.hbs"

interface PageProps {
  title: string
  description: string
}

class EmptyLayout extends Block {
  constructor(tagName: string, props: PageProps) {
    super("div", props)
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default EmptyLayout
