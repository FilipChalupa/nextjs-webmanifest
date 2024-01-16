import type { NextApiRequest, NextApiResponse } from 'next'
import type { WebAppManifest } from 'web-app-manifest'

const fiveMinutes = 60 * 5

export const createWebmanifestHandler =
	(
		webmanifestData:
			| WebAppManifest
			| ((request: NextApiRequest) => WebAppManifest | Promise<WebAppManifest>),
	) =>
		async (request: NextApiRequest, response: NextApiResponse) => {
			const data =
			typeof webmanifestData === 'function'
				? await webmanifestData(request)
				: webmanifestData
			response.setHeader(
				'Cache-control',
				`stale-while-revalidate, s-maxage=${fiveMinutes}`,
			)
			response.setHeader('Content-Type', 'application/manifest+json')
			response.write(JSON.stringify(data))
			response.end()
		}
