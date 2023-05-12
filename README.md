# Next.js Webmanifest helper [![npm](https://img.shields.io/npm/v/nextjs-webmanifest.svg)](https://www.npmjs.com/package/nextjs-webmanifest) ![npm type definitions](https://img.shields.io/npm/types/nextjs-webmanifest.svg)

Simplify adding webmanifest to your web.

## Installation

```bash
npm install nextjs-webmanifest
```

## Usage

Create `app.webmanifest.js` file in your Next.js `pages` directory.

```js
import { WebmanifestPage, { createGetServerSideProps } } from 'nextjs-webmanifest'

export default WebmanifestPage

export const getServerSideProps = createGetServerSideProps({
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

```js
<Head>
	<link rel="manifest" href="/app.webmanifest" />
</Head>
```

### Asynchronous

```js
export const getServerSideProps = createGetServerSideProps(async (context) => {
	const response = await fetch(
		`https://example.com/${context.locale}/manifest.json`,
	)
	const manifest = await response.json()
	return manifest
})
```
