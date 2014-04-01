class Item < ActiveRecord::Base
  has_attached_file :photo
  validates_attachment :photo,
                        presence: true,
                        content_type: { content_type: ["imgae/jpg", "image/jpeg", "image/png"] }
  validates :title, presence: true
  validates :description, presence: true
  validates :price, presence: true
end
