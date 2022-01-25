class BulkProspectUploadJob < ApplicationJob
  require 'csv'
  queue_as :default
  BATCH_SIZE = 100

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
    prospect_file_entry.update(total: total, done: 0, processed?: false)

    batch_update = -> (rows_size, num_batches, current_batch_number, batch_duration_in_secs) {
      prospect_file_entry.update(done: current_batch_number * BATCH_SIZE)
    }
    
    if prospect_file_entry[:force?] 
      final_result = Prospect.import(
        new_prospects, 
        batch_progress: batch_update,
        batch_size: BATCH_SIZE,
        on_duplicate_key_update: {
          constraint_name: :for_bulk_insert,
          columns: {first_name: :first_name, last_name: :last_name}
        }
      )
    else 
      final_result = Prospect.import(
        new_prospects, 
        batch_progress: batch_update,
        batch_size: BATCH_SIZE,
        on_duplicate_key_ignore: true
      )
    end
    
    prospect_file_entry.update(total: total, done: final_result.ids.length, processed?: true)
  end
end