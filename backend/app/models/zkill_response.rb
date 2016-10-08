class ZkillResponse
  include ActiveModel::Model
  include ActiveModel::Validations::Callbacks

  attr_accessor *%i(
    is_success victim attackers killID killTime zkb items
  )

  def self.parse(response, current_page: 1)
    new.tap do |r|
      body = JSON.parse(Zlib::GzipReader.new(StringIO.new(response.body)).read)
      header = response.headers
      r.is_success = response.success?
      if body != ""
        r.victim = HashObject.new(body[0]['victim'])
        r.attackers = body[0]['attackers'].map { |v| HashObject.new(v) }
        r.items = body[0]['items'].map { |v| HashObject.new(v) }
        r.killID = body[0]['killID']
        r.killTime = body[0]['killTime']
        r.zkb = HashObject.new(body[0]['zkb'])
      end
    end
  end
end
