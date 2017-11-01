json.array! @responses do |response|
  json.partial! 'api/responses/response', response: response
end