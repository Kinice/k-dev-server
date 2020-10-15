#!/usr/bin/env node
const process = require('process')
const pfs = require('fs/promises')
const fs = require('fs')
const path = require('path')
const http = require('http')
const pkg = fs.readFileSync(path.join(__dirname, 'package.json'))
const version = JSON.parse(pkg).version

let rootPath = __dirname
let configPath = path.join(rootPath, 'kds-config.json')
let proxyPath = ''
let fileName = 'index.html'

// check argv
function checkArgv() {
  const breakArgvList = new Set(['--help', '-h', '--version', '-v'])
  const noBreakArgvList = new Set(['--file', '--config', '--proxy'])
  const argvList = process.argv.slice(2)
  if (argvList.length <= 0) { // if no argv, go default
    main()
  } else {
    // if there has a break operation, break all
    for (let i of breakArgvList) {
      if (argvList.indexOf(i) >= 0) {
        switch(i) {
          case '--help':
          case '-h':
            consoleHelp()
            break
          case '--version':
          case '-v':
            console.log(`k-dev-server v${version}`)
            break
          default:
            consoleHelp()
        }
        return
      }
    }
    // or have some params to change
    argvList.forEach((i, index) => {
      if (noBreakArgvList.has(i)) {
        switch(i) {
          case '--config':
            configPath = argvList[index + 1]
            break
          case '--file':
            fileName = argvList[index + 1]
            break
          case '--proxy':
            proxyPath = argvList[index + 1]
            break
          default:
            console.log('?')
        }
      }
    })
    // go main task
    main()
  }
}

function consoleHelp() {
  console.log('help!')
}

// main function
async function main() {
  try {
    const dir = await pfs.readdir(process.cwd())
    console.log(dir.indexOf(configPath))
  } catch (err) {
    console.error(err)
  }
}

checkArgv()
