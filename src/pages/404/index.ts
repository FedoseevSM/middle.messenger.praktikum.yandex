import Block from '../../utils/Block';
import template from './404.template.hbs';

interface PageProps {
  title: string;
}

class Error404Page extends Block {
  constructor(tagName: string, props: PageProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Error404Page;