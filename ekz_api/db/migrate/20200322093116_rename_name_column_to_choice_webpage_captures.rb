class RenameNameColumnToChoiceWebpageCaptures < ActiveRecord::Migration[5.2]
  def change
    rename_column :choice_webpage_captures, :name, :image
  end
end
