class BulkProspectImportConstraint < ActiveRecord::Migration[6.1]
  def change
    execute <<-SQL
      ALTER TABLE prospects
        ADD CONSTRAINT for_bulk_insert UNIQUE (email, user_id);
    SQL
  end
end
