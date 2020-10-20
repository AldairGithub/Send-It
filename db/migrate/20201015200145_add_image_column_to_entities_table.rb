class AddImageColumnToEntitiesTable < ActiveRecord::Migration[6.0]
  def change
    add_column :entities, :url, :string
  end
end
