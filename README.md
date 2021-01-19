![](https://img.shields.io/badge/Microverse-blueviolet)

# G2i NodeJS Test

> REST API for the World Texting Foundation, also known as WTF.

This is a REST API for Messaging acronyms which are everywhere now.

## Built With

- NodeJS
- Express
- Docker
- Docker compose


## Getting Started

### Prerequisites

`docker-compose` must be installed. If you don't have it, you must have `NodeJs` and `npm` installed.

### Setup

If you have `docker-compose` installed, follow these steps
- Clone the repository `git clone https://github.com/maelfosso/g2i-nodejs.git`
- Change the current directory `cd g2i-nodejs`
- Run `docker-compose up`
- The API is now available through `http://localhost:3000`

If you don't have `docker-compose` but `NodeJs` and `npm` installed

- Clone the repository `git clone https://github.com/maelfosso/g2i-nodejs.git`
- Change the current directory `cd g2i-nodejs`
- Install the dependencies `npm install`
- Run the application `npm run start:dev`
- The API is now available through `http://localhost:3000`

### Features

- **`GET /acronym?from=50&limit=10&search=:search`**
  - ▶ returns a list of acronyms, paginated using query parameters
  - ▶ response headers indicate if there are more results
  - ▶ returns all acronyms that fuzzy match against `:search`
- **`GET /acronym/:acronym`**
  - ▶ returns the acronym and definition matching `:acronym`
- **`GET /random/:count?`**
  - ▶ returns `:count` random acronyms
  - ▶ the acronyms returned should not be adjacent rows from the data
- **`POST /acronym`**
  - ▶ receives an acronym and definition strings
  - ▶ adds the acronym definition to the db
- **`PUT /acronym/:acronym`**
  - ▶ receives an acronym and definition strings
  - ▶ uses an authorization header to ensure acronyms are protected
  - ▶ updates the acronym definition to the db for `:acronym`
- **`DELETE /acronym/:acronym`**
  - ▶ deletes `:acronym`
  - ▶ uses an authorization header to ensure acronyms are protected

For the authorization header, the TOKEN is the `**auth**` field from `src/config/config.ts` file

## Authors

👤 **Mael FOSSO**

- GitHub: [@maelfosso](https://github.com/maelfosso)
- Twitter: [@maelfosso](https://twitter.com/maelfosso)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/mael-fosso-650b6346/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](issues/).

## Show your support

Give a ⭐️ if you like this project!

## 📝 License

This project is [MIT](lic.url) licensed.