module.exports = {
	content: ['./static/front/components/*.js','./static/back/components/*.js', './views/**/*.handlebars', './views/**/**/*.handlebars',],
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/forms')],
}
