class ChangeCamelCaseIntoSnakeCaseInActionsTable < ActiveRecord::Migration[6.0]
  def change
    rename_column :actions, :typeOfAction, :type_of_action
  end
end
