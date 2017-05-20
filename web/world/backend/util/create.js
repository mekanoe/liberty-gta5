require('dotenv').config({silent: true})
const log = new (require('../logger'))('util/create')
const commander = require('commander')
const inquirer = require('inquirer')
const World = require('../World')

const W = new World(null, null, {})
log.debug('test', W.M)

commander
  .option('-u, --username <u>', 'Username')
  .option('-p, --password <p>', 'Password (unsafe method)')
  .option('-e, --email <p>', 'Email')
  .option('--debug', 'Debug') // handled elsewhere

commander
  .command('user')
  .description('Creates a user')
  .action((cmd) => {
    try {
      userPrompt()
    } catch (e) {
      log.error('error during user prompt', e)
    }
  })

commander
  .command('character')
  .description('Creates a character')
  .action((cmd) => {
    try {
      characterPrompt()
    } catch (e) {
      log.error('error during character prompt', e)
    }
  })

commander.parse(process.argv)

async function userPrompt () {
  let answers = await inquirer.prompt([
    { type: 'input', name: 'username', message: 'Username?', default: commander.username },
    { type: 'password', name: 'password', message: 'Password?', default: commander.password },
    { type: 'email', name: 'email', message: 'Email?', default: commander.email },
    { type: 'list', name: 'perms', message: 'What\'s this user\'s permissions?', default: 'normal', choices: ['normal', 'gm', 'superuser'] }
  ])

  log.debug('omg', answers)

  const User = W.M.User
  let user
  try {
    user = await User.build({
      id: User.getNewId(),
      username: answers.username,
      email: answers.email,
      permissions: (answers.perms === 'normal') ? [] : [answers.perms]
    })

    await user.createSecret(answers.password)
    await user.save()
  } catch (e) {
    log.fatal('error during character build/create', e, -1)
  }


  console.log('ok!')
  process.exit()
}

async function characterPrompt () {
  let answers = await inquirer.prompt([
    { type: 'input', name: 'username', message: 'What account does this character belong to?', default: commander.username },
    { type: 'input', name: 'name', message: "What's the name?" },
    { type: 'list', name: 'gender', message: 'Gender (trigger warning)', default: 'female', choices: ['male', 'female'] }
  ])

  const User = W.M.User
  const Character = W.M.Character
}
