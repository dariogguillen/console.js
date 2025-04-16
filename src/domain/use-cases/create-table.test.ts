import { CreateTable } from "./create-table";

describe("CreateTableUseCase", () => {
  const createTable = new CreateTable();

  test("should create table with default values", () => {
    const table = createTable.execute({ base: 2 });
    const rows = table.split("\n");

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(rows.length).toBe(10);
  });

  test("should create table with custom values", () => {
    const options = { base: 3, limit: 20 };
    const table = createTable.execute(options);
    const rows = table.split("\n");

    expect(table).toContain("3 * 1 = 3");
    expect(table).toContain("3 * 10 = 30");
    expect(table).toContain("3 * 15 = 45");
    expect(table).toContain("3 * 20 = 60");
    expect(rows.length).toBe(options.limit);
  });
});
