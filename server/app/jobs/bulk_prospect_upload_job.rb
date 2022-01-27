class BulkProspectUploadJob < ApplicationJob
  require 'csv'
  queue_as :default

  def perform(prospect_file_entry, file_path)
    CSV.foreach(file_path, headers: prospect_file_entry[:has_headers?]) do |row|
      if prospect_file_entry[:force?] 
        new_prospect = Prospect.find_or_create_by(email: row[prospect_file_entry[:email_index].to_i], user_id: prospect_file_entry[:user_id])
        new_prospect.update(
            first_name: prospect_file_entry[:first_name_index?].blank? ? nil : row[prospect_file_entry[:first_name_index?].to_i], 
            last_name: prospect_file_entry[:last_name_index?].blank? ? nil : row[prospect_file_entry[:last_name_index?].to_i])
      else 
        new_prospect = Prospect.find_or_create_by(email: row[prospect_file_entry[:email_index].to_i], user_id: prospect_file_entry[:user_id]) do |new_prospect|
          new_prospect.first_name = row[:first_name] 
          new_prospect.last_name = row[:last_name]
        end
      end 
      prospect_file_entry.prospects << new_prospect
    end
    prospect_file_entry.update(processed?: true)    
  end
end