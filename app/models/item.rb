# coding: utf-8
class Item < ActiveRecord::Base
  has_attached_file :photo, styles: { iphone5: "320x568>" }
  validates_attachment :photo,
                        presence: true,
                        content_type: { content_type: ["image/jpg", "image/jpeg", "image/png"] }
  validate :photo_dimensions
  validates :title, presence: true
  validates :description, presence: true
  validates :price, presence: true, numericality: true

  def photo_dimensions
    # TODO: accept arguments for flexibility
    # thanks to: http://stackoverflow.com/questions/5454561/rails-paperclip-how-to-check-the-image-dimensions-before-saving
    dimensions = Paperclip::Geometry.from_file(photo.queued_for_write[:original].path)
    if dimensions.width != 640 && dimensions.height != 960
      errors.add(:photo, "必须是宽为640px，高为960px的图片")
    end
  end
end
