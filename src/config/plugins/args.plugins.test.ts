const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const { yarg } = await import("./args.plugins");
  return yarg;
};

describe("Test args.plugins", () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test("should return default values", async () => {
    const argv = await runCommand(["-b", "5"]);
    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "table",
        d: "./outputs",
      }),
    );
  });

  test("should return configuration with custom values", async () => {
    const argv = await runCommand([
      "-b",
      "5",
      "-l",
      "1",
      "-s",
      "true",
      "-n",
      "custom",
      "-d",
      "custom",
    ]);
    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 1,
        s: true,
        n: "custom",
        d: "custom",
      }),
    );
  });
});
