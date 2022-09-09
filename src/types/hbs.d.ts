declare module "*.hbs" {
    import type { TemplateDelegate } from "handlebars";

    declare const template: TemplateDelegate;

    export default template;
}
