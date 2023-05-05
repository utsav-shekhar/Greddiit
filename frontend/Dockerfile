FROM node:18.13.0  
WORKDIR /app

# ENV PATH=/frontend/node_modules/.bin:$PATH

COPY package.json .
RUN npm install
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
# http connection is one-way 
# gotta create web-socket connection
# for 2 way connection