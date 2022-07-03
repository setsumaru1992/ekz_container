FROM node:16

ARG appname=ekz_view
ARG apppath="/root/$appname"

WORKDIR $apppath

COPY package.json yarn.lock ./

RUN yarn install

CMD [ "./entrypoint.sh" ]
