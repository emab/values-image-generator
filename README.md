# Introduction

An electron app that can be used to build a Barrett Model diagram.

![App Example](/img/app.png)

## Building and installing

Package using `electron-packager`:

```bash
npm i electron-packager --save-dev
```

To generate program for all distributions, use:

```bash
npm run buildAll
```

To generate windows only app use:

```bash
npm run buildWin
```

To package app into an MSI:

```bash
node ./installer/msi.js
```
