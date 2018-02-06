export default {
	state: {
		$rightLabel: {
			locale: null,
			locales: {},
			images: {},
			videos: {},
		}
	},
	getters: {
		locale: state => state.$rightLabel.locale,
		locales: state => state.$rightLabel.locales,
		images: state => state.$rightLabel.images,
		videos: state => state.$rightLabel.videos,
	},
	mutations: {
		setLocale: (state, value) => state.$rightLabel.locale = value,
		setLocales: (state, value) => state.$rightLabel.locales = value,
		setImages: (state, value) => state.$rightLabel.images = value,
		setVideos: (state, value) => state.$rightLabel.videos = value,
	}
}