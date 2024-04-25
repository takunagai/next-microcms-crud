# Next.js14 と microCMS で CRUD の実装

## 概要

Next.js14 と microCMS で Todoリストを作成、CRUD 基本実装の練習を行う。

## 使用技術

* Next.js 14.2.2
  - App Directory, Server Action
* TypeScript
* microCMS
* Tailwind CSS
* Biome
* husky, lint-staged

## 参考

* ベース：[Next.js14とmicroCMSでCRUDの実装 - Zenn](https://zenn.dev/arsaga/articles/15dba8cf8ad430#プロジェクトの作成)

## メモ

* microCMS の管理画面で、POST/PATCH/DELETE の権限を許可する (PUT は不要)

## 参考の元コードと変えたところ

### 開発環境

* ESLint の代わりに biome を採用
  - ESLint, Prettier, prettier-plugin-tailwindcss の代替
  - Jetbrains IDE に biome プラグインを追加
  - 参考：[Getting Started - Biome](https://biomejs.dev/guides/getting-started/)
* コミット時に自動でコードフォーマットを行う
  - husky, lint-staged を使う
  - package.json に husky, lint-staged の設定を追加
  - .husky/pre-commit にコミット時に実行するコマンド `npx lint-staged` を記述
  - 参考
    + [husky + lint-staged でコミット前にlintを強制する方法 - Zenn](https://zenn.dev/risu729/articles/latest-husky-lint-staged)
    + [Get started - Husky](https://typicode.github.io/husky/get-started.html)
    + [lint-staged/lint-staged - Github](https://github.com/lint-staged/lint-staged)
    + [Git Hooks - Biome](https://biomejs.dev/recipes/git-hooks/#husky)
* microCMS の API キーを環境変数に (.env.local) 
  - .env.local は .gitignore でバージョン管理から外す

### ページ

* ページのディレクトリ構成を変更
  - 一覧ページ、元記事では todo/page.tsx だったが、トップページ (app/pages) に変更

### その他

* 型定義を外部ファイルにまとめた
* Todo操作のサーバーアクションフック (createTodo, updateTodo, deleteTodo) を actions/todo.ts にまとめた
