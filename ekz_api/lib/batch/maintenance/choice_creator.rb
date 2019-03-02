module Batch::Maintenance::ChoiceCreator
  # rails runner "Batch::Maintenance::ChoiceCreator::create_from_csv(file_path, theme_id)"
  require 'csv'

  class << self
    def create_from_csv(file_path, theme_id)
      csv = CSV.table(file_path)
      csv.each do |row|
        params = {
          theme_id: theme_id,
          name: row[:name],
          url: row[:url],
          evaluation: row[:evaluation]
        }
        save_new_model(params)
      end
    end
  end
end