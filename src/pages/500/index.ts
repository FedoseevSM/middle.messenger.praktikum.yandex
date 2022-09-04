import Block from "../../utils/Block"
// import template from "./500.template.hbs"
import template from "../../layouts/empty/empty.template.hbs";

interface PageProps {
  title: string,
  description: string;
}

class Error500Page extends Block {
  constructor(tagName: string, props: PageProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default Error500Page
