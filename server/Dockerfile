FROM node:16.17-alpine3.15
WORKDIR /app
RUN mkdir /app/logs
COPY package*.json /app/
RUN npm i
COPY ./ /app
ENV PATH /app/node_modules/.bin:$PATH
RUN npx prisma generate
CMD ["npm", "run", "start"]