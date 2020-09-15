class ChangeCamelCaseIntoSnakeCaseInActionsTableForEntities < ActiveRecord::Migration[6.0]
  def change
    rename_column :actions, :typeOfEntity, :type_of_entity
  end
end
