FROM ruby:2.5.3

CMD [ "/bin/bash" ]
ENV LANG C.UTF-8

RUN gem install bundler -v 2.1.2
COPY Gemfile Gemfile.lock ./
RUN bundle install

ARG appname=ekz_api
ARG apppath="/root/$appname"
WORKDIR $apppath

CMD [ "./entrypoint.sh" ]