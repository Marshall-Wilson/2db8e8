class CreateJoinTableProspectsFileProspect < ActiveRecord::Migration[6.1]
  def change
    create_join_table :prospects_files, :prospects, :id => false do |t|
      t.index [:prospects_file_id, :prospect_id], name: "prospects_file_id"
      t.index [:prospect_id, :prospects_file_id], name: "prospect_id"
    end
  end
end
