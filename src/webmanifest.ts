import type { GetServerSideProps } from 'next'
import type { WebAppManifest } from 'web-app-manifest'

const WebmanifestPage = () => {
	// getServerSideProps will do the heavy lifting
}
export default WebmanifestPage

export const createGetServerSideProps = (
	webmanifestData: WebAppManifest | (() => Promise<WebAppManifest>),
): GetServerSideProps => {
	return async ({ res: response }) => {
		const data =
			typeof webmanifestData === 'function'
				? await webmanifestData()
				: webmanifestData
		response.setHeader('Content-Type', 'application/manifest+json')
		response.write(JSON.stringify(data))
		response.end()
		return {
			props: {},
		}
	}
}
