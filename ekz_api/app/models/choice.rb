class Choice < ApplicationRecord
  include Choice::Finder

  belongs_to :theme
  has_many :comments
  has_many :choice_images
  has_many :choice_tags
  has_one :choice_webpage_capture
end
