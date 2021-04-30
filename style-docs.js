const fs = require('fs');

fs.readFile('dist/assets/styles/main.min.css', 'utf8', (error, data) => {
  const docItems = data.match(/\/\*\~(.+)\~\*\/(.+|\n).+\{/g);
  let docString = '';
  docItems.forEach((el) => {
    docString += `${el}\n\n`;
  });
  putInReadme(docString);
});


function putInReadme(styleData) {
  fs.readFile('README.md', 'utf8', (error, data) => {
    const docItems = data.match(/<!-- styles -->\n((.*?))\n<!-- styles end -->/gis);
    const styleDocsBorderStart = '<!-- styles -->\n';
    const styleDocsBorderEnd = '<!-- styles end -->';
    let matchedStylesInReadme = data.replace(/<!-- styles -->\n(.*?)\n<!-- styles end -->/gis, styleDocsBorderStart + styleData + styleDocsBorderEnd);
    fs.writeFile('README.md', matchedStylesInReadme , (err) => {
        if (err) return console.log(err);
    });
  });

  // <!-- styles -->
  // <!-- styles end -->
}
