class ChoiceImage < ApplicationRecord
  belongs_to :choice
  mount_uploader :image_filename, ChoiceImageUploader

  scope :with_latest_image, -> {
    where("
      EXISTS(
      SELECT *
      FROM (
          SELECT
            choice_id
            , MAX(created_at) latest_created_at
          FROM choice_images
          GROUP BY choice_id
        ) latest_choice_images
      WHERE choice_images.created_at = latest_choice_images.latest_created_at
          OR choice_images.created_at IS NULL
      )
    ")
  }
end
