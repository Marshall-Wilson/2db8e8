class BulkProspectUploadJob < ApplicationJob
  queue_as :default

  def perform(prospect_file_entry, file_path)
    new_prospects = []
    total = 0
    
    CSV.foreach(file_path, headers: (prospect_file_entry[:has_headers?]) == "true") do |row|
      new_prospects << {
        email: row[prospect_file_entry[:email_index].to_i],
        first_name: prospect_file_entry[:first_name_index?].blank? ? nil : row[prospect_file_entry[:first_name_index?].to_i],
        last_name: prospect_file_entry[:last_name_index?].blank? ? nil : row[prospect_file_entry[:last_name_index?].to_i],
        user_id: prospect_file_entry.user_id
      }
      total += 1
    end
    
    done = Prospect.bulk_import new_prospects, (prospect_file_entry[:force?] == "true")
    prospect_file_entry.update(total: total, done: done)
  end
end
