import YouTube from './helper/youtube.js'
import NoImage from './helper/noimage.js'

const allowedLocales = ['pt_BR', 'en_US', 'es_ES']

const setLocale = (store, locale) => {
	if(allowedLocales.includes(locale)) {
		store.commit('setLocale', locale)
	}
}
const strReplaceAll = (str, find, replace) => {
    return str.split(find).join(replace)
}

const locale = (store, value, data) => {
	
	let locales = store.state.$rightLabel.locales
	if(!locales[store.state.$rightLabel.locale] || !locales[store.state.$rightLabel.locale][value]) return value
	
	let str = locales[store.state.$rightLabel.locale][value]
	if(!data || typeof data != 'object') return str

	for(let key in data) {
		
		if(!Array.isArray(data[key])) {
			return str.replace('{'+key+'}', data[key])
		}

		if(typeof data[key][1] == 'string') {
			str = str.replace('{'+key+'}', `<a href="${data[key][1]}">${data[key][0]}</a>`)
		}

		if(typeof data[key][1] == 'function') {
			let event = `static_event_${strReplaceAll(value, '.', '_')}_${key}`
			str = str.replace('{'+key+'}', `<span id="${event}">${data[key][0]}</span>`)
			if(document.querySelector(`#${event}`)) document.querySelector(`#${event}`).onclick = data[key][1]
		}
	
	}
	return str

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