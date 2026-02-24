import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Налаштування ігнорування та фільтрації
const IGNORE_DIRS = ['node_modules', '.git', 'dist', '.vscode'];
const IGNORE_FILES = ['package-lock.json', 'bundle_code.js', 'project_context.txt'];
const TARGET_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.html'];

const outputFilePath = path.join(__dirname, 'project_context.txt');
let outputContent = '';

// Генерація дерева файлів
function scanDirectory(dirPath, prefix = '') {
    const items = fs.readdirSync(dirPath);
    items.forEach((item, index) => {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        const isLast = index === items.length - 1;

        if (stat.isDirectory()) {
            if (!IGNORE_DIRS.includes(item)) {
                outputContent += `${prefix}${isLast ? '└── ' : '├── '}${item}/\n`;
                scanDirectory(fullPath, prefix + (isLast ? '    ' : '│   '));
            }
        } else {
            if (!IGNORE_FILES.includes(item)) {
                outputContent += `${prefix}${isLast ? '└── ' : '├── '}${item}\n`;
            }
        }
    });
}

// Збір вмісту файлів
function collectFileContents(dirPath) {
    const items = fs.readdirSync(dirPath);
    items.forEach(item => {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && !IGNORE_DIRS.includes(item)) {
            collectFileContents(fullPath);
        } else if (stat.isFile() && !IGNORE_FILES.includes(item)) {
            const ext = path.extname(item);
            // Беремо лише потрібні розширення або конфіги типу .env, .gitignore
            if (TARGET_EXTENSIONS.includes(ext) || item.startsWith('.')) {
                outputContent += `\n\n=================================================================\n`;
                outputContent += `Файл: ${path.relative(__dirname, fullPath)}\n`;
                outputContent += `=================================================================\n\n`;
                outputContent += fs.readFileSync(fullPath, 'utf8');
            }
        }
    });
}

console.log('Збираємо контекст проекту...');
outputContent += '=== ДЕРЕВО ПРОЕКТУ ===\n\n';
scanDirectory(__dirname);
outputContent += '\n\n=== ВМІСТ ФАЙЛІВ ===\n';
collectFileContents(__dirname);

fs.writeFileSync(outputFilePath, outputContent);
console.log(`Готово! Контекст збережено у файл: ${outputFilePath}`);