const process = require('process')
const fs = require('fs/promises')
const path = require('path')
const argvList = process.argv.slice(2)
console.log(argvList)
// find
;(async function() {
  try {
    const dir = await fs.readdir(process.cwd())
    console.log(dir)
  } catch (err) {
    console.error(err)
  }
})()