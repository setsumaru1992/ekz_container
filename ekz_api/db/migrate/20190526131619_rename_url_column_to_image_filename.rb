class RenameUrlColumnToImageFilename < ActiveRecord::Migration[5.2]
  def change
    rename_column :choice_images, :url, :image_filename
  end
end
