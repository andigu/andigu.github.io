local mediabag = require 'pandoc.mediabag'

files = {}
for fp, mt, contents in mediabag.items() do
  files[fp] = true
end

-- adjust path to image file
function Image (img)
  
  if files[img.src] then
    img.src = '/static/img/generated/' .. img.src
  end
  return img
end