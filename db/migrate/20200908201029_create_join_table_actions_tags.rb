class CreateJoinTableActionsTags < ActiveRecord::Migration[6.0]
  def change
    create_join_table :actions, :tags do |t|
      t.index [:action_id, :tag_id]
      t.index [:tag_id, :action_id]
    end
  end
end
