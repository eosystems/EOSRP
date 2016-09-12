module Ng2SearchTableSearchable
  extend ActiveSupport::Concern

  included do
  end

  module ClassMethods
    def search_with(filter_attributes, sort_attributes, page, per)
      self
        .ransack(ransack_filter_attributes(filter_attributes))
        .result
        .ransack(sorts: ransack_sort_attributes(sort_attributes))
        .result
        .page(page)
        .per(validate_per(per))
    end

    def validate_per(per)
      max_per = if self.const_defined?(:SEARCH_MAX_PER)
                  ::SEARCH_MAX_PER
                else
                  100
                end
      per ||= if self.const_defined?(:SEARCH_DEFAULT_PER)
                ::SEARCH_DEFAULT_PER
              else
                20
              end
      fail "Invalid per" if per.to_i > max_per
      per
    end

    def ransack_filter_attributes(filter_attributes)
      return {} unless filter_attributes.present?
      permitted_attributes = self.const_get(:RANSACK_FILTER_ATTRIBUTES).map { |k, _| k }

      filter_attributes.permit(permitted_attributes).to_h.map do |k, v|
        { self.const_get(:RANSACK_FILTER_ATTRIBUTES)[k] => v }
      end.reduce { |a, e| a.merge(e) }
    end

    def ransack_sort_attributes(sort_attributes)
      return {} unless sort_attributes.present?
      permitted_attributes = self.const_get(:RANSACK_SORT_ATTRIBUTES).map { |k, _| k }

      sort_attributes
        .permit(permitted_attributes)
        .to_h
        .map { |k, v| "#{self.const_get(:RANSACK_SORT_ATTRIBUTES)[k]} #{v}" }
    end
  end
end
