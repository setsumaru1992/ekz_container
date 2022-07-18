class TypeAny < ActiveModel::Type::Value
  def cast_value(value)
    value
  end
end

ActiveModel::Type.register(:any, TypeAny)

# TODO: integers,strings含め、配列以外や型以外の値が入るようになったらチェックや型変換をちゃんとする
class TypeIntegers < ActiveModel::Type::Value
  def cast_value(value)
    value
  end
end

ActiveModel::Type.register(:integers, TypeIntegers)

class TypeStrings < ActiveModel::Type::Value
  def cast_value(value)
    value
  end
end

ActiveModel::Type.register(:strings, TypeStrings)