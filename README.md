# Ricette di Elisa - Website

Ricette di Elisa (Elisa's recipes) is a list of Italian home recipes created by
Elisa, a 75 years old Italian grandmother, collected in electronic form during
the last 15 years. Some of the recipes have been suggested by some of her
friend.

Backed by a Airtable database, this project consumes a [GraphQL endpoint](https://github.com/csarnataro/ricette-di-elisa-api) with all
the recipes available at the moment.

Online demo available at:

[https://ricette-di-elisa.netlify.app](https://ricette-di-elisa.netlify.app)

## Intended use of this Site

I created this site mainly to make my aunt Elisa happy, now she can write
and store her recipes in a safe place (Airtable).
Too many broken hard disks during these last 15 years and no backups caused
the loss of many many great recipes.

Moreover, I wanted to do some experiments with [React](https://reactjs.org/), [GraphQL](https://graphql.org/)
deployed with [serverless functions on Netlify](https://www.netlify.com/products/functions/).
Eventually I would like to create a [Flutter](https://flutter.dev/) or
Kotlin/Android mobile
app to share those recipes with friends and whoever loves Italian home cuisine.

## Airtable

The receipes are stored in a [Airtable](https://www.airtable.com) private
database.

## Netlify

This website is hosted on Netlify, using a free starter plan.

## Styling - Tailwind CSS and Postcss
For the styling work I've been using [Tailwind CSS](https://tailwindcss.com/) and a sprinkle of postcss plugins
to get an optimized CSS bundle.

## Limits and quotas

The demo above is using free tiers both in Airtable and in Netlify, so it has
some limitations regarding the number of request per seconds (it should be around 5 per seconds).

## License

[MIT](https://choosealicense.com/licenses/mit/)
