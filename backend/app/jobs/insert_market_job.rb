class InsertMarketJob < ActiveJob::Base
  queue_as :default

  def perform(*args)
    Rails.logger.info("start insert market orders")
    ActiveRecord::Base.connection.execute(
      "delete from market_orders"
    )
    ActiveRecord::Base.connection.execute(
      "Insert into market_orders select * from temp_market_orders"
    )
    Rails.logger.info("end insert market orders")
  end
end
