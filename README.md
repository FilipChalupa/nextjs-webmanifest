# Next.js Webmanifest helper [![npm](https://img.shields.io/npm/v/nextjs-webmanifest.svg)](https://www.npmjs.com/package/nextjs-webmanifest) ![npm type definitions](https://img.shields.io/npm/types/nextjs-webmanifest.svg)

Simplify adding webmanifest to your web.

## Installation

```bash
npm install nextjs-webmanifest
```

## Usage

### With `pages` directory

Create `app.webmanifest.js` file inside your Next.js `pages/api` directory and use `createWebmanifestHandler`.

#### `pages/api/app.webmanifest.js`

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

#### Asynchronous

```js
export default createWebmanifestHandler(async (request) => {
	const locale = request.url.substring(1, 3)
	const response = await fetch(`https://example.com/${locale}/manifest.json`)
	const manifest = await response.json()
	return manifest
})
```

#### `<head>`

Don't forget to add `<link>` to `<head>` to tell browser where to look for your webmanifest.

```html
<link rel="manifest" href="/api/app.webmanifest" />
```

### With `app` directory

Create `route.js` file inside your Next.js `app/app.webmanifest` directory and use `createWebmanifestGET`.

#### `app/app.webmanifest/route.js`

```js
import { createWebmanifestGET } from 'nextjs-webmanifest'

export const GET = createWebmanifestGET({
	name: 'My Super Trouper App',
	// and more
})
```

`createWebmanifestGET` can accept asynchronous function as well.

#### `<head>`

Don't forget to add `<link>` to `<head>` to tell browser where to look for your webmanifest.

```html
<link rel="manifest" href="/app.webmanifest" />
```

or

```js
export const metadata: Metadata = {
	manifest: '/app.webmanifest',
}
```
