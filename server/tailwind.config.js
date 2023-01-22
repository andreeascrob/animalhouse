module.exports = {
	content: ['./static/front/components/*.js','./views/back/*.handlebars', './views/**/*.handlebars', './views/**/**/*.handlebars',],
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/forms')],
}
