module.exports = {
	content: ['./static/front/components/*.js', './views/**/*.handlebars', './views/**/**/*.handlebars',],
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/forms')],
}
