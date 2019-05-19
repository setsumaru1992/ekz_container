class Choice < ApplicationRecord
  include Choice::Finder

  belongs_to :theme
  has_many :comments
end
