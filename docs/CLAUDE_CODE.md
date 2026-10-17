# Миграция проекта на Claude Code

Краткий чеклист переноса работы с Cursor на [Claude Code](https://code.claude.com/docs).

## 1. Открыть проект

```bash
cd /Users/anton/Desktop/Transfer/site
npm install
claude   # или: cd в папку и запустить Claude Code из IDE/терминала
```

Убедитесь, что сессия привязана к **корню git-репозитория** (там лежат `CLAUDE.md` и `AGENTS.md`).

## 2. Проверить память агента

В сессии Claude Code:

1. `/context` — в списке Memory должны быть `CLAUDE.md`, `AGENTS.md`, правила из `.claude/rules/`.
2. При необходимости один раз: `/init` (улучшит память по коду; не удаляет `AGENTS.md`).

Интерактивный `/init`: `CLAUDE_CODE_NEW_INIT=1 claude`, затем `/init`.

## 3. Что уже подготовлено в репозитории

| Файл | Назначение |
|------|------------|
| `AGENTS.md` | Общие инструкции (Cursor, Codex, другие агенты) |
| `CLAUDE.md` | Импорт `@AGENTS.md` + заметки только для Claude Code |
| `.claude/rules/*.md` | Правила по Astro/React (подгружаются при работе с путями) |
| `CLAUDE.local.md` | Личные настройки (создайте сами, в `.gitignore`) |

## 4. Перенос контекста из старых чатов Cursor

Cursor-чаты в репозиторий не переносятся. Имеет смысл:

- Открыть в Cursor чат **«Создание минималистичного сайта-портфолио»** / **«Код-ревью сайта звукорежиссёра»** и выписать только нерешённые задачи.
- Либо опираться на `IMPLEMENTATION_STATUS.md` и `CODE_REVIEW_SUMMARY.md`.
- В Claude Code попросить: «прочитай IMPLEMENTATION_STATUS и предложи следующий шаг».

Auto memory Claude Code (`~/.claude/projects/.../memory/`) накопит новые привычки по проекту автоматически.

## 5. Команды качества (как в CI)

```bash
npm run lint
npm run type-check
npm run format:check
npm run test
npm run build
```

## 6. Синхронизация Cursor ↔ Claude Code

Редактируйте **один** `AGENTS.md`. `CLAUDE.md` только импортирует его и добавляет Claude-специфику. Не дублируйте длинные инструкции в двух местах.

## 7. Опционально: user-level правила

Личные предпочтения для всех проектов: `~/.claude/CLAUDE.md` или `~/.claude/rules/`.

Проектные — только в этом репозитории.
