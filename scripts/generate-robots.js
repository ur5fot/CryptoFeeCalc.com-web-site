const fs = require('fs')
const path = require('path')

const branch =
  process.env.CF_PAGES_BRANCH ||
  process.env.GITHUB_REF_NAME ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  ''

const isProduction = branch === 'main' || branch === 'master'

const content = `User-agent: *
${isProduction ? 'Allow' : 'Disallow'}: /

Sitemap: https://cryptofeecalc.com/sitemap.xml
`

const outputPath = path.join(__dirname, '..', 'public', 'robots.txt')
fs.writeFileSync(outputPath, content, 'utf8')

console.log(
  `[robots] ${isProduction ? 'Allow' : 'Disallow'} for branch: ${branch || 'local'}`
)
