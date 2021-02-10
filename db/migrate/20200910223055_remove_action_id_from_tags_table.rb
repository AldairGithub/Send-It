class RemoveActionIdFromTagsTable < ActiveRecord::Migration[6.0]
  def change
    remove_reference :tags, :action, null: true, foreign_key: true
  end
end
