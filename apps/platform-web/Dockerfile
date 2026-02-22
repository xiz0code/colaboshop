FROM node:20-alpine
WORKDIR /app
COPY apps/platform-web/package.json package.json
RUN npm install
COPY apps/platform-web .
CMD ["npm","run","dev","--","--host","0.0.0.0"]
