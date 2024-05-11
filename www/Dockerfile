FROM --platform=linux/arm64 node:20.11.0

USER root
WORKDIR /app

ADD . /app

RUN npm install
RUN npm run build

CMD ["npm", "start"]
