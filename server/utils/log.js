import { Console } from 'console';
import fs from 'fs'

const output = fs.createWriteStream('./logs/stdout.log');
const errorOutput = fs.createWriteStream('./logs/stderr.log');

const logger = new Console({ stdout: output, stderr: errorOutput });

export default logger