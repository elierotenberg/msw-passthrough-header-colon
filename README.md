# msw-passthrough-header-colon

A passthrough request is never sent when one of its header values contains
`": "`.

```sh
npm install
npm test
```

The script starts a local HTTP server, starts an msw server without handlers,
and sends two `fetch` requests with the `x-test` header. The first value,
`a b`, passes through. The second value, `a: b`, makes the interceptor throw
`TypeError: Headers.append: "*/*" is an invalid header name`.
