# Beer App

Welcome to the Beer App! This is a simple web application that allows users to search for beers using the Punk API: https://punkapi.com.

Live site URL: [beer-app.jgambard.me](https://beer-app.jgambard.me)  

![](https://i.imgur.com/8qcQQky.png)

## Stack

This project was built with the following technologies:

- Typescript
- NextJS 13
- React Query
- Zod
- Stitches

Testing was done using:

- Vitest
- React Testing Library

Continuous Integration (CI) is handled by GitHub Actions, and Continuous Deployment (CD) is handled by Vercel.

## Architecture

The Beer App uses the repository pattern, a design pattern that isolates the data layer from the rest of the application. The data layer is encapsulated within a React Context called AppRepositories, which provides all repositories with a custom hook.

This pattern makes it easy to test the application with fake implementations and to develop without any backend dependency.

Data is validated using Zod at repository level to ensure no corrupted data is passed down to the components.

Data is validated using Zod at the repository level to ensure that no corrupted data is passed down to the components. Data is received in the consuming component to avoid prop drilling and useless rerendering. The query cache is optimized by pre-populating the already known items data with setQueryData from React Query and the [Query Key Factories Pattern](https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories).

Each component displays a skeleton version of itself during its loading state and an error message in case of a server error. Accessibility and SEO are considered with semantic HTML, [Google SEO guides](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=en) and [JSON LD](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?hl=en).

## Next steps

Future enhancements for the Beer App could include:

- Improve components coverage
- End-to-end testing using playwright, for example
- Use the Lighthouse plugin for Playwright to ensure good web vitals
- Enhance the details page with more data
