# webar_demo

webarのデモ。iosデバイスは、[xrviewer](https://labs.mozilla.org/projects/webxr-viewer/)を利用する（safariでは実行できない)

## build
nodejsをインストールする

必要なライブラリをインストールする。
```sh
cd webar_demo
npm install
```

distディレクトリ以下のファイル群をサーバーにコピーするスクリプトを記述し(scp等を利用する)、
deploy.sh　として保存する

vite.config.tsの２５行目、baseプロパティをサーバで公開されるパスに合わせる

```
例)
https://ie.u-ryukyu.ac.jp/~e99999/webar_demo/
で公開される場合、

base: /webar_demo/
とする。
```

## デプロイ
上記のdeploy.shが正しく作成されていれば、以下のコマンドでビルト&デプロイされる　
```sh
npm run deploy
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
