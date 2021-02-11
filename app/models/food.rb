class Food < ApplecationRecord
  belongs_to :restaurant
  belongs_to :order, optional: true
  has_one :line_food
end