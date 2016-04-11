# linker-webpack-plugin
> Inject content inbetween HTML comment tags.

`
npm i linker-webpack-plugin --save-dev
`

## Usage

### API

- **entry** `String` File to read tags from relative to the node app path
- **skip** `Boolean` if true - new content will be appended to existing content
- **output** `String` File to create/replace relative to the node app path
- **data** `Object` key-value pair of tag identifiers and the content replacement
- **hash** `String` Alias that will be replaced with the webpack entry hash

### Example
```javascript
// webpack config file

import LinkerPlugin from 'linker-webpack-plugin';

...
plugins: [
	new LinkerPlugin({
      entry: './src/views/index.html', // any extension (ejs, markdown, text etc)
      hash: '[hash]',
      output: './build/views/index.html',
      data: {
        css: '<link type="text/css" rel="stylesheet" href="//localhost:3000/styles-[hash].css">',
        scripts: '<script src="//localhost:3000/bundle-[hash].js"></script>',
        analytics: `
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
          
          ga('create', 'UA-XXXXXX-X', 'auto');
          ga('send', 'pageview');
        </script>`
      }
    })
],
	
....
```

`./src/views/index.html`:
```html
<!DOCTYPE html>
<html>
<head>
  <!-- #css -->
  <!-- #end -->
</head>
<body>
  <!-- #scripts -->
  <!-- #end -->
  
  <!-- #analytics -->
  <!-- #end -->
</body>
</html>
```

#### Output

`./build/views/index.html`:
```html
<!DOCTYPE html>
<html>
<head>
  <link type="text/css" rel="stylesheet" href="//localhost:3000/styles-t345b3Bdh4n2j4jb4.css">
</head>
<body>
  <script src="//localhost:3000/bundle-t345b3Bdh4n2j4jb4.js"></script>
  
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
          
    ga('create', 'UA-XXXXXX-X', 'auto');
    ga('send', 'pageview');
  </script>
</body>
</html>
```
