FROM node:12.16.1

ARG appname=ekz
ARG apppath="/root/$appname"

WORKDIR $apppath

COPY package.json yarn.lock ./

RUN yarn install

CMD [ "./entrypoint.sh" ]