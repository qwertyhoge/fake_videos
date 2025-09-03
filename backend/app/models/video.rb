class Video < ApplicationRecord
    belongs_to :user
    has_many :tags, through: :taggings
end
