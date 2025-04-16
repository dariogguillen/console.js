import fs from "fs";
import { SaveFile } from "./save-file";

describe("SaveFileUseCase", () => {
  const saveFile = new SaveFile();

  afterEach(() => {
    if (fs.existsSync("outputs")) fs.rmSync("outputs", { recursive: true });
  });

  test("should save file wiht default values", () => {
    const options = { fileContent: "test content" };
    const result = saveFile.execute(options);
    const filePath = "outputs/tabla.txt";
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    expect(result).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  test("should save file wiht custom values", () => {
    const options = {
      fileContent: "test custom content",
      destination: "custom-outputs/file-desitnation",
      fileName: "custom-table-name",
    };
    const result = saveFile.execute(options);
    const checkFile = fs.existsSync(options.destination);
    const fileContent = fs.readFileSync(
      `${options.destination}/${options.fileName}.txt`,
      { encoding: "utf-8" },
    );

    expect(result).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
    fs.rmSync("custom-outputs", { recursive: true });
  });

  test("should return false if directory could not be created", () => {
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("Failed to create directory");
    });
    const options = { fileContent: "test content" };
    const result = saveFile.execute(options);

    expect(result).toBeFalsy();

    mkdirSpy.mockRestore();
  });

  test("should return false if directory could not be created", () => {
    const fileSpy = jest.spyOn(fs, "writeFileSync").mockImplementation(() => {
      throw new Error("Failed to create file");
    });
    const options = { fileContent: "test content" };
    const result = saveFile.execute(options);

    expect(result).toBeFalsy();

    fileSpy.mockRestore();
  });
});
