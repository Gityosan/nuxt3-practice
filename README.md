# Nuxt3 Practice

## Nuxt3 の開発勉強用リポジトリです。

## Getting Started

1. `yarn install`

2. `yarn dev`

## Preparation commands

1. `npx nuxi init appName`<br>

2. `yarn add -D vuetify vite-plugin-vuetify sass @mdi/font @mdi/js`<br>

3. `yarn add -D typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser @nuxtjs/eslint-config-typescript @types/node`<br>

4. `yarn add -D eslint eslint-config-prettier eslint-plugin-nuxt prettier`<br>

5. `yarn add -D stylelint stylelint-config-prettier stylelint-config-recess-order stylelint-config-standard-scss postcss-html`<br>

6. `npx nuxi@latest devtools enable`<br>

# Upgrade commands

`yarn upgrade nuxt vuetify vite-plugin-vuetify sass @mdi/font typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser @nuxtjs/eslint-config-typescript @types/node eslint eslint-config-prettier eslint-plugin-nuxt prettier stylelint stylelint-config-recess-order stylelint-config-standard-scss postcss-html vue3-google-map gsap nodemailer --latest`

# 改善余地(皆さんやってみてください)

- GoogleMap のカスタムコントロールボタンを押したら位置情報を取得してマップをその座標に合わせる
- Form の送信ボタンを押した時にバリデーションチェックをしてダメなら送信しないでバリデーションに引っかかったことを何かしらの形で表示する(単純に alert でも可)
- Todo に status 項目（実行前、実行中、完了など線引きは自由に）を追加し、表示も status 毎に並ぶ形にする
- Todo を並び替え可能にする
