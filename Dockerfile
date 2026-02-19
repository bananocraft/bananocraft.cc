FROM hugomods/hugo:exts as builder

WORKDIR /src
COPY . .

RUN hugo --minify

FROM scratch
COPY --from=builder /src/public /public
