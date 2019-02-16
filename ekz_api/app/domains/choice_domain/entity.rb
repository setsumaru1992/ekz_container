module ChoiceDomain
  class Entity

    def initialize()

    end

    def create(params)
      choice = Choice.new
      choice.theme = Theme.find(params[:themeId])
      choice.name = params[:name]
      choice.url = params[:url]
      choice.evaluation = params[:evaluation]

      begin
        choice.save!
      rescue => error
        p error
        raise error
      end
      return
    end

    def destroy(params)
      choice = Choice.find(params[:id])
      choice.destroy
    end
  end
end