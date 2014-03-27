class Item < ActiveRecord::Base
  has_attached_file :photo, styles: { iphone5: "320x568>", iphone4: "320x480>", galaxy3: "360x640>" }
  validates_attachment :photo,
                        presence: true,
                        content_type: { content_type: ["imgae/jpg", "image/jpeg", "image/png"] }
end
