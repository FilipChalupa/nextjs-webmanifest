import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import type { WebAppManifest } from 'web-app-manifest'

const WebmanifestPage = () => {
	// getServerSideProps will do the heavy lifting
}
export default WebmanifestPage

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
