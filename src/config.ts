import type { PluginOption } from 'vite'

export const virtualConfigModule = (
	configFile: string = './auth.config'
): PluginOption => {
	const virtualModuleId = 'auth:config'
	const resolvedId = '\0' + virtualModuleId

	return {
		name: 'auth-astro-config',
		resolveId: id => {
			if (id === virtualModuleId) {
				return resolvedId
			}
		},
		load: id => {
			if (id === resolvedId) {
				return `export default ${JSON.stringify(configFile)}`
			}
		},
	}
}

export interface AstroAuthConfig {
	/**
	 * Defines the base path for the auth routes.
	 * @default '/api/auth'
	 */
	prefix?: string
	/**
	 * Defineds wether or not you want the integration to handle the API routes
	 * @default true
	 */
	injectEndpoints?: boolean
  /**
   * Defines the path to the config file
   */
  configFile?: string
}
