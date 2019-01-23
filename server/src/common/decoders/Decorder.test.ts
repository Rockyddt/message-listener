import Decoder from "./Decoder";

describe("Decoder", () => {
    let decoder;

    beforeEach(() => {
        decoder = new Decoder();
    });

    describe("decode", () => {
        test("should decode correctly", () => {
            expect(decoder.decode("test")).toEqual({body: "test"});
        });
    });

});
