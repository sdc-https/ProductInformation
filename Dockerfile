FROM node
COPY . .
RUN npm install

EXPOSE 3001
CMD ["node", "server/index.js"]
