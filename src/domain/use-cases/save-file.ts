import fs from "fs";

export interface SaveFileUseCase {
  execute: (options: SaveFileOptions) => boolean;
}

export interface SaveFileOptions {
  fileContent: string;
  destination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  /** repository ??? */
  constructor() {}

  execute({
    fileContent,
    destination = "outputs",
    fileName = "tabla",
  }: SaveFileOptions): boolean {
    try {
      fs.mkdirSync(destination, { recursive: true });
      fs.writeFileSync(`${destination}/${fileName}.txt`, fileContent);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
