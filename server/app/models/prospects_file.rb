class ProspectsFile < ApplicationRecord
    has_one_attached :file
    belongs_to :user
    has_and_belongs_to_many :prospects
end
