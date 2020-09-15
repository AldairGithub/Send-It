class ChangeNullToTrueOnTagTable < ActiveRecord::Migration[6.0]
  def change
    change_column :tags, :action_id, :bigint, null: true
  end
end
