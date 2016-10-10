worker_processes 1

listen File.expand_path("backend/tmp/unicorn_eosrp_backend.sock", "/var/www/eosrp_backend/current")
pid File.expand_path("backend/tmp/unicorn_eosrp_backend.pid", "/var/www/eosrp_backend/current")

timeout 60

preload_app true

stdout_path File.expand_path("backend/log/unicorn.stdout.log", "/var/www/eosrp_backend/current")
stderr_path File.expand_path("backend/log/unicorn.stderr.log", "/var/www/eosrp_backend/current")

GC.respond_to?(:copy_on_write_friendly=) and GC.copy_on_write_friendly = true

before_fork do |server, worker|
  defined?(ActiveRecord::Base) and ActiveRecord::Base.connection.disconnect!

  old_pid = "#{server.config[:pid]}.oldbin"
  if old_pid != server.pid
    begin
      sig = (worker.nr + 1) >= server.worker_processes ? :QUIT : :TTOU
      Process.kill(sig, File.read(old_pid).to_i)
    rescue Errno::ENOENT, Errno::ESRCH
    end
  end

  sleep 1
end

after_fork do |server, worker|
  defined?(ActiveRecord::Base) and ActiveRecord::Base.establish_connection
end
