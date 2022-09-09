import Block from "../../utils/Block";
import type { ValidationType } from "../../utils/Validator";
import Validator from "../../utils/Validator";
import type { InputProps } from "../Input/Input";
import { Input } from "../Input/Input";
import { Errors } from "../Errors/Errors";
import template from "./LabelInput.template.hbs";

export interface LabelInputProps extends InputProps {
    labelClassName: string;
    labelText: string;
    validationType: ValidationType;
    message: string;
}

export class LabelInput extends Block {
    constructor({
        labelClassName,
        labelText,
        validationType,
        message,
        ...inputProps
    }: LabelInputProps) {
        const errors = new Errors();
        const input = new Input({
            ...inputProps,
            onBlur: (event) => {
                const { value } = event.target as HTMLInputElement;
                const isValid = Validator.validate(
                    validationType,
                    value
                );

                errors.setProps({ text: message, isValid });
            },
        });

        super({
            input,
            labelClassName,
            labelText,
            errors,
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
