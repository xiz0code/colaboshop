FROM node:20-alpine
WORKDIR /app
COPY apps/admin-web/package.json package.json
RUN npm install
COPY apps/admin-web .
CMD ["npm","run","dev","--","--host","0.0.0.0"]
