import Block from "../../utils/Block";
import template from "./messenger.template.hbs";

const props = {
    title: "Сообщения",
    description: "404",
};

class MessengerPage extends Block {
    render() {
        return this.compile(template, props);
    }
}

export default MessengerPage;
