export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
  base: number;
  limit?: number;
}

export class CreateTable implements CreateTableUseCase {
  // DI - Dependency Injection
  constructor() {}

  execute({ base, limit = 10 }: CreateTableOptions) {
    let message = "";
    for (let i = 1; i <= limit; i++) {
      message += `${base} * ${i} = ${base * i}`;
      if (i < limit) message += "\n";
    }

    return message;
  }
}
