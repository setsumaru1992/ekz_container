require_relative 'boot'

require 'rails/all'
require 'sprockets/railtie'
require 'dotenv'

# TODO dockerコンテナ環境前の環境定義ファイル適用
env_path = "../.env"
if File.exist?(env_path)
  Dotenv.load! env_path
end

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module EkzApi
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
    config.autoload_paths += %W(#{config.root}/app/domains)
    config.autoload_paths += %W(#{config.root}/lib)
    config.autoload_paths += %W(#{config.root}/app/lib)

    config.time_zone = 'Asia/Tokyo'
    #config.active_record.default_timezone = 'Tokyo'
    config.active_record.default_timezone = :local

    config.encoding = "utf-8"

    config.generators do |g|
      g.stylesheets false
      g.javascripts false
      g.helper false
      g.template_engine false
      g.test_framework false
    end

    # https://qiita.com/guri3/items/268dc4f8be4bafe5029f
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins "*"

        resource "*",
                 headers: :any,
                 methods: [:get, :post, :put, :patch, :delete, :options, :head],
                 expose: ['Per-Page', 'Total', 'Link']
      end
    end
  end
end