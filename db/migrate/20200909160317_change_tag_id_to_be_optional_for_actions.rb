class ChangeTagIdToBeOptionalForActions < ActiveRecord::Migration[6.0]
  def change
    change_column :actions, :tag_id, :integer, null: true
  end
end
