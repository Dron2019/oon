const fs = require('fs');

function putInReadme(styleData) {
  fs.readFile('README.md', 'utf8', (error, data) => {
    const styleDocsBorderStart = '<!-- styles -->\n';
    const styleDocsBorderEnd = '<!-- styles end -->';
    const matchedStylesInReadme = data.replace(/<!-- styles -->\n(.*?)\n<!-- styles end -->/gis, styleDocsBorderStart + styleData + styleDocsBorderEnd);
    fs.writeFile('README.md', matchedStylesInReadme, (err) => {
      if (err) return console.log(err);
      return -1;
    });
  });
}

fs.readFile('dist/assets/styles/main.min.css', 'utf8', (error, data) => {
  const docItems = data.match(/\/\*\~(.+)\~\*\/(.+|\n).+\{/g);
  let docString = '';
  docItems.forEach((el) => {
    const formattedValue = el.replace(/\/|\*|\/|~|\{|\n/g, '');
    docString += `- ${formattedValue} \n`;
  });
  putInReadme(docString);
  console.log('\x1b[47m \x1b[36m%s\x1b[0m', 'Документация сформирована');
});
