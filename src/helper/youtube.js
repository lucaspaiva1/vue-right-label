export default (code, settings) => {
				
	let defaultSettings = {
		width: 320,
		height: 210,
		autoplay: false,
		allowFullscreen: true
	}
	
	if(typeof code != 'string') return false
	
	if(typeof settings != 'object') settings = defaultSettings
	else settings = Object.assign(defaultSettings, settings)

	let template = `
		<iframe
			width="${settings.width}"
			height="${settings.height}"
			src="https://www.youtube.com/embed/${code}"
			${settings.autoplay ? 'allow="autoplay; ' : ' '}
			${settings.allowFullscreen ? 'allowfullscreen ' : ' '}
			encrypted-media>
		</iframe>
	`
	return template

}