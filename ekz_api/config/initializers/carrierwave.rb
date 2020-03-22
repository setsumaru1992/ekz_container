require "carrierwave/storage/abstract"
require "carrierwave/storage/file"
require "carrierwave/storage/fog"

CarrierWave.configure do |config|
  config.fog_provider = "fog/aws"
  config.fog_public = false
  config.fog_directory  = "ekz-images"
  config.fog_credentials = {
      provider: "AWS",
      aws_access_key_id: ENV["AWS_EKZ_ADMIN_ACCESS_KEY"],
      aws_secret_access_key: ENV["AWS_EKZ_ADMIN_SECRET_ACCESS_KEY"],
      region: "ap-northeast-1"
  }
end

CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/
