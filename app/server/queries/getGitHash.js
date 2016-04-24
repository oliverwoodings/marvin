import { spawnSync } from 'child_process'

export default function getGitHash () {
  const { stdout } = spawnSync('git', ['rev-parse', 'HEAD'])

  return stdout.toString('utf8').replace(/^\s+|\s+$/g, '')
}
