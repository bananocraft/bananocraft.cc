FROM hugomods/hugo:exts AS builder

WORKDIR /src
COPY . .

RUN hugo --minify

FROM scratch
COPY --from=builder /src/public /public
