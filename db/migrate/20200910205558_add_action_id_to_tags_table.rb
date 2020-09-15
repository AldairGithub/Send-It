class AddActionIdToTagsTable < ActiveRecord::Migration[6.0]
  def change
    add_reference :tags, :action, null: false, foreign_key: true
  end
end
