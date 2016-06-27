import { spawnSync } from 'child_process'

const { stdout } = spawnSync('git', ['rev-parse', 'HEAD'])
const hash = stdout.toString('utf8').replace(/^\s+|\s+$/g, '')

export default function getGitHash () {
  return hash
}
