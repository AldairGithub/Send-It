class Action < ApplicationRecord

  belongs_to :user
  belongs_to :entity
  # optional lets us use different actions that dont have tags
  belongs_to :tag, optional: true

end
