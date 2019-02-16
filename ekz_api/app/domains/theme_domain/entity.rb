module ThemeDomain
  class Entity

    def initialize()

    end

    def create(params)
      theme = Theme.new
      theme.name = params[:name]
      theme.created_by = 1
      theme.updated_by = 1
      theme.save!
      return
    end

    def destroy(params)
      theme = Theme.find(params[:id])
      theme.destroy
    end
  end
end