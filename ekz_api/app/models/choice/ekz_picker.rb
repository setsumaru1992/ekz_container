module Choice::EkzPicker
  extend ActiveSupport::Concern

  EVALUATION_GOOD = 1
  EVALUATION_NORMAL = 0
  EVALUATION_BAD = -1

  MAX_SIZE_BAD = 1

  class_methods do
    def ekz_pick(theme_id, max_list_size = 1)
      ekz_pick_param = EkzPickParams.new(theme_id)

      good_choice_size, normal_choice_size, bad_choice_size = sizes_every_evaluation(max_list_size, ekz_pick_param)

      ekz_list = []
      ekz_list.concat(pick_by_evaluation(EVALUATION_GOOD, good_choice_size, ekz_pick_param))
      ekz_list.concat(pick_by_evaluation(EVALUATION_NORMAL, normal_choice_size, ekz_pick_param))
      ekz_list.concat(pick_by_evaluation(EVALUATION_BAD, bad_choice_size, ekz_pick_param))
      ekz_list
    end

    private

    def sizes_every_evaluation(max_list_size, ekz_pick_param)
      return sizes_every_evaluation_which_one_size_is_one(ekz_pick_param) if max_list_size == 1

      good_choice_size = gen_good_choice_size(max_list_size, ekz_pick_param)
      bad_choice_size = gen_bad_choice_size(max_list_size, ekz_pick_param)
      normal_choice_size = gen_normal_choice_size(
        max_list_size, good_choice_size + bad_choice_size, ekz_pick_param)

      current_list_size = good_choice_size + bad_choice_size + normal_choice_size
      if current_list_size < max_list_size
        max_good_choice_size = good_choice_size + (max_list_size - current_list_size)
        good_choice_size = min_choice_size(EVALUATION_GOOD, max_good_choice_size, ekz_pick_param)
      end

      [good_choice_size, normal_choice_size, bad_choice_size]
    end

    def sizes_every_evaluation_which_one_size_is_one(ekz_pick_param)
      good_choice_size = 0
      bad_choice_size = 0
      normal_choice_size = 0

      exist_good_choice_size = min_choice_size(EVALUATION_GOOD, 1, ekz_pick_param) == 1
      exist_normal_choice_size = min_choice_size(EVALUATION_NORMAL, 1, ekz_pick_param) == 1
      exist_bad_choice_size = min_choice_size(EVALUATION_BAD, 1, ekz_pick_param) == 1

      return [0, 0, 0] unless exist_good_choice_size || exist_normal_choice_size || exist_bad_choice_size
      all_exist_flags = [exist_good_choice_size, exist_normal_choice_size, exist_bad_choice_size]
      return sizes_every_evaluation_which_existing_evaluation_is_one(all_exist_flags
      ) if all_exist_flags.select {|exist_flag| exist_flag}.size == 1

      while true
        # 1/2でGood
        if rand(2) != 0 && exist_good_choice_size
          good_choice_size = 1
          return [good_choice_size, normal_choice_size, bad_choice_size]
        end

        # 1/10でBad
        if rand(10) == 0 && exist_bad_choice_size
          bad_choice_size = 1
          return [good_choice_size, normal_choice_size, bad_choice_size]
        end

        if exist_normal_choice_size
          normal_choice_size = 1
          return [good_choice_size, normal_choice_size, bad_choice_size]
        end
      end

    end

    def sizes_every_evaluation_which_existing_evaluation_is_one(exist_flags)
      return unless exist_flags.select {|exist_flag| exist_flag}.size == 1
      exist_flags.map do |exist_flag|
        if exist_flag
          1
        else
          0
        end
      end
    end

    def gen_good_choice_size(list_size, ekz_pick_param)
      ratio = 1 / 2.to_f
      max_good_choice_size = (list_size * ratio).ceil

      min_choice_size(EVALUATION_GOOD, max_good_choice_size, ekz_pick_param)
    end

    def gen_bad_choice_size(list_size, ekz_pick_param)
      return 0 if list_size == 0
      max_num_of_one_happen = 10
      if rand(max_num_of_one_happen) + 1 == 1
        min_choice_size(EVALUATION_BAD, MAX_SIZE_BAD, ekz_pick_param)
      else
        0
      end
    end

    def gen_normal_choice_size(list_size, filled_size, ekz_pick_param)
      max_normal_choice_size = list_size - filled_size
      min_choice_size(EVALUATION_NORMAL, max_normal_choice_size, ekz_pick_param)
    end

    def min_choice_size(evaluation, reference_size, ekz_pick_param)
      existing_size = existing_size_by_evaluation(evaluation, ekz_pick_param)
      if existing_size < reference_size
        existing_size
      else
        reference_size
      end
    end

    def existing_size_by_evaluation(evaluation, ekz_pick_param)
      Choice.where(theme_id: ekz_pick_param.theme_id, evaluation: evaluation).size
    end

    def pick_by_evaluation(evaluation, size, ekz_pick_param)
      return [] if size == 0
      ids = Choice.where(theme_id: ekz_pick_param.theme_id, evaluation: evaluation).ids
      return Choice.where(id: ids).eager_load(:choice_images)
        .select("choices.*, choice_images.image_filename") if ids.size == size

      picked_ids = random_pick(ids, size)
      Choice.where(id: picked_ids).eager_load(:choice_images)
        .select("choices.*, choice_images.image_filename")
    end

    def random_pick(seeds, size)
      picked = []
      while picked.size < size
        rand_idx = rand(seeds.size)
        elem = seeds[rand_idx]
        if !picked.include?(elem)
          picked.push(elem)
        end
      end
      picked
    end
  end

  class EkzPickParams
    attr_accessor :user_id, :theme_id

    def initialize(theme_id)
      # @user_id = user_id
      @theme_id = theme_id
    end
  end
end