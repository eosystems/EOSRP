Rails.application.config.middleware.use OmniAuth::Builder do
  provider :eve_online, Settings.applications.app_id, Settings.applications.app_secret, scope: 'characterKillsRead'
end
