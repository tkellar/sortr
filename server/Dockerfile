FROM node:14-alpine as base

WORKDIR /server
COPY package.json yarn.lock /
EXPOSE 8000

FROM base as dev
ENV NODE_ENV=development
RUN yarn install
COPY . /
CMD ["npm run dev"]
