export const logToConsole = console.log;
export const stdout = process.stdout;
export const stderr = process.stderr;
export const parseJSON = JSON.parse as (text: string, reviver?: ((this: any, key: string, value: any) => any) | undefined) => unknown;
export { forkProgram } from './forkProgram';
export { executeProgram } from './executeProgram';
