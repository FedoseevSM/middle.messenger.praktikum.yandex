import { expect } from "chai";
import sinon from "sinon";
import { Link } from "./Link";
import Router from "../../utils/Router";

describe("Link", () => {
    it("render", () => {
        new Link({
            href: "/",
        });
    });

    it("element should return <a> tag", () => {
        const link = new Link({ href: "/" });
        const { element } = link;

        expect(element).to.be.instanceof(window.HTMLAnchorElement);
    });

    it("should go to passed route on click", () => {
        const router = new Router("#app");
        const link = new Link({ href: "/" });
        const spy = sinon.spy(router, "go");
        const element = link.element as HTMLAnchorElement;

        element.click();
        expect(spy.calledOnce).to.eq(true);
    });
});
