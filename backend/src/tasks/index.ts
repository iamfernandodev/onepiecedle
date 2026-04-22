import path from 'path';
import fs from 'fs';

export default async function runTasks() {
    const tasks = fs.readdirSync(path.join(__dirname))
        .filter(file => file != 'index.ts');

    for (const task of tasks) {
        const taskPath = path.join(__dirname, task);
        const module = await import(taskPath);

        module.default();
    }
}