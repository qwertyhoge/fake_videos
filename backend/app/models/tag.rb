class Tag < ApplicationRecord
    has_many :videos, through: :taggings
end
