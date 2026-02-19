FROM hugomods/hugo:exts AS builder

ARG HUGO_BASEURL="/"

WORKDIR /src
COPY . .

RUN hugo --minify --baseURL "${HUGO_BASEURL}"

FROM scratch
COPY --from=builder /src/public /public
