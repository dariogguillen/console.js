import fs from "fs";
import { yarg } from "./config/plugins/args.plugins";

const path = "outputs";
const { b: base, l: limit, s: show } = yarg;
let message = `
================================================
              Tabla del ${base}
================================================\n
`;
for (let i = 1; i < limit; i++) {
  message += `${base} * ${i} = ${base * i}\n`;
}

if (show) console.log(message);

fs.mkdirSync(path, { recursive: true });
fs.writeFileSync(`${path}/tabla-${base}-${limit}.txt`, message);

console.log("File created!");
