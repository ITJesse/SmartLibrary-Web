FROM node:argon

COPY src /usr/src
WORKDIR /usr/src/
COPY ./npmrc /root/.npmrc

RUN npm install && npm cache clean

RUN mkdir /home/camera

EXPOSE 3000

CMD [ "npm", "start" ]
