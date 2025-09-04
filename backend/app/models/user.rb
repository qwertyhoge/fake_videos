class User < ApplicationRecord
    has_many :videos, dependent: :nullify
end
