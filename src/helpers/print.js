import chalk from 'chalk'

class OutputType {
    static SUCCESS = 'SUCCESS'
    static WARNING = 'WARNING'
    static ERROR = 'ERROR'
    static INFORMATION = 'INFORMATION'
}

function print(message, outputType) {
    switch (outputType) {
        case OutputType.SUCCESS:
            console.log(chalk.green(message))
            break
        case OutputType.WARNING:
            console.log(chalk.yellow(message))
            break
        case OutputType.ERROR:
            console.log(chalk.red(message))
            break
        case OutputType.INFORMATION:
            console.log(chalk.white(message))
            break
    }
}

export { print, OutputType }
