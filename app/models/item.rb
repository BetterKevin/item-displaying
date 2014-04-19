class Item < ActiveRecord::Base
  has_attached_file :photo, styles: { iphone5: "320x568>" }
  validates_attachment :photo,
                        presence: true,
                        content_type: { content_type: ["imgae/jpg", "image/jpeg", "image/png"] }
  validates :title, presence: true
  validates :description, presence: true
  validates :price, presence: true, numericality: true
end
