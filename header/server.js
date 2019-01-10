const path = require('path')
const fs = require('fs')
const express = require('express')
const React = require('react')
const App = require('./transpiled/App.js').default
const { renderToString } = require('react-dom/server')

const server = express()

server.get('/', (request, response) => {
  const htmlPath = path.resolve(__dirname, 'build', 'index.html')
  fs.readFile(htmlPath, 'utf8', (err, html) => {
    const rootElem = '<div id="root">'
    const renderedApp = renderToString(React.createElement(App, null))
    response.send(html.replace(rootElem, rootElem + renderedApp))
  })
})

server.use(express.static('build'))

const port = process.env.port || 8080
server.listen(port, () => {
  console.log('App listening on port ' + port);
})