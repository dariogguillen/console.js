import fs from "fs";

const base = 5;
const path = 'outputs'
let message = `
================================================
            Tabla del ${base}
================================================\n
`;
for (let i = 1; i < 10; i++) {
  message += `${base} * ${i} = ${base * i}\n`;
}

console.log(message);

fs.mkdirSync(path, {recursive: true})
fs.writeFileSync(`${path}/tabla-${base}.txt`, message)
