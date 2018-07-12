# Large Apollo Server Boilerplate

This is an example of an apollo server (2.0) instance with the file structure designed to scale to accomodate larger projects.

The basic idea is to split up the type definitions into separate files (under `types/`). This could be a couple files, based on domain, or even a separate file for each type. After doing that, we want to **keep our resolvers next to the type definitions that they resolve**, so we add the resolvers in the same file, and export them both.

We also split up data fetching logic for each kind of data (into `/models`). We do this because multiple types may need to fetch a specific kind of data (like a `User` which can be accessed from multiple places in the schema).

We also split the connection data for each different data source, whether it be a REST endpoint or a database. We put that in `/connectors` and pass it to every model on initialization, since multiple models likely need access to the same data sources.

More explanation of exactly _how_ the merging of SDL schemas and resolvers happens can be found in [this blog post](https://dev-blog.apollodata.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2)

```
src
  server.js # initialize the server here

  connectors/
    - sqlite.js # where an ORM would go for a sqlite db
  
  models/
    - user.js # data lookup/transform logic for all users
  
  types/
    - index.js # merge all typedefs and resolvers and export
    - user.js # resolvers and SDL type defs for the user type
```

