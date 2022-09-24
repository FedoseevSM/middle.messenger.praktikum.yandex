export enum ValidationType {
    Email = "email",
    Name = "name",
    Login = "login",
    Password = "password",
    Phone = "phone",
    Any = "any"
}

class Validator {
    email(value: string): boolean {
        const result =
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
                value
            );

        return result;
    }

    name(value: string): boolean {
        const result = /[A-ZА-Я][a-zа-я]*/.test(value);

        return result;
    }

    login(value: string): boolean {
        const result = /(?!^\d+$)[A-Za-z0-9_]{3,20}/.test(value);

        return result;
    }

    password(value: string): boolean {
        const result =
            /[A-Za-z0-9]{8,40}/.test(value) &&
            /[A-Z]/.test(value) &&
            /[0-9]/.test(value);

        return result;
    }

    phone(value: string): boolean {
        const result = /\+?[0-9]{10,15}/.test(value);

        return result;
    }

    any(value: string): boolean {
        return typeof(value) == "string"
    }

    validate(type: ValidationType, value: string): boolean {
        switch (type) {
            case ValidationType.Email:
                return this.email(value);
            case ValidationType.Login:
                return this.login(value);
            case ValidationType.Name:
                return this.name(value);
            case ValidationType.Password:
                return this.password(value);
            case ValidationType.Phone:
                return this.phone(value);
            case ValidationType.Any:
                return this.any(value);
            default: {
                const exhaustiveCheck: never = type;
                throw new Error(
                    `Значение не должно быть пустым: ${exhaustiveCheck}`
                );
            }
        }
    }
}

export default new Validator();
