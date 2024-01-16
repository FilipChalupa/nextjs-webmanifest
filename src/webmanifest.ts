import type { NextApiRequest, NextApiResponse } from 'next'
import type { WebAppManifest } from 'web-app-manifest'

const contentType = 'application/manifest+json'

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
			response.setHeader('Content-Type', contentType)
			response.write(JSON.stringify(data))
			response.end()
		}

export const createWebmanifestGET = (
	webmanifestData:
				| WebAppManifest
				| ((request: Request) => WebAppManifest | Promise<WebAppManifest>),
) => {
	return async (request: Request) => {
		const data =
					typeof webmanifestData === 'function'
						? await webmanifestData(request)
						: webmanifestData
		const response = new Response(JSON.stringify(data), {
			headers: {
				'Content-Type': contentType,
			},
		})
		return response
	}
}
