class CreateJoinTableEntitiesActions < ActiveRecord::Migration[6.0]
  def change
    create_join_table :entities, :actions do |t|
      t.index [:entity_id, :action_id]
      t.index [:action_id, :entity_id]
    end
  end
end
