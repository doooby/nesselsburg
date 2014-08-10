module ApplicationController::ExceptionHandler
  extend ActiveSupport::Concern

  included do

    rescue_from StandardError, with: :handle_exceptions

  end

  def self.simplified_trace(e, join_with=nil)
    root_path = Rails.root.to_s
    gems_paths = Gem.path

    bt = e.backtrace.map do |trace|
      t = trace.gsub root_path, '__app__'
      gems_paths.each{|gems_path| t.gsub! gems_path, '__gem__'}
      t
    end

    join_with ? bt.join(join_with) : bt
  end

  private
  
  ENV_VARIBALES_TO_STORE = ['CONTENT_TYPE', 'REQUEST_METHOD', 'REQUEST_PATH', 'HTTP_HOST', 'HTTP_VERSION',
                            'HTTP_CONNECTION', 'HTTP_USER_AGENT', 'HTTP_REFERER', 'HTTP_COOKIE', 'REMOTE_ADDR']

  def handle_exceptions(e)

    if Rails.env.development?
      raise # for better_errors
    elsif Rails.env.test?
      render text: "#{e.class}: #{e.message}<br/>#{simplified_trace e, '<br/>'}", status: :internal_exception
    else
      el = Nesselsburg::ExceptionLog.from_exception e

      params_hash = params.to_h
      info_hash = ENV_VARIBALES_TO_STORE.inject({}){|h, v| h[v] = request.env[v]; h}
      info_hash['controller'] = params_hash.delete 'controller'
      info_hash['action'] = params_hash.delete 'action'
      info_hash['puma.socket'] = request.env['puma.socket'].class.to_s

      el.params = params_hash
      el.other_info = info_hash
      el.save!

      render 'public/500', status: :internal_exception, layout: false
    end
  end



  'puma.socket' # .class


end