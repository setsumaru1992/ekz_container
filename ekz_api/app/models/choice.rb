class Choice < ApplicationRecord
  include Choice::Finder

  belongs_to :theme
end
