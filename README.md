# Next.js Webmanifest helper [![npm](https://img.shields.io/npm/v/nextjs-webmanifest.svg)](https://www.npmjs.com/package/nextjs-webmanifest) ![npm type definitions](https://img.shields.io/npm/types/nextjs-webmanifest.svg)

Simplify adding webmanifest to your web.

## Installation

```bash
npm install nextjs-webmanifest
```

## Usage

Create `app.webmanifest.js` file in your Next.js `pages/api` directory.

### `pages/api/app.webmanifest.js`

```js
import { createWebmanifestHandler } from 'nextjs-webmanifest'

export default createWebmanifestHandler({
	name: 'My Super Trouper App',
	short_name: 'App',
	start_url: '/',
	display: 'standalone',
	theme_color: '#04a600',
	background_color: '#000000',
	// You can add more: https://developer.mozilla.org/en-US/docs/Web/Manifest
})
```

And don't forget to add `<link>` to `<Head>` placed usually in your `_document.js` or `_app.js` file.

### `pages/_document.js`

```jsx
<Head>
	<link rel="manifest" href="/api/app.webmanifest" />
</Head>
```

### Asynchronous

```js
export default createWebmanifestHandler(async (request) => {
	const locale = request.url.substring(1, 3)
	const response = await fetch(`https://example.com/${locale}/manifest.json`)
	const manifest = await response.json()
	return manifest
})
```
