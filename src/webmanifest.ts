import type { GetServerSideProps } from 'next'
import type { WebAppManifest } from 'web-app-manifest'

const WebmanifestPage = () => {
	// getServerSideProps will do the heavy lifting
}
export default WebmanifestPage

export const createGetServerSideProps = (
	webmanifestData: WebAppManifest,
): GetServerSideProps => {
	return async ({ res: response }) => {
		response.setHeader('Content-Type', 'application/manifest+json')
		response.write(JSON.stringify(webmanifestData))
		response.end()
		return {
			props: {},
		}
	}
}
