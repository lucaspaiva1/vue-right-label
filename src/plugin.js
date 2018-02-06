import YouTube from './helper/youtube.js'
import NoImage from './helper/noimage.js'

const allowedLocales = ['pt_BR', 'en_US', 'es_ES']

const setLocale = (store, locale) => {
	if(allowedLocales.includes(locale)) {
		store.commit('setLocale', locale)
	}
}

const locale = (store, value, data) => {
	if(store.state.$rightLabel.locales[store.state.$rightLabel.locale]) {
		if(store.state.$rightLabel.locales[store.state.$rightLabel.locale][value]) {
			let str = store.state.$rightLabel.locales[store.state.$rightLabel.locale][value]
			if(data && typeof data == 'object') for(let key in data) str = str.replace('{'+key+'}', data[key])
			return str
		}
	}
}

const image = (store, value) => {
	if(store.state.$rightLabel.images[value])
		return store.state.$rightLabel.images[value]
	return NoImage
}

const video = (store, value, settings) => {
	if(store.state.$rightLabel.videos[value])
		return YouTube(store.state.$rightLabel.videos[value], settings)
	return YouTube('ScMzIvxBSi4')
}

export default {

	install(Vue, options) {

		Vue.mixin({
			mounted() {
				if(!this.$parent) {
					this.$store.commit('setLocale', options.locale)
					this.$store.commit('setLocales', options.locales)
					this.$store.commit('setImages', options.images)
					this.$store.commit('setVideos', options.videos)
				}
			}
		})

		Vue.prototype.$rl = function(){
			let args = Array.from(arguments)
			let name = args[0]
			args.shift()
			switch(name) {
				case 'setLocale':
					return setLocale(this.$store, ...args)
				break;
				case 'locale':
					return locale(this.$store, ...args)
				break;
				case 'image':
					return image(this.$store, ...args)
				break;
				case 'video':
					return video(this.$store, ...args)
				break;
			}
		}

	}

}