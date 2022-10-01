module.exports = {
	content: ["./static/front/**/*.{html,js}", "./views/**/*.handlebars"],
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/forms')],
}
