# PWA Studio MegaSearch extension

![Preview](https://github.com/wesleyalmd/pwa-studio-megasearch/raw/master/docs/preview.png 'Preview Megamenu')

### Requeriments

- Magento 2.3.\*

### Extension options

| props    | type | default value |
| -------- | :--: | ------------: |
| showMask | bool |          true |

### Install

**1. Adding dependency**

```
yarn add @wesleyalmd/pwa-studio-megasearch
```

**2. Wrap module in your `local-intercept.js`**

```
const { Targetables } = require('@magento/pwa-buildpack');

module.exports = targets => {
  const targetables = Targetables.using(targets);

  /** Megasearch extension */
  const {
    wrapMegasearchModuleTargetable
  } = require('@wesleyalmd/pwa-studio-megasearch/targets');
  wrapMegasearchModuleTargetable(targetables, {
    showMask: true
  });
};

```
