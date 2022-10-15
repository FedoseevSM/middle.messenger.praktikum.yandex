import type {
    SinonFakeXMLHttpRequest,
    SinonFakeXMLHttpRequestStatic,
} from "sinon";
import sinon from "sinon";
import { expect } from "chai";
import HTTPTransport from "./HTTPTransport";

describe("HTTPTransport", () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let instance: HTTPTransport;
    const requests: SinonFakeXMLHttpRequest[] = [];

    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();

        // @ts-ignore
        global.XMLHttpRequest = xhr;

        xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
            requests.push(request);
        };

        instance = new HTTPTransport("/auth");
    });

    afterEach(() => {
        requests.length = 0;
    });

    it(".get() should send GET request", () => {
        instance.get("/user");

        const [request] = requests;

        expect(request.method).to.eq("Get");
    });
});
