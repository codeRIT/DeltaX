class Player < ApplicationRecord
  validates :code, presence: true, uniqueness: true
end
