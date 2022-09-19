class Choice < ApplicationRecord
  include Choice::Finder

  belongs_to :theme
  has_many :comments, dependent: :destroy
  has_many :choice_images, dependent: :destroy
  has_many :choice_tags, dependent: :destroy
  has_one :choice_webpage_capture, dependent: :destroy
end
