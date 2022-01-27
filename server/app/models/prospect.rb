class Prospect < ApplicationRecord  
  belongs_to :user
  has_and_belongs_to_many :campaigns
  has_and_belongs_to_many :prospects_file
end
