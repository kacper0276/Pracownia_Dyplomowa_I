FROM node:20-alpine as build

WORKDIR /src
RUN npm install -g @angular/cli
COPY . ./
RUN npm ci
RUN ng build --configuration=production

FROM nginx:stable AS final
EXPOSE 80
COPY --from=build /src/dist/client/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
