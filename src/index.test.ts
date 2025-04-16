import { ServerApp } from "./server/server";

describe("Test index", () => {
  test("should call ServerApp.run with values", async () => {
    const serverRunMock = jest.fn();

    ServerApp.run = serverRunMock;
    process.argv = ["node", "index.ts", "-b", "10"];
    await import("./index");

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 10,
      destination: "./outputs",
      limit: 10,
      name: "table",
      showTable: false,
    });
  });
});
