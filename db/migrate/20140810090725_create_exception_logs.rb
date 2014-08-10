class CreateExceptionLogs < ActiveRecord::Migration
  def change
    create_table :exception_logs do |t|
      t.string :klass
      t.text :message
      t.datetime :created_at
      t.text :params
      t.text :other_info
      t.text :backtrace

      t.integer :state, default: Nesselsburg::ExceptionLog::STATE_UNSOLVED

    end
  end
end
