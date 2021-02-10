class Entity < ApplicationRecord
  
  belongs_to :user
  # has_and_belongs_to_many was not letting user delete post bc entity had a foreign key from action table!
  has_many :actions, dependent: :destroy

end
