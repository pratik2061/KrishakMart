FROM node:22-alpine

LABEL author="pratik sharma"

RUN mkdir -p krishakmart-backend

COPY . /krishakmart-backend

WORKDIR /krishakmart-backend

RUN npm install pnpm -g

RUN pnpm --version

RUN pnpm install

RUN pnpm prisma generate 

EXPOSE 3000

CMD ["pnpm", "dev"]

