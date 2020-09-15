class UserRelationship < ApplicationRecord
  # assigns to user table
  belongs_to :user_one, class_name: 'User'
  belongs_to :user_two, class_name: 'User'
  belongs_to :last_user_action, class_name: 'User'
end
