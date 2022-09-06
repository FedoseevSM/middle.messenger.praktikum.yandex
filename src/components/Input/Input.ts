import Block from "../../utils/Block";
import template from "./Input.template.hbs";

export interface InputProps {
    type?: string;
    name: string;
    className?: string;
    onFocus?: (e: FocusEvent) => void;
    onBlur?: (e: FocusEvent) => void;
    onInput?: () => void;
}

export class Input extends Block {
    constructor({ onFocus, onBlur, onInput, ...props }: InputProps) {
        super({
            ...props,
            events: {
                focus: onFocus,
                blur: onBlur,
                input: onInput,
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

