class CreateProspectsFiles < ActiveRecord::Migration[6.1]
  def change
    create_table :prospects_files do |t|
      t.integer :email_index
      t.integer :first_name_index?
      t.integer :last_name_index?
      t.boolean :has_headers?
      t.boolean :force?
      t.boolean :processed?
      t.integer :total
      t.integer :done

      t.timestamps
    end
  end
end
