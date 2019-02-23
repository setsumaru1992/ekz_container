module ChoiceDomain
  require 'csv'

  class Entity

    def initialize

    end

    def list(params)
      Choice.where(theme_id: params[:theme_id]).order("evaluation DESC, updated_at DESC")
    end

    def ekz_pick(params)
      ChoiceDomain::EkzPicker.pick(params[:theme_id])
    end

    def create(params)
      choice = Choice.new
      choice.theme = Theme.find(params[:theme_id])
      choice.name = params[:name]
      choice.url = params[:url]
      choice.evaluation = params[:evaluation]

      begin
        choice.save!
      rescue => error
        p error
        raise error
      end
      return choice
    end

    def update(params)
      choice = Choice.find(params[:id])
      choice.evaluation = params[:evaluation]
      choice.save
    end

    def destroy(params)
      choice = Choice.find(params[:id])
      choice.destroy
    end

    def import_csv(file_path, theme_id)
      csv = CSV.table(file_path)
      csv.each do |row|
        params = {
          theme_id: theme_id,
          name: row[:name],
          url: row[:url],
          evaluation: row[:evaluation]
        }
        create(params)
      end
    end
  end
end