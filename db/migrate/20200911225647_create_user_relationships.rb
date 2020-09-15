class CreateUserRelationships < ActiveRecord::Migration[6.0]
  def change
    create_table :user_relationships do |t|
      t.references :user_one, null: false
      t.references :user_two, null: false
      t.string :status
      t.references :last_user_action, null: false

      t.timestamps
    end
    add_foreign_key :user_relationships, :users, column: :user_one_id
    add_foreign_key :user_relationships, :users, column: :user_two_id
    add_foreign_key :user_relationships, :users, column: :last_user_action_id
  end
end
