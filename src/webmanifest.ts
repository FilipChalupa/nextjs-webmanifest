import type {
	GetServerSideProps,
	GetServerSidePropsContext,
	NextApiRequest,
	NextApiResponse,
} from 'next'
import type { WebAppManifest } from 'web-app-manifest'

export const createWebmanifestHandler =
	(
		webmanifestData:
			| WebAppManifest
			| ((request: NextApiRequest) => Promise<WebAppManifest>),
	) =>
		async (request: NextApiRequest, response: NextApiResponse) => {
			const data =
			typeof webmanifestData === 'function'
				? await webmanifestData(request)
				: webmanifestData
			response.setHeader('Content-Type', 'application/manifest+json')
			response.write(JSON.stringify(data))
			response.end()
		}


// Deprecated: remove code below in next release
const WebmanifestPage = () => {
	// getServerSideProps will do the heavy lifting
}
/**
 * @deprecated Use `createWebmanifestHandler` instead
 */
export default WebmanifestPage

/**
 * @deprecated Use `createWebmanifestHandler` instead
 */
export const createGetServerSideProps = (
	webmanifestData:
		| WebAppManifest
		| ((context: GetServerSidePropsContext) => Promise<WebAppManifest>),
): GetServerSideProps => {
	return async (context) => {
		const { res: response } = context
		const data =
			typeof webmanifestData === 'function'
				? await webmanifestData(context)
				: webmanifestData
		response.setHeader('Content-Type', 'application/manifest+json')
		response.write(JSON.stringify(data))
		response.end()
		return {
			props: {},
		}
	}
}
