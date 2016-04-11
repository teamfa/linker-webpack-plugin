import {join} from 'path';
import {readFile, writeFileSync} from 'fs';

const REGEX = /(\n?)([ \t]*)(<!--\s*#(\w+(?:-\w+)*)\s*-->)\n?([\s\S]*?)\n?(<!--\s*#end\s*-->)\n?/ig;

function regexMatchAll(string, regexp) {
  const matches = [];
  string.replace(regexp, function () {
    const arr = [].slice.call(arguments);
    matches.push(arr);
  });
  return matches;
}

export default class Linker {
	/**
   *
   * @param config
   */
  constructor(config) {
    this.skip = config.skip || false;
    this.entry = config.entry;
    this.output = config.output;
    this.data = config.data;
    this.hash = config.hash;
    this.hashValue = config.hashValue;
  }

	/**
   *
   * @param compiler
   */
  apply(compiler) {
    const folder = compiler.options.context;
    const entry = join(folder, this.entry);
    const output = join(folder, this.output);

    compiler.plugin('compilation', () => {

      readFile(entry, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          throw err;
        }

        if (!this.skip) {
          const matches = regexMatchAll(data, REGEX);
          matches.forEach(match => {
            data = data.replace(match[0], `\n${(this.data[match[4]] || '')}\n`);
          });
        }
        compiler.plugin('done', (stats) => {
          if (this.hash) {
            const reg = new RegExp('\\' + this.hash, 'g');
            const changeWith = typeof this.hashValue === 'string' ? this.hashValue : stats.hash;
            data = data.replace(reg, changeWith);
          }
          writeFileSync(output, data);
        });
      });

    });
  }
}
