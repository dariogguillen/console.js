import { CreateTable } from "../domain/use-cases/create-table";
import { SaveFile } from "../domain/use-cases/save-file";
import { RunOptions, ServerApp } from "./server";

describe("Test Server", () => {
  const options: RunOptions = {
    base: 2,
    limit: 10,
    showTable: true,
    name: "test",
    destination: "outputs",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create Server instance", () => {
    const server = new ServerApp();

    expect(server).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  test("should run ServerApp with options", () => {
    const logSpy = jest.spyOn(console, "log");
    const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");

    ServerApp.run(options);

    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith("RUNNING....");
    expect(logSpy).toHaveBeenCalledWith("File created");

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      destination: options.destination,
      fileName: options.name,
    });
  });

  test("should run with custom values mocked", () => {
    const logMock = jest.fn();
    const createMock = jest.fn().mockReturnValue("1 * 1 = 1");
    const saveFileMock = jest.fn().mockReturnValue(true);

    console.log = logMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith("RUNNING....");
    expect(logMock).toHaveBeenCalledWith("File created");
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileMock).toHaveBeenCalledWith({
      destination: options.destination,
      fileName: options.name,
      fileContent: "1 * 1 = 1",
    });
  });
});
