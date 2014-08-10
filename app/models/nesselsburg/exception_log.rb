module Nesselsburg
  class ExceptionLog < ActiveRecord::Base
    serialize :backtrace
    serialize :params
    serialize :other_info

    STATE_UNSOLVED = 0

    def self.from_exception(e)
      ExceptionLog.new klass: e.class.to_s, message: e.message,
                       backtrace: ApplicationController::ExceptionHandler.simplified_trace(e)
    end

  end
end