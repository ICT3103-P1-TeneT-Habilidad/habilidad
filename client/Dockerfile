FROM node:16.17-alpine3.15
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json /app/
RUN npm i
COPY ./ /app
EXPOSE 3000
CMD ["npm", "run", "start"]