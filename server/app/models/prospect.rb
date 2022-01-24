class Prospect < ApplicationRecord  
  belongs_to :user
  has_and_belongs_to_many :campaigns

  def self.bulk_import(prospects, force)
    done = 0
    prospects.each do |row|
      if force 
        Prospect.find_or_create_by(email: row[:email], user_id: row[:user_id])
          .update(first_name: row[:first_name], last_name: row[:last_name])
        done += 1
      else 
        Prospect.find_or_create_by(email: row[:email], user_id: row[:user_id]) do |new_prospect|
          new_prospect.first_name = row[:first_name] 
          new_prospect.last_name = row[:last_name]
          done += 1
        end
      end 
    end
    return done 
  end
end
