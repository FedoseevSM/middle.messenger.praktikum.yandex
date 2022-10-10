import Router from "./Router";
import { expect } from "chai";
import Block from "./Block";
import template from "../components/Button/Button.template.hbs"

describe("Router", () => {

    class BlockMock extends Block {
        render(): any {
            return this.compile(template, {});
        }
    }

    it("use() should return Router instance", () => {
        const router = new Router("#app");
        const result = router.use("/", BlockMock);

        expect(result).to.eq(router);
    });
});
