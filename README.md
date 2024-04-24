# Next.js14 と microCMS で CRUD の実装

## 参考

* ベース：[Next.js14とmicroCMSでCRUDの実装 - Zenn](https://zenn.dev/arsaga/articles/15dba8cf8ad430#プロジェクトの作成)

## メモ

* microCMS の管理画面で、POST/PUT/PATCH/DELETE 等の権限を許可する

## 参考の元コードと変えたところ

### 開発環境

* ESLint の代わりに biome を使う
  - ESLint, Prettier, prettier-plugin-tailwindcss の代替
  - Jetbrains IDE に biome プラグインを追加
* コミット時に自動でコードフォーマットを行う
  - husky, lint-staged を使う
  - package.json に husky, lint-staged の設定を追加
  - .husky/pre-commit にコミット時に実行するコマンド `npx lint-staged` を記述
* 環境変数を .env.local にまとめる
  - .env.local は .gitignore でバージョン管理から外す

### ページ

* ページのディレクトリ構成を変更
  - 一覧、詳細、新規作成、編集のページ、元記事では todo/page.tsx だったが、app/pages に変更

### その他

* 型定義を外部ファイルにまとめた
* Todo操作のサーバーアクションフック (createTodo, updateTodo, deleteTodo) を actions/todo.ts にまとめた
