import fs from 'fs';
import translate from "@iamtraction/google-translate";
import { setTimeout } from 'timers/promises';

(async function() {
  const files = fs.readdirSync('./questions/translated');

  const result = [];
  for (let file of files) {
    const blob = fs.readFileSync(`./questions/translated/${file}`);
    const questions = JSON.parse(blob.toString());
    
    const [type, idx] = file.match(/^(.+?)-([\d]+)\.json$/).slice(1);
    result.push(...questions.map( q => ({...q, options: q.options.en.map((o,i) => ({en: o, ru: q.options.ru[i]})), type, idx}) ));
  }

  console.log(result.length);
  fs.writeFileSync('questions.json', JSON.stringify(result));
})();