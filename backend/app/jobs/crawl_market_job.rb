require 'crest_client.rb'

class CrawlMarketJob < ActiveJob::Base
  queue_as :default

  def perform(*args)
    Rails.logger.info("start crawl market orders")
    region = "10000002"
    is_success, items = fetch_market_orders(region)
    if is_success
      save_market_orders(items, region)
    end
    Rails.logger.info("end crawl market orders")
  end

  # リポジトリの結果結果を保存
  def save_market_orders(results, region)
    save_results = []
    TempMarketOrder.delete_all
    count = 0
    results.each do |result|
      r = TempMarketOrder.new
      r.attributes = {
        buy: result.buy,
        issued: result.issued,
        price: result.price,
        volume_entered: result.volumeEntered,
        station_id: result.stationID,
        volume: result.volume,
        range: result.range,
        min_volume: result.minVolume,
        duration: result.duration,
        type_id: result.type,
        order_id: result.id
      }
      save_results << r
      if count % 1000 == 0
        TempMarketOrder.import save_results
        save_results = []
      end
      count = count + 1
    end
    TempMarketOrder.import save_results
  end

  def fetch_market_orders(region_id)
    client = CrestClient.new("")
    results = []
    retry_count = 0
    page = 1

    loop do
      res = client.fetch_market_order(region_id, page)

      total_count ||= res.total_count
      Rails.logger.info("fetch market orders (page: #{page}, total: #{total_count})" \
                        " and results #{res.items.size}")
      if res.items.size == 0 || !res.is_success
        Rails.logger.info("fetch failed. Retry(retry count: #{retry_count})")
        if retry_count >= 5
          fail 'Retry Limit.'
        else
          retry_count += 1
          redo
        end
      else
        retry_count = 0
        results << res.items
        if res.has_next_page
          page += 1
        else
          break
        end

      end

    end

    [true, results.flatten]
  end


end
