module Respondable
  def all_children # recursively hash response ids to that response's children
    if self.responses.empty?
      return {}
    end
    children = {}
    self.responses.each do |res|
      children[res.id] = res.all_children 
    end
    children
  end
end