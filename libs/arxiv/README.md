# arxiv

This library was generated with [Nx](https://nx.dev).

The purpose of this nest module is to consume the arxiv.org API to provide the application with summaries of scientific papers.

These will then be used to feed into the RAG.

## Running unit tests

Run `npx nx test arxiv` to execute the unit tests via [Jest](https://jestjs.io).

## Todo

This isn't implemented, the documentation for this api is pretty large and the output isn't easy to parse.
The output is also in xml which is another huge timesink to actually handle.
[Arxiv API manual](https://info.arxiv.org/help/api/user-manual.html)

In a correct setup this should be the module where all of the data retrieval happens. This should most likely also include
a vector database if we are looking to build a reusable database for RAG purposes.
