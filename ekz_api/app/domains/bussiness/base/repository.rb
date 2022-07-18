module Bussiness::Base
  class Repository
    class << self
      def set_same_name_fields_into_model(value_object, value_record, field_names)
        field_names.each do |field|
          value_record[field] = value_object[field]
        end
        value_record
      end
    end
  end
end