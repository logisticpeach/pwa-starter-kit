FROM node:alpine AS build
COPY . /appbase/
RUN cd appbase && npm i && npm run build

FROM node:alpine
RUN npm i -g prpl-server
COPY --from=build /appbase/server .
ENTRYPOINT prpl-server --root /build/ --host 0.0.0.0 --bot-proxy https://render-tron.appspot.com/render
EXPOSE 8080