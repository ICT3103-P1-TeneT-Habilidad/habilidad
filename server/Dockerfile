FROM node:16.17
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json /app
RUN npm i
COPY ./ /app
CMD ["npm", "run", "start"]


# FROM node:16.17-alpine3.15


# WORKDIR /app

# COPY ["package.json", "package-lock.json", "./"]

# RUN npm install

# COPY . .

# RUN npx prisma generate


# CMD ["npm", "run", "start"]