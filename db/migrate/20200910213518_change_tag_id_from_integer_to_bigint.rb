class ChangeTagIdFromIntegerToBigint < ActiveRecord::Migration[6.0]
  def change
    change_column :actions, :tag_id, :bigint, null: true
  end
end
